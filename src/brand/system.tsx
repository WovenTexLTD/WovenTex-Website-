import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './motion';

/* ====================================================================== *
 *  Product-page primitives
 *
 *  The register the home page now speaks: large mixed-case headlines set
 *  tight and centred, one-line subheads, text links with a chevron, pill
 *  buttons, and content that arrives out of a soft blur. Yellow is kept for
 *  links and active states only.
 *
 *  Entrances adapted from 21st.dev "Blur Out Up" (@educalvolpz) and
 *  "Reveal" (@asanshay).
 * ====================================================================== */

/* ---------------------------------------------------------------- motion --- */

/* motion.create() during render mints a new component type every pass, which
   makes React remount the subtree each time. Cache per tag. */
const motionCache = new Map<string, React.ElementType>();
function motionTag(tag: keyof JSX.IntrinsicElements): React.ElementType {
  const hit = motionCache.get(tag);
  if (hit) return hit;
  const made = motion.create(tag);
  motionCache.set(tag, made);
  return made;
}

/**
 * Fades and un-blurs its children into place the first time they scroll into
 * view. Under reduced motion the content is simply there.
 */
export function Fade({
  children,
  className = '',
  delay = 0,
  amount = 0.25,
  as: As = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <As className={className}>{children}</As>;
  const M = motionTag(As);
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/**
 * A headline whose words lift out of a blur one after another. Plays on
 * mount; for above-the-fold type. The full string stays in the accessible
 * name so a screen reader never hears it word by word.
 */
export function Words({
  children,
  className = '',
  delay = 0,
  stagger = 0.032,
  as: As = 'span',
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}) {
  const reduce = useReducedMotion();
  const words = children.split(' ');
  if (reduce) return <As className={className}>{children}</As>;
  return (
    <As className={className} aria-label={children}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <motion.span
            aria-hidden
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </As>
  );
}

/* ------------------------------------------------------------------ type --- */

/** Section headline: centred by default, tight, semibold. */
export function Title({
  children,
  className = '',
  align = 'center',
  as: As = 'h2',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'center' | 'left';
  as?: React.ElementType;
  id?: string;
}) {
  return (
    <As
      id={id}
      className={`text-title font-semibold ${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}
    >
      {children}
    </As>
  );
}

/** The one-line subhead under a Title. */
export function Sub({
  children,
  className = '',
  align = 'center',
  tone = 'light',
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}) {
  return (
    <p
      className={`mt-4 max-w-2xl text-sub ${tone === 'dark' ? 'text-paper/70' : 'text-ash'} ${
        align === 'center' ? 'mx-auto text-center' : ''
      } ${className}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------- controls --- */

type PillTone = 'ink' | 'paper' | 'signal' | 'ghost-dark' | 'ghost';

const pillTones: Record<PillTone, string> = {
  ink: 'bg-ink text-paper hover:bg-ink-700',
  paper: 'bg-paper text-ink hover:bg-white',
  signal: 'bg-signal text-ink hover:bg-signal-600',
  'ghost-dark': 'border border-paper/40 text-paper hover:border-paper hover:bg-paper/10',
  ghost: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink/5',
};

/** Pill button. Mixed case, medium weight, generous radius. */
export function Pill({
  to,
  href,
  children,
  tone = 'ink',
  size = 'md',
  className = '',
  ...rest
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  tone?: PillTone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} & React.ComponentPropsWithoutRef<'a'>) {
  const sizes = {
    sm: 'px-3.5 py-1.5 text-[12px]',
    md: 'px-5 py-2.5 text-[15px]',
    lg: 'px-6 py-3 text-[17px]',
  };
  const cls = `inline-flex items-center justify-center rounded-full font-medium transition-colors duration-300 ease-brand ${sizes[size]} ${pillTones[tone]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

/** "Learn more ›" text link. Yellow on both grounds, chevron nudges on hover. */
export function TextLink({
  to,
  href,
  children,
  tone = 'light',
  className = '',
  ...rest
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
} & React.ComponentPropsWithoutRef<'a'>) {
  const cls = `group/link inline-flex items-center gap-1 text-[17px] font-medium transition-colors ${
    tone === 'dark' ? 'text-signal hover:text-signal-100' : 'text-signal-700 hover:text-ink'
  } ${className}`;
  const inner = (
    <>
      <span className="group-hover/link:underline underline-offset-4">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 ease-brand group-hover/link:translate-x-0.5"
      >
        ›
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

/* ------------------------------------------------------------------ tile --- */

/** Rounded surface for bento grids. */
export function Tile({
  children,
  className = '',
  tone = 'white',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'white' | 'haze' | 'ink';
}) {
  const tones = {
    white: 'bg-white text-ink',
    haze: 'bg-haze text-ink',
    ink: 'bg-ink text-paper',
  };
  return (
    <div className={`relative overflow-hidden rounded-4xl ${tones[tone]} ${className}`}>{children}</div>
  );
}
