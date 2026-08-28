import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { EASE, rise, stagger } from './motion';

/* ====================================================================== *
 *  Motion presets — one vocabulary, used everywhere
 * ====================================================================== */

/* ---------------------------------------------------------------------- *
 * Calling motion.create() during render produces a new component type on
 * every pass, which makes React unmount and remount the subtree each time.
 * Cache them per tag instead.
 * -------------------------------------------------------------------- */
const motionCache = new Map<string, React.ElementType>();

function motionTag(tag: React.ElementType): React.ElementType {
  if (typeof tag !== 'string') return motion.create(tag as React.ComponentType);
  const hit = motionCache.get(tag);
  if (hit) return hit;
  const made = motion.create(tag as keyof JSX.IntrinsicElements);
  motionCache.set(tag, made);
  return made;
}

/** Scroll-triggered container. Children using `rise` animate in sequence. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  each = 0.08,
  as: As = 'div',
  amount = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  each?: number;
  as?: React.ElementType;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionAs = motionTag(As);
  if (reduce) return <As className={className}>{children}</As>;
  return (
    <MotionAs
      className={className}
      variants={stagger(delay, each)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionAs>
  );
}

/** A single item inside a <Reveal>. */
export function RevealItem({
  children,
  className = '',
  as: As = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionAs = motionTag(As);
  if (reduce) return <As className={className}>{children}</As>;
  return (
    <MotionAs className={className} variants={rise}>
      {children}
    </MotionAs>
  );
}

/**
 * Headline that wipes up from behind a mask, line by line.
 * Pass each line as a separate string — that's what makes the effect read.
 */
export function WipeHeading({
  lines,
  className = '',
  as: As = 'h2',
  delay = 0,
  immediate = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  as?: React.ElementType;
  delay?: number;
  /** Play on mount rather than on scroll — for above-the-fold headlines */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();

  // Reduced motion gets the finished headline, not a faded approximation of it
  if (reduce) {
    return (
      <As className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block pb-[0.09em]">
            {line}
          </span>
        ))}
      </As>
    );
  }

  return (
    <As className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.09em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            {...(immediate
              ? { animate: { y: '0%' } }
              : { whileInView: { y: '0%' }, viewport: { once: true, amount: 0.5 } })}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </As>
  );
}

/**
 * Entrance fade for above-the-fold content. Under `prefers-reduced-motion`
 * it renders straight to its final state rather than animating.
 */
export function Enter({
  children,
  className = '',
  delay = 0,
  y = 20,
  as: As = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: React.ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionAs = motionTag(As);
  if (reduce) return <As className={className}>{children}</As>;
  return (
    <MotionAs
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </MotionAs>
  );
}

/* ====================================================================== *
 *  Layout
 * ====================================================================== */

export function Section({
  children,
  className = '',
  tone = 'paper',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'paper' | 'paper-2' | 'ink' | 'none';
  id?: string;
}) {
  const tones: Record<string, string> = {
    paper: 'bg-paper text-ink',
    'paper-2': 'bg-paper-200 text-ink',
    ink: 'bg-ink text-paper grain',
    none: '',
  };
  return (
    <section id={id} className={`relative ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

/**
 * Section masthead: mono index + label on a rule, then the headline.
 * This is the repeating structural motif across the whole site.
 */
export function SectionHead({
  index,
  label,
  title,
  lede,
  align = 'left',
  tone = 'light',
  className = '',
  immediate = false,
}: {
  index?: string;
  label: string;
  title: React.ReactNode[];
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  /** For heads inside a sticky/pinned container, where scroll-triggering
      the wipe is unreliable — play it on mount instead. */
  immediate?: boolean;
}) {
  const dark = tone === 'dark';
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      <Reveal>
        <RevealItem>
          <div
            className={`flex items-center gap-4 border-t pt-4 ${
              dark ? 'border-paper/20' : 'border-ink/15'
            } ${align === 'center' ? 'justify-center' : ''}`}
          >
            {index && (
              <span className={`mono-label ${dark ? 'text-signal' : 'text-signal-700'}`}>{index}</span>
            )}
            <span className={`mono-label ${dark ? 'text-paper/60' : 'text-ink-400'}`}>{label}</span>
          </div>
        </RevealItem>
        <WipeHeading
          as="h2"
          lines={title}
          delay={0.05}
          immediate={immediate}
          className="mt-6 font-black w-condensed text-display-sm uppercase"
        />
        {lede && (
          <RevealItem>
            <p
              className={`mt-6 text-lg leading-relaxed ${
                dark ? 'text-paper/70' : 'text-ink-400'
              } ${align === 'center' ? 'mx-auto' : ''} max-w-2xl`}
            >
              {lede}
            </p>
          </RevealItem>
        )}
      </Reveal>
    </div>
  );
}

/* ====================================================================== *
 *  Controls
 * ====================================================================== */

type ButtonTone = 'signal' | 'ink' | 'paper' | 'ghost' | 'ghost-dark';

const buttonTones: Record<ButtonTone, string> = {
  signal: 'bg-signal text-ink hover:bg-signal-600',
  ink: 'bg-ink text-paper hover:bg-ink-700',
  paper: 'bg-paper text-ink hover:bg-white',
  ghost: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  'ghost-dark': 'border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink',
};

const buttonBase =
  'group/btn relative inline-flex items-center justify-center gap-3 px-7 py-4 font-semibold text-sm uppercase tracking-label transition-colors duration-300 ease-brand';

export function Button({
  to,
  href,
  children,
  tone = 'signal',
  className = '',
  ...rest
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  tone?: ButtonTone;
  className?: string;
} & React.ComponentPropsWithoutRef<'a'>) {
  const cls = `${buttonBase} ${buttonTones[tone]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 ease-brand group-hover/btn:translate-x-1"
      >
        →
      </span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

/* ====================================================================== *
 *  Data display
 * ====================================================================== */

/** Counts a number up when it scrolls into view, preserving prefix/suffix. */
export function Counter({
  value,
  className = '',
  duration = 1.8,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  /* Split "500,000+" into prefix / number / suffix so only the digits animate.
     Memoised deliberately: the regex result is a fresh array each render, and
     if it reaches the effect's dependency list every setShown restarts the
     animation, which leaves the figure stuck near zero forever. */
  const parsed = useMemo(() => {
    const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m) return { numeric: false, prefix: '', digits: '', suffix: value, target: 0, decimals: 0 };
    const digits = m[2];
    const target = Number(digits.replace(/,/g, ''));
    const dot = digits.indexOf('.');
    return {
      numeric: !Number.isNaN(target),
      prefix: m[1],
      digits,
      suffix: m[3],
      target,
      decimals: dot === -1 ? 0 : digits.length - dot - 1,
    };
  }, [value]);

  const { numeric, prefix, digits, suffix, target, decimals } = parsed;

  const format = useCallback(
    (n: number) =>
      n.toLocaleString('en-GB', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );

  const [shown, setShown] = useState(() => (numeric ? format(0) : ''));

  useEffect(() => {
    if (!numeric) return;

    if (reduce) {
      setShown(digits);
      return;
    }
    if (!inView) return;

    let raf = 0;
    let start = 0;
    const ms = duration * 1000;

    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / ms, 1);
      // ease-out-expo, so it decelerates into the final figure
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setShown(format(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Every dependency here is a primitive or a stable callback, so the
    // animation runs once through rather than restarting on each frame.
  }, [numeric, inView, reduce, target, digits, duration, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {numeric ? shown : suffix}
      {numeric ? suffix : ''}
    </span>
  );
}

/** Edge-to-edge infinite marquee. Children are duplicated for the seam. */
export function Marquee({
  children,
  speed = 40,
  className = '',
  reverse = false,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee"
        style={
          {
            '--marquee-duration': `${speed}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Image that drifts slightly against the scroll. Subtle by design. */
export function Parallax({
  progress,
  distance = 60,
  children,
  className = '',
}: {
  progress: MotionValue<number>;
  distance?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const raw = useTransform(progress, [0, 1], [-distance, distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div className={className} style={{ y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}

/** A labelled figure — the site's core "fact" component. */
export function Stat({
  value,
  label,
  note,
  tone = 'light',
}: {
  value: string;
  label: string;
  note?: string;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <div className={`border-t pt-5 ${dark ? 'border-paper/20' : 'border-ink/15'}`}>
      <Counter
        value={value}
        className="block font-black w-condensed text-4xl leading-none tracking-tight lg:text-5xl"
      />
      <div className={`mono-label mt-3 ${dark ? 'text-paper/55' : 'text-ink-400'}`}>{label}</div>
      {note && <p className={`mt-2 text-sm ${dark ? 'text-paper/60' : 'text-ink-300'}`}>{note}</p>}
    </div>
  );
}

/** Two-column spec row, as on a technical datasheet. */
export function SpecRow({
  term,
  children,
  tone = 'light',
}: {
  term: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <div
      className={`grid grid-cols-1 gap-2 border-t py-5 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8 ${
        dark ? 'border-paper/15' : 'border-ink/12'
      }`}
    >
      <dt className={`mono-label pt-1 ${dark ? 'text-paper/60' : 'text-ink-400'}`}>{term}</dt>
      <dd className={`${dark ? 'text-paper/80' : 'text-ink-600'} leading-relaxed`}>{children}</dd>
    </div>
  );
}
