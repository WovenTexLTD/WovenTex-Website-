import { createContext, useContext, useEffect } from 'react';

/**
 * The header rides inverted (light type, no background) while it sits over a
 * full-bleed dark hero, and flips to paper once you scroll past it.
 *
 * That used to be assumed — every page happened to open on a dark hero — which
 * meant any page without one rendered the header white-on-white and invisible.
 * Heroes now register themselves, so the header is solid by default and only
 * inverts when something has actually declared itself behind it.
 */
export const HeroContext = createContext<{
  hasDarkHero: boolean;
  register: (on: boolean) => void;
}>({
  hasDarkHero: false,
  register: () => {},
});

/** Read by the header. */
export function useHasDarkHero() {
  return useContext(HeroContext).hasDarkHero;
}

/** Call from any full-bleed dark hero so the header knows to invert over it. */
export function useDarkHero() {
  const { register } = useContext(HeroContext);
  useEffect(() => {
    register(true);
    return () => register(false);
  }, [register]);
}
