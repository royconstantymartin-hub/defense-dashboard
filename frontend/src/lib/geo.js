// Shared world-map topology (TopoJSON) loader.
// The file is bundled with the app (frontend/public/data/) and served by our own
// backend, so the map never depends on a third-party CDN. A CDN fallback is kept
// only as a safety net. Cached at module level so all pages share one fetch.
const LOCAL_URL = `${process.env.PUBLIC_URL || ""}/data/countries-110m.json`;
const CDN_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

let cached = null;
let pending = null;

async function fetchGeo() {
  for (const url of [LOCAL_URL, CDN_URL]) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data?.type === "Topology") {
          cached = data;
          return data;
        }
      }
    } catch {
      // try next source
    }
  }
  return null;
}

export function getCachedWorldGeo() {
  return cached;
}

export function loadWorldGeo() {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = fetchGeo().finally(() => {
      if (!cached) pending = null; // allow a retry on a later call
    });
  }
  return pending;
}
