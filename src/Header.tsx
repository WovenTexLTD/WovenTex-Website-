import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './brand/Logo';
import { EASE } from './brand/motion';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/capabilities', label: 'Capabilities' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/clients', label: 'Clients' },
  { path: '/sustainability', label: 'Sustainability' },
  { path: '/blog', label: 'Journal' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* Every page opens on a dark hero, so the header rides inverted until the
     visitor scrolls, then flips to paper. One rule, no per-page config. */
  const solid = scrolled || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-brand ${
          solid ? 'bg-paper/95 text-ink backdrop-blur-xl' : 'bg-transparent text-paper'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-8 lg:h-[4.5rem]">
          <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label="WovenTex LTD — home">
            <Logo
              variant="mark"
              className="h-[17px] w-auto transition-colors duration-300 group-hover:text-signal"
            />
            <span className="hidden h-6 w-px bg-current opacity-25 sm:block" aria-hidden />
            <span className="hidden text-[13px] font-bold uppercase tracking-[0.2em] sm:block">
              WovenTex
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `link-swipe whitespace-nowrap text-[12px] font-medium uppercase tracking-label transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-55 hover:opacity-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <a
              href="https://productionportal.co"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-label transition-colors duration-300 lg:inline-flex ${
                solid
                  ? 'border-portal/30 text-portal hover:bg-portal hover:text-paper'
                  : 'border-paper/30 text-paper hover:bg-paper hover:text-portal'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 animate-blink rounded-full ${
                  solid ? 'bg-portal' : 'bg-signal'
                }`}
                aria-hidden
              />
              Portal
            </a>

            <Link
              to="/contact"
              className={`hidden px-5 py-2.5 text-[10px] font-semibold uppercase tracking-label transition-colors duration-300 sm:inline-block ${
                solid ? 'bg-ink text-paper hover:bg-signal hover:text-ink' : 'bg-signal text-ink hover:bg-paper'
              }`}
            >
              Request a Quote
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="-mr-2 flex h-10 w-10 items-center justify-center xl:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ease-brand ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full bg-current transition-all duration-300 ease-brand ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* The yellow thread — draws across as the page leaves the hero */}
        <div
          className={`h-[2px] origin-left bg-signal transition-transform duration-700 ease-brand ${
            solid ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-paper xl:hidden"
          >
            <div className="min-h-full pb-16 pt-28">
              <nav className="shell">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="border-t border-paper/12"
                  >
                    <Link
                      to={item.path}
                      className="flex items-baseline gap-5 py-4 transition-colors duration-200 hover:text-signal"
                    >
                      <span className="mono-label text-paper/35">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="w-condensed text-3xl font-black uppercase sm:text-4xl">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                  className="mt-10 flex flex-col gap-3"
                >
                  <Link
                    to="/contact"
                    className="bg-signal px-6 py-4 text-center text-sm font-semibold uppercase tracking-label text-ink"
                  >
                    Request a Quote
                  </Link>
                  <a
                    href="https://productionportal.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-paper/30 px-6 py-4 text-center text-sm font-semibold uppercase tracking-label"
                  >
                    Production Portal ↗
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mono-label mt-12 space-y-2 text-paper/40"
                >
                  <p>167–169 Great Portland St, London W1W 5PF</p>
                  <p>
                    <a href="mailto:contact@woventex.co" className="hover:text-signal">
                      contact@woventex.co
                    </a>
                  </p>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
