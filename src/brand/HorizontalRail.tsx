import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { WipeHeading } from './ui';
import useMinWidth from './useMinWidth';

/* ====================================================================== *
 *  HorizontalRail
 *
 *  Scroll down, travel sideways. The section pins for exactly as long as the
 *  track needs to clear the viewport, measured, not guessed, so the rail
 *  never over- or under-runs on any screen width.
 *
 *  Technique adapted from 21st.dev "Scroll Horizontal Gallery" (@motiondotdev),
 *  with measured travel and a native scroll-snap fallback added.
 * ====================================================================== */

export type RailItem = {
  title: string;
  spec: string;
  image: string;
};

const PANEL = 'w-[74vw] shrink-0 sm:w-[44vw] lg:w-[30vw] xl:w-[25vw]';

/* The head carries a display headline, so it gets its own, wider, measure.
   At a product panel's width a long word like "MANUFACTURING" runs straight
   under the first card. */
const HEAD_PANEL = 'w-[80vw] shrink-0 sm:w-[54vw] lg:w-[38vw] xl:w-[31vw]';

/** Fraction of the pin spent holding still before the track starts to travel. */
const HOLD = 0.1;

type HeadProps = {
  index: string;
  label: string;
  title: React.ReactNode[];
  lede: string;
};

function Panel({ item, n }: { item: RailItem; n: number }) {
  return (
    <Link
      to="/capabilities"
      className={`group relative block snap-start ${PANEL}`}
      aria-label={`${item.title}, ${item.spec}`}
    >
      <div className="relative overflow-hidden rounded-4xl bg-paper-300">
        <img
          src={item.image}
          alt=""
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1100ms] ease-brand group-hover:scale-[1.06]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
        <span className="mono-label absolute left-4 top-4 rounded-full bg-signal px-2.5 py-1 text-ink">
          {String(n).padStart(2, '0')}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 border-t border-ink/15 pt-3">
        <div>
          <h3 className="w-condensed text-lg font-bold uppercase leading-tight lg:text-xl">
            {item.title}
          </h3>
          <p className="mono-label mt-2 text-ink-300">{item.spec}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 shrink-0 text-ink-200 transition-all duration-500 ease-brand group-hover:translate-x-1 group-hover:text-signal-700"
        >
          →
        </span>
      </div>
    </Link>
  );
}

function EndPanel() {
  return (
    <Link
      to="/capabilities"
      className={`group relative flex snap-start flex-col justify-between rounded-4xl bg-ink p-8 text-paper transition-colors duration-500 hover:bg-signal hover:text-ink ${PANEL}`}
      style={{ aspectRatio: '4 / 5' }}
    >
      <span className="mono-label text-signal transition-colors duration-500 group-hover:text-ink">
        Everything else
      </span>
      <div>
        <h3 className="w-condensed text-3xl font-black uppercase leading-[0.92]">
          See the full
          <br />
          capability
          <br />
          sheet
        </h3>
        <span
          aria-hidden
          className="mt-8 block h-[2px] w-12 origin-left bg-signal transition-all duration-500 ease-brand group-hover:w-24 group-hover:bg-ink"
        />
      </div>
    </Link>
  );
}

function Head({ index, label, title, lede, still }: HeadProps & { still?: boolean }) {
  return (
    /* snap-start matters here: without it the strip's first snap point is the
       first card, and the browser snaps past the heading on load. */
    <div className={`${HEAD_PANEL} flex snap-start flex-col justify-center pr-8`}>
      <div className="flex items-center gap-4 border-t border-ink/15 pt-4">
        <span className="mono-label text-signal-700">{index}</span>
        <span className="mono-label text-ink-400">{label}</span>
      </div>
      <WipeHeading
        as="h2"
        lines={title}
        /* Inside a pinned frame the scroll trigger is unreliable, play on mount */
        immediate={still}
        className="mt-6 w-condensed text-[clamp(1.9rem,3.6vw,3.25rem)] font-black uppercase leading-[0.94] tracking-[-0.02em]"
      />
      <p className="mt-5 text-base leading-relaxed text-ink-400">{lede}</p>
      <span className="mono-label mt-8 hidden items-center gap-3 text-ink-300 md:flex">
        <span className="h-[1px] w-8 bg-ink/25" />
        Scroll
      </span>
    </div>
  );
}

function cards(items: RailItem[], head: React.ReactNode) {
  return (
    <>
      {head}
      {items.map((item, i) => (
        <Panel key={item.title} item={item} n={i + 1} />
      ))}
      <EndPanel />
    </>
  );
}

/* ------------------------------------------- swipeable strip (fallback) --- */

function Strip({ items, ...head }: HeadProps & { items: RailItem[] }) {
  return (
    <section className="relative bg-paper py-24 text-ink lg:py-32">
      {/* scroll-padding keeps snap positions inside the shell inset; without
          it a snapped panel sits flush against the screen edge */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--shell-x)] px-[var(--shell-x)] pb-4 lg:gap-6">
        {cards(items, <Head {...head} />)}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- pinned rail --- */

function PinnedRail({
  items,
  travel,
  onMeasure,
  ...head
}: HeadProps & { items: RailItem[]; travel: number; onMeasure: (px: number) => void }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });

  /* A short hold before the track starts moving, so the section headline is
     readable at rest rather than sliding away the instant the pin engages.
     The section is made proportionally taller to pay for it. */
  const x = useTransform(scrollYProgress, [HOLD, 1], [0, -travel]);

  /* How far the track has to move for its last panel to clear the viewport.
     Reported up so the section can be made exactly that much taller, which
     keeps one pixel of page scroll worth one pixel of sideways travel. */
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () =>
      onMeasure(Math.max(0, Math.round((el.scrollWidth - window.innerWidth) / 8) * 8));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [onMeasure]);

  return (
    <section
      ref={section}
      className="relative bg-paper text-ink"
      style={{ height: `calc(100vh + ${Math.round(travel / (1 - HOLD))}px)` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={track}
          style={{ x }}
          className="flex gap-4 pl-[var(--shell-x)] pr-[var(--shell-x)] will-change-transform lg:gap-6"
        >
          {cards(items, <Head {...head} still />)}
        </motion.div>

        {/* Travel indicator across the base of the frame */}
        <div className="absolute bottom-10 left-[var(--shell-x)] right-[var(--shell-x)] h-px bg-ink/12">
          <motion.div
            className="h-full w-full origin-left bg-signal"
            style={{ scaleX: scrollYProgress }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ api --- */

export default function HorizontalRail({ items, ...head }: HeadProps & { items: RailItem[] }) {
  const pinnable = useMinWidth(768);
  const reduce = useReducedMotion();
  const [travel, setTravel] = useState(0);

  const onMeasure = useCallback((px: number) => {
    setTravel((prev) => (prev === px ? prev : px));
  }, []);

  if (!pinnable || reduce) return <Strip items={items} {...head} />;

  /* Keyed on travel: the rail remounts once its true height is known, so the
     scroll listener always attaches to a section that is already the right
     size. Measuring first and mounting second is what makes the pin exact. */
  return (
    <PinnedRail
      key={travel}
      items={items}
      travel={travel}
      onMeasure={onMeasure}
      {...head}
    />
  );
}
