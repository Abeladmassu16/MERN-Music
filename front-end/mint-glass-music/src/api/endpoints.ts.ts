// src/api/endpoints.ts
const env = (typeof import.meta !== "undefined" ? (import.meta as any).env : {}) as Record<string, string | undefined>;

export const SONGS_PATH = env.VITE_API_SONGS_PATH ?? "/";          // backend uses "/" for list/create
export const STATS_PATH = env.VITE_API_STATS_PATH ?? "/stats/all"; // backend uses "/stats/all"

// Safe path join that avoids "//" and preserves leading slash
export function joinPath(...parts: string[]) {
  return (
    "/" +
    parts
      .filter(Boolean)
      .map((p, i) => (i === 0 ? p.replace(/^\/+|\/+$/g, "") : p.replace(/^\/+|\/+$/g, "")))
      .join("/")
  ).replace(/\/{2,}/g, "/");
}
