// A dependency-free placeholder (inline SVG data URI) shown when a product
// image URL from the API is broken. No network request, so it always works.
export const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
      '<rect width="100%" height="100%" fill="#f2f2f2"/>' +
      '<text x="50%" y="50%" fill="#bbbbbb" font-family="Arial, sans-serif" ' +
      'font-size="14" text-anchor="middle" dominant-baseline="middle">No image</text>' +
    '</svg>'
  );

// Attach to an <img>/<CardMedia> via onError. Swaps in the placeholder once,
// and clears the handler so a broken placeholder can't cause an infinite loop.
export function onImageError(e) {
  if (e.target.src !== FALLBACK_IMAGE) {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  }
}
