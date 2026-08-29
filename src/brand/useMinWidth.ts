import { useEffect, useState } from 'react';

/**
 * Matches a min-width media query, resolved synchronously on the first render.
 *
 * That synchronous first value is the point. Scroll-pinned sections measure
 * their target in a mount effect, so if the component spent its first render
 * in the wrong branch the pinned DOM wouldn't exist yet and the scroll
 * listener would silently fall back to whole-page progress.
 */
export default function useMinWidth(px: number) {
  const query = `(min-width: ${px}px)`;
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);

  return matches;
}
