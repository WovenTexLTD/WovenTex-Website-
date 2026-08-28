import React, { useCallback, useMemo, useState } from 'react';
import { HeroContext } from './hero';

export function HeroProvider({ children }: { children: React.ReactNode }) {
  // A count, not a boolean: during a route change the outgoing hero unmounts
  // after the incoming one mounts, and a boolean would flicker to false.
  const [count, setCount] = useState(0);

  const register = useCallback((on: boolean) => {
    setCount((c) => Math.max(0, c + (on ? 1 : -1)));
  }, []);

  const value = useMemo(() => ({ hasDarkHero: count > 0, register }), [count, register]);

  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
}
