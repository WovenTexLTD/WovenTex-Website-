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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed bottom-6 right-6 z-40 hidden sm:block"
        >
          <Link
            to="/contact"
            className="group flex items-center gap-3 bg-signal px-6 py-4 text-ink shadow-[0_16px_44px_-12px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-ink hover:text-signal"
          >
            <span className="text-[11px] font-bold uppercase tracking-label">Request a quote</span>
            <span className="transition-transform duration-300 ease-brand group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
