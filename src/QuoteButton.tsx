import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from './brand/motion';

/**
 * Persistent quote CTA. Shows once the visitor is past the hero, and steps
 * out of the way over the footer (which carries its own contact details)
 * and on /contact, where it would only duplicate the form.
 */
export default function QuoteButton() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const pastHero = y > window.innerHeight * 0.8;
      const nearFoot = y + window.innerHeight > document.documentElement.scrollHeight - 620;
      setVisible(pastHero && !nearFoot);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  const show = visible && pathname !== '/contact';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed bottom-6 right-6 z-40 hidden sm:block"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-signal px-5 py-3 text-[15px] font-medium text-ink shadow-[0_12px_36px_-10px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:bg-signal-600"
          >
            Request a quote
            <span
              aria-hidden
              className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5"
            >
              ›
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
