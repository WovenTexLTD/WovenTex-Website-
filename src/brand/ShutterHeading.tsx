import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './motion';

/* ====================================================================== *
 *  ShutterHeading
 *
 *  A display headline that assembles character by character while three
 *  horizontal slices of the same glyph sweep across it in signal yellow,
 *  like a camera shutter, or a garment passing under a cutting laser.
 *
 *  Technique adapted from 21st.dev "Hero Shutter Text" (@daiwiikharihar),
 *  restyled onto the WovenTex ink / paper / signal system.
 * ====================================================================== */

/** The three bands of each glyph, and the direction each one travels. */
const SLICES = [
  { clip: 'polygon(0 0, 100% 0, 100% 34%, 0 34%)', from: '-110%', to: '110%', lag: 0 },
  { clip: 'polygon(0 34%, 100% 34%, 100% 67%, 0 67%)', from: '110%', to: '-110%', lag: 0.05 },
  { clip: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)', from: '-110%', to: '110%', lag: 0.1 },
];

export type ShutterLine = string | { text: string; accent?: boolean };

function lineParts(line: ShutterLine) {
  return typeof line === 'string' ? { text: line, accent: false } : { accent: false, ...line };
}

export default function ShutterHeading({
  lines,
  className = '',
  as: As = 'h2',
  delay = 0,
  /** Play on mount rather than on scroll, for above-the-fold headlines. */
  immediate = false,
  /** Seconds between neighbouring characters. Deliberately short: across a
      three-line display headline even a small value compounds, and a hero
      that has not settled within about a second and a half reads as slow. */
  each = 0.016,
}: {
  lines: ShutterLine[];
  className?: string;
  as?: React.ElementType;
  delay?: number;
  immediate?: boolean;
  each?: number;
}) {
  const reduce = useReducedMotion();

  /* Characters are staggered on a single running index across all lines, so
     the sweep reads as one continuous pass rather than restarting per line.
     They're grouped into words first: every glyph is its own inline-block, so
     without that grouping a narrow viewport would break lines mid-word. */
  const rows = useMemo(() => {
    let i = 0;
    return lines.map((line) => {
      const { text, accent } = lineParts(line);
      return {
        accent,
        text,
        words: text.split(' ').map((word) => ({
          chars: Array.from(word).map((char) => ({ char, i: i++ })),
        })),
      };
    });
  }, [lines]);

  // Reduced motion gets the finished headline, not an approximation of it.
  if (reduce) {
    return (
      <As className={className} aria-label={lines.map((l) => lineParts(l).text).join(' ')}>
        {rows.map((row, r) => (
          <span key={r} className={`block pb-[0.06em] ${row.accent ? 'text-signal' : ''}`}>
            {row.text}
          </span>
        ))}
      </As>
    );
  }

  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, amount: 0.4 } };

  return (
    <As className={className} aria-label={lines.map((l) => lineParts(l).text).join(' ')}>
      {rows.map((row, r) => (
        /* Trigger on the line, which nothing clips. Each glyph sits in its
           own overflow-hidden box and its slice layers start translated right
           out of it, so observing those directly reports no intersection and
           they would never fire. They inherit the variant from here instead. */
        <motion.span
          key={r}
          aria-hidden
          className={`block pb-[0.06em] ${row.accent ? 'text-signal' : ''}`}
          variants={{ hidden: {}, show: {} }}
          initial="hidden"
          {...trigger}
        >
          {row.words.map((word, w) => (
            <React.Fragment key={w}>
              {/* Word box keeps line breaks between words, never inside one */}
              <span className="inline-block whitespace-nowrap">
                {word.chars.map(({ char, i }) => {
                  const at = delay + i * each;
                  return (
                    <span
                      key={i}
                      className="relative inline-block overflow-hidden pb-[0.14em] align-bottom"
                    >
                      {/* The glyph itself, defines the box the slices ride in */}
                      <motion.span
                        className="block"
                        variants={{
                          hidden: { opacity: 0, filter: 'blur(14px)', y: '0.12em' },
                          show: {
                            opacity: 1,
                            filter: 'blur(0px)',
                            y: '0em',
                            transition: { duration: 0.5, delay: at + 0.16, ease: EASE },
                          },
                        }}
                      >
                        {char}
                      </motion.span>

                      {/* Three bands of the same glyph, sweeping past each other */}
                      {SLICES.map((s, si) => (
                        <motion.span
                          key={si}
                          aria-hidden
                          className={`pointer-events-none absolute inset-0 block ${
                            si === 1 ? 'text-paper/70' : 'text-signal'
                          }`}
                          style={{ clipPath: s.clip }}
                          variants={{
                            hidden: { x: s.from, opacity: 0 },
                            show: {
                              x: s.to,
                              opacity: [0, 1, 1, 0],
                              transition: { duration: 0.5, delay: at + s.lag, ease: 'easeInOut' },
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  );
                })}
              </span>
              {w < row.words.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </motion.span>
      ))}
    </As>
  );
}
