// ── Wikipedia image helper ───────────────────────────────────────────────────
// Fetches a representative image for a topic from the public Wikipedia REST API.
// Results are cached in memory (as promises) so the same title is never fetched
// twice — important now that the lexicon index shows a thumbnail per card.

const cache = new Map();

/**
 * Resolve a Wikipedia article title to an image URL (or null if none).
 * @param {string} title  English Wikipedia article title (e.g. "Frigate").
 * @param {number} size   Desired width in px for thumbnails.
 * @returns {Promise<string|null>}
 */
export function getWikiImage(title, size = 480) {
  if (!title) return Promise.resolve(null);
  const key = `${title}|${size}`;
  if (cache.has(key)) return cache.get(key);

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const promise = fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data) return null;
      const thumb = data.thumbnail?.source;
      const original = data.originalimage?.source;
      // Thumbnails embed their width as "/<n>px-"; bump it for a crisper image.
      if (thumb) return thumb.replace(/\/\d+px-/, `/${size}px-`);
      return original || null;
    })
    .catch(() => null);

  cache.set(key, promise);
  return promise;
}

// ── Batch image fetch (for the lexicon index) ────────────────────────────────
// Fetching ~100 images one-by-one gets rate-limited by Wikipedia. The MediaWiki
// API instead returns up to 50 page images per request, so we fetch all card
// thumbnails in a couple of calls. Returns a map: requested title -> image URL.

const batchCache = new Map();

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function getWikiImagesBatch(titles, size = 240) {
  const unique = [...new Set(titles.filter(Boolean))];
  const cacheKey = `${size}|${unique.sort().join("§")}`;
  if (batchCache.has(cacheKey)) return batchCache.get(cacheKey);

  const promise = Promise.all(
    chunk(unique, 50).map((group) => {
      const params = new URLSearchParams({
        action: "query",
        format: "json",
        origin: "*",
        prop: "pageimages",
        piprop: "thumbnail",
        pithumbsize: String(size),
        redirects: "1",
        titles: group.join("|"),
      });
      return fetch(`https://en.wikipedia.org/w/api.php?${params}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);
    })
  ).then((results) => {
    const map = {};
    results.forEach((data) => {
      if (!data?.query) return;
      // Build "requested title -> final title" map from normalization + redirects.
      const alias = {};
      (data.query.normalized || []).forEach((n) => { alias[n.from] = n.to; });
      (data.query.redirects || []).forEach((r) => { alias[r.from] = r.to; });
      const resolve = (t) => {
        let cur = t;
        const seen = new Set();
        while (alias[cur] && !seen.has(cur)) { seen.add(cur); cur = alias[cur]; }
        return cur;
      };
      // Index returned pages by their (final, post-redirect) title.
      const byTitle = {};
      Object.values(data.query.pages || {}).forEach((p) => {
        if (p.thumbnail?.source) {
          byTitle[p.title] = p.thumbnail.source;
          map[p.title] = p.thumbnail.source; // direct hits (no alias needed)
        }
      });
      // Map each originally-requested title back to its image via aliases.
      unique.forEach((t) => {
        const final = resolve(t);
        if (byTitle[final]) map[t] = byTitle[final];
      });
    });
    return map;
  });

  batchCache.set(cacheKey, promise);
  return promise;
}

