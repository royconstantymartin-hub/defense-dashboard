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
