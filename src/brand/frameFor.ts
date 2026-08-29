/**
 * Scroll progress to image-sequence frame index.
 *
 * Clamped at both ends on purpose: trackpad rubber-banding and iOS overscroll
 * can hand the scroll listener values a touch outside 0 to 1, and NaN is
 * possible before layout settles. Either would index off the end of the
 * array or snap back to frame 1 for a tick.
 */
export default function frameFor(progress: number, count: number): number {
  if (count <= 0) return -1;
  const p = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  return Math.round(p * (count - 1));
}
