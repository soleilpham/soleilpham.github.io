/**
 * Returns the correct URL for a file in the public/ folder, accounting for
 * Vite's base path (e.g. "/" on GitHub Pages, "/" in local dev).
 *
 * Usage:  publicUrl("profile.jpeg")  →  "/profile.jpeg"
 *                                    →  "/profile.jpeg"          (dev)
 */
export function publicUrl(filename: string): string {
  const base = import.meta.env.BASE_URL; // ends with "/"
  return `${base}${filename.replace(/^\//, "")}`;
}
