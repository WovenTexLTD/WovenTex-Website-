import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SectionHead } from './ui';

export type Step = {
  step: string;
  title: string;
  text: string;
  meta: string;
};

/**
 * The four production stages, pinned and driven sideways by vertical scroll —
 * the page literally runs a line. Below `lg`, or under reduced motion, it
 * degrades to the ordinary stacked grid rather than faking the effect.
 */
export default function ProcessLine({
  steps,
  index,
  label,
  title,
  lede,
}: {
  steps: Step[];
  index: string;
  label: string;
  title: React.ReactNode[];
  lede?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  /* Cards are sized as a share of the viewport so two are always readable at
     once; the track then slides by exactly its overhang. */
  const CARD_VW = 44;
  const trackPct = steps.length * CARD_VW;
  const shiftPct = ((trackPct - 100) / trackPct) * 100;

  const x = useTransform(eased, [0, 1], ['0%', `-${shiftPct.toFixed(2)}%`]);
  const progress = useTransform(eased, [0, 1], ['0%', '100%']);

  const head = (
    <SectionHead index={index} label={label} tone="dark" title={title} lede={lede} />
  );
  const pinnedHead = (
    <SectionHead index={index} label={label} tone="dark" title={title} lede={lede} immediate />
  );

  /* -------------------------------------------------- static fallback --- */
  const StaticGrid = (
    <div className="mt-16 grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <div key={s.step} className="bg-ink p-8">
          <div className="flex items-baseline justify-between">
            <span className="w-condensed text-7xl font-black leading-none text-paper/20">
              {s.step}
            </span>
            <span className="mono-label text-paper/35">{s.meta}</span>
          </div>
          <h3 className="mt-8 w-condensed text-xl font-bold uppercase leading-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-paper/55">{s.text}</p>
        </div>
      ))}
    </div>
  );

  if (reduce) {
    return (
      <section className="woven woven-dark grain relative bg-ink py-24 text-paper lg:py-32">
        <div className="shell relative">
          {head}
          {StaticGrid}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Small screens keep the plain grid */}
      <section className="woven woven-dark grain relative bg-ink py-24 text-paper lg:hidden">
        <div className="shell relative">
          {head}
          {StaticGrid}
        </div>
      </section>

      {/* Large screens get the pinned line */}
      <section
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${steps.length * 72}vh` }}
      >
        <div className="woven woven-dark grain sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-ink text-paper">
          <div className="shell relative w-full">{pinnedHead}</div>

          <div className="relative mt-14 w-full">
            <motion.div
              className="flex gap-px bg-paper/15"
              style={{ x, width: `${trackPct}vw` }}
            >
              {steps.map((s) => (
                <article
                  key={s.step}
                  className="group relative flex min-h-[17rem] flex-1 flex-col justify-between bg-ink p-9 xl:p-11"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <span className="w-condensed text-7xl font-black leading-none text-paper/20 transition-colors duration-500 group-hover:text-signal xl:text-8xl">
                      {s.step}
                    </span>
                    <span className="mono-label whitespace-nowrap text-paper/35">{s.meta}</span>
                  </div>
                  <div>
                    <h3 className="w-condensed text-2xl font-bold uppercase leading-tight xl:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper/60">
                      {s.text}
                    </p>
                  </div>
                </article>
              ))}
            </motion.div>

            {/* Timeline: fills as the line advances */}
            <div className="shell mt-10">
              <div className="relative h-[2px] w-full bg-paper/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-signal"
                  style={{ width: progress }}
                />
              </div>
              <div className="mono-label mt-4 flex justify-between text-paper/35">
                <span>Week 1</span>
                <span>Week 12 — shipped</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
