import React, { Suspense, useId, useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { WipeHeading } from './ui';
import type { CalloutEl, PointerPara } from './garment3d/GarmentStage';

const GarmentStage = React.lazy(() => import('./garment3d/GarmentStage'));

export type Stage = {
  step: string;
  title: string;
  text: string;
  meta: string;
};

/* ====================================================================== *
 *  The signature move, now genuinely three-dimensional.
 *
 *  One progress value, scrubbed by scroll while the section is pinned:
 *    0.00-0.12  fabric        a draped plane on the cutting table
 *    0.12-0.30  cutting       pattern outlines draw on, panels lift
 *    0.30-0.48  layout        panels swing into place around the form
 *    0.48-0.68  stitching     seams dash on in construction order
 *    0.68-0.85  resolution    wireframe becomes fabric, ground flips
 *    0.85-1.00  finished      slow turn, callouts, resolve
 *
 *  The 3D scene lazy-loads; until it arrives (or without WebGL) the
 *  static technical flat below stands in, so first paint never waits
 *  on three.js.
 * ====================================================================== */

const INK = '#0B0B0C';
const PAPER = '#F7F6F3';
const SIGNAL = '#FFB905';
/* signal, dark enough to pass AA once the ground flips to paper */
const SIGNAL_DEEP = '#8A6100';

const FLIP: [number, number] = [0.68, 0.85];

/* step windows: exactly one active at a time */
const STEP_WINDOWS: [number, number][] = [
  [0.0, 0.3],
  [0.3, 0.48],
  [0.48, 0.68],
  [0.68, 1.0],
];

const CAPTIONS: { at: [number, number]; text: string }[] = [
  { at: [0.0, 0.12], text: 'Fabric sourcing' },
  { at: [0.12, 0.3], text: 'Marking and cutting' },
  { at: [0.3, 0.48], text: 'Panel layout' },
  { at: [0.48, 0.68], text: 'Stitching' },
  { at: [0.68, 0.85], text: 'Finishing' },
  { at: [0.85, 1.0], text: 'Finished garment' },
];

const CALLOUT_LABELS = ['JERSEY KNIT', 'SET-IN SLEEVE', '1×1 RIB COLLAR', 'DOUBLE-NEEDLE HEM'];
/* which side of the anchor each label sits on */
const CALLOUT_SIDE: ('left' | 'right')[] = ['right', 'left', 'right', 'right'];

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/* ================================================= static technical flat
   The SVG drawing from the first build survives as the loading state and
   the no-WebGL fallback: a finished lay-plan rather than a blank box.  */

const BODY =
  'M 248 188 L 330 164 C 348 208, 412 208, 430 164 L 512 188 ' +
  'C 510 240, 506 285, 496 322 L 504 560 L 256 560 L 264 322 ' +
  'C 254 285, 250 240, 248 188 Z';
const BACK_NECK = 'M 330 164 C 355 148, 405 148, 430 164';
const SLEEVE_L =
  'M 248 188 C 212 196, 176 216, 150 242 L 188 350 C 214 342, 240 334, 264 322 ' +
  'C 246 282, 240 226, 248 188 Z';
const SLEEVE_R =
  'M 512 188 C 548 196, 584 216, 610 242 L 572 350 C 546 342, 520 334, 496 322 ' +
  'C 514 282, 520 226, 512 188 Z';
const RIB =
  'M 326 160 C 346 206, 414 206, 434 160 L 423 152 C 407 190, 353 190, 337 152 Z';
const SEAMS = [
  'M 252 192 L 326 170',
  'M 508 192 L 434 170',
  'M 334 170 C 350 204, 410 204, 426 170',
  'M 254 194 C 252 240, 256 285, 266 318',
  'M 506 194 C 508 240, 504 285, 488 318',
  'M 157 248 L 193 344',
  'M 603 248 L 567 344',
  'M 266 330 L 260 554',
  'M 494 330 L 500 554',
  'M 268 546 L 492 546 M 268 554 L 492 554',
];

function StaticFlat({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  void uid;
  return (
    <svg viewBox="0 70 760 560" className={className} aria-hidden>
      <g className="stroke-faint" strokeWidth={1}>
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`v${i}`} d={`M ${60 + 92 * i} 84 V 616`} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`h${i}`} d={`M 36 ${108 + 92 * i} H 724`} />
        ))}
      </g>
      {[BODY, SLEEVE_L, SLEEVE_R, RIB].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" />
      ))}
      <path d={BACK_NECK} fill="none" stroke="currentColor" strokeWidth={1.5} />
      {SEAMS.map((d, i) => (
        <path
          key={`s${i}`}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="6 7"
          opacity={0.7}
        />
      ))}
      <text
        x={380}
        y={640}
        textAnchor="middle"
        style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13, letterSpacing: '0.22em', fill: 'currentColor', opacity: 0.5 }}
      >
        TECHNICAL FLAT · CREW NECK TEE
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------- rail step */

function RailStep({
  stage,
  p,
  windowRange,
  isLast,
  accent,
}: {
  stage: Stage;
  p: MotionValue<number>;
  windowRange: [number, number];
  isLast: boolean;
  accent: MotionValue<string>;
}) {
  const [a, b] = windowRange;
  const keys = isLast ? [a - 0.012, a] : [a - 0.012, a, b - 0.012, b];
  const vals = isLast ? [0.35, 1] : [0.35, 1, 1, 0.35];
  const opacity = useTransform(p, keys, vals);
  const barScale = useTransform(p, keys, isLast ? [0, 1] : [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="border-faint relative border-t py-3.5 pl-5">
      <motion.span
        className="absolute left-0 top-0 h-full w-[2px] origin-top"
        style={{ scaleY: barScale, backgroundColor: accent }}
        aria-hidden
      />
      <div className="flex items-baseline justify-between gap-4">
        <motion.span className="mono-label" style={{ color: accent }}>
          {stage.step}
        </motion.span>
        <span className="text-faint mono-label">{stage.meta}</span>
      </div>
      <h3 className="mt-2 w-condensed text-lg font-bold uppercase leading-tight">{stage.title}</h3>
      <p className="text-dim mt-1 text-[13px] leading-snug [@media(max-height:840px)]:hidden">
        {stage.text}
      </p>
    </motion.div>
  );
}

function CaptionLine({
  p,
  at,
  text,
}: {
  p: MotionValue<number>;
  at: [number, number];
  text: string;
}) {
  const isFirst = at[0] === 0;
  const isLast = at[1] === 1;
  /* no overlap mid-swap: the outgoing caption is gone before the next
     arrives, so two labels never composite over each other */
  const keys = [
    ...(isFirst ? [] : [at[0] + 0.004, at[0] + 0.018]),
    ...(isLast ? [] : [at[1] - 0.018, at[1] - 0.004]),
  ];
  const vals = [...(isFirst ? [] : [0, 1]), ...(isLast ? [] : [1, 0])];
  const opacity = useTransform(p, keys, vals);
  return (
    <motion.span
      style={{ opacity }}
      className="text-dim mono-label absolute bottom-0 left-0 whitespace-nowrap"
    >
      {text}
    </motion.span>
  );
}

function Caption({ p }: { p: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-64">
      {CAPTIONS.map((c) => (
        <CaptionLine key={c.text} p={p} at={c.at} text={c.text} />
      ))}
    </div>
  );
}

function MobileStep({
  stage,
  p,
  windowRange,
  isLast,
  accent,
}: {
  stage: Stage;
  p: MotionValue<number>;
  windowRange: [number, number];
  isLast: boolean;
  accent: MotionValue<string>;
}) {
  const [a, b] = windowRange;
  /* handoff, not crossfade: the outgoing step is gone before the next lands */
  const keys = isLast
    ? [a + 0.006, a + 0.02]
    : [a + 0.006, a + 0.02, b - 0.02, b - 0.006];
  const first = a === 0;
  const inKeys = first ? keys.slice(2) : keys;
  const inVals = first ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(p, first && !isLast ? inKeys : keys, first && !isLast ? inVals : isLast ? [0, 1] : [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <div className="flex items-baseline gap-3">
        <motion.span className="mono-label" style={{ color: accent }}>
          {stage.step}
        </motion.span>
        <h3 className="w-condensed text-lg font-bold uppercase leading-tight">{stage.title}</h3>
        <span className="text-faint mono-label ml-auto">{stage.meta}</span>
      </div>
      <p className="text-dim mt-1 truncate text-[13px]">{stage.text}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------ pinned */

function PinnedGarment({
  stages,
  index,
  labelText,
  title,
  lede,
}: {
  stages: Stage[];
  index: string;
  labelText: string;
  title: React.ReactNode[];
  lede: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.28 });

  const bg = useTransform(p, FLIP, [INK, PAPER]);
  const fg = useTransform(p, FLIP, [PAPER, INK]);
  const accent = useTransform(p, FLIP, [SIGNAL, SIGNAL_DEEP]);
  const timeline = useTransform(p, [0.02, 0.97], ['0%', '100%']);

  const pointer = useRef<PointerPara>({ mx: 0, my: 0 });
  const kick = useRef<(() => void) | null>(null);
  const calloutEls = useRef<CalloutEl[]>(CALLOUT_LABELS.map(() => ({ el: null })));
  const debugRef = useRef<HTMLSpanElement | null>(null);

  const debug = useMemo(
    () => typeof window !== 'undefined' && window.location.search.includes('scrub'),
    [],
  );
  const density = useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.6 : 1),
    [],
  );

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current.mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.current.my = ((e.clientY - r.top) / r.height) * 2 - 1;
    kick.current?.();
  };
  const onPointerLeave = () => {
    pointer.current.mx = 0;
    pointer.current.my = 0;
    kick.current?.();
  };

  return (
    <section ref={trackRef} id="garment" className="relative h-[400vh] lg:h-[600vh]">
      <motion.div
        className="grain sticky top-0 flex h-screen flex-col overflow-hidden"
        style={{ backgroundColor: bg, color: fg }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="shell flex min-h-0 flex-1 flex-col pb-6 pt-24">
          {/* Head */}
          <div className="max-w-3xl">
            <div className="border-faint flex items-center gap-4 border-t pt-4">
              <motion.span className="mono-label" style={{ color: accent }}>
                {index}
              </motion.span>
              <span className="text-dim mono-label">{labelText}</span>
            </div>
            <WipeHeading
              as="h2"
              immediate
              lines={title}
              className="mt-4 w-condensed text-display-sm font-black uppercase [@media(max-height:840px)]:text-3xl"
            />
            <p className="text-dim mt-3 max-w-xl text-sm leading-relaxed [@media(max-height:760px)]:hidden">
              {lede}
            </p>
          </div>

          {/* Rail + canvas */}
          <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_auto] items-stretch gap-4 lg:grid-cols-[minmax(0,19rem)_1fr] lg:grid-rows-none lg:gap-12 xl:gap-16">
            {/* Step rail: desktop */}
            <div className="hidden flex-col justify-center lg:flex">
              {stages.map((s, i) => (
                <RailStep
                  key={s.step}
                  stage={s}
                  p={p}
                  windowRange={STEP_WINDOWS[i]}
                  isLast={i === stages.length - 1}
                  accent={accent}
                />
              ))}
            </div>

            {/* Mobile: one active step, crossfaded; the full list stays
                readable for assistive tech below */}
            <div className="relative row-start-2 h-16 lg:hidden" aria-hidden>
              {stages.map((s, i) => (
                <MobileStep
                  key={s.step}
                  stage={s}
                  p={p}
                  windowRange={STEP_WINDOWS[i]}
                  isLast={i === stages.length - 1}
                  accent={accent}
                />
              ))}
            </div>
            <ul className="sr-only">
              {stages.map((s) => (
                <li key={s.step}>
                  {s.step} {s.title} ({s.meta}): {s.text}
                </li>
              ))}
            </ul>

            {/* Canvas */}
            <div className="relative min-h-0 row-start-1 lg:row-auto">
              <Suspense fallback={<StaticFlat className="h-full w-full" />}>
                <GarmentStage
                  progress={p}
                  density={density}
                  pointer={pointer}
                  calloutEls={calloutEls}
                  debugEl={debug ? debugRef : undefined}
                  kick={kick}
                />
              </Suspense>

              {/* Callouts: positioned each frame from projected 3D anchors */}
              {CALLOUT_LABELS.map((text, i) => (
                <div
                  key={text}
                  ref={(el) => {
                    calloutEls.current[i].el = el;
                  }}
                  className="pointer-events-none absolute opacity-0"
                  style={{ transform: 'translate(0, -50%)' }}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      CALLOUT_SIDE[i] === 'left' ? '-translate-x-full flex-row-reverse' : ''
                    }`}
                  >
                    <motion.span
                      className="block h-[1px] w-12"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    />
                    <span className="mono-label whitespace-nowrap">{text}</span>
                  </div>
                </div>
              ))}

              <Caption p={p} />

              {debug && (
                <span
                  ref={debugRef}
                  className="mono-label absolute right-3 top-3 bg-black/40 px-2 py-1 text-[11px] text-white"
                />
              )}
            </div>
          </div>

          {/* Twelve-week timeline */}
          <div className="mt-4">
            <div className="bg-faint relative h-[2px] w-full">
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ width: timeline, backgroundColor: accent }}
              />
            </div>
            <div className="text-faint mono-label mt-3 flex justify-between">
              <span>
                Week 1<span className="hidden sm:inline">: tech pack</span>
              </span>
              <span className="sm:pr-44">
                Week 12<span className="hidden sm:inline">: shipped</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ----------------------------------------------------------- fallback */

function StaticGarment({
  stages,
  index,
  labelText,
  title,
  lede,
  webgl,
  reduced,
}: {
  stages: Stage[];
  index: string;
  labelText: string;
  title: React.ReactNode[];
  lede: React.ReactNode;
  webgl: boolean;
  reduced: boolean;
}) {
  const still = useMotionValue(1);
  const pointer = useRef<PointerPara>({ mx: 0, my: 0 });
  const calloutEls = useRef<CalloutEl[]>([]);
  /* reduced motion on a WebGL machine: one still frame of the finished tee */
  const showFinished = reduced && webgl;

  return (
    <section
      className={`grain relative py-24 ${showFinished ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}
    >
      <div className="shell">
        <div className="max-w-3xl">
          <div className="border-faint flex items-center gap-4 border-t pt-4">
            <span className={`mono-label ${showFinished ? 'text-signal-700' : 'text-signal'}`}>
              {index}
            </span>
            <span className="text-dim mono-label">{labelText}</span>
          </div>
          <WipeHeading
            as="h2"
            lines={title}
            className="mt-6 w-condensed text-display-sm font-black uppercase"
          />
          <p className="text-dim mt-6 max-w-2xl text-lg leading-relaxed">{lede}</p>
        </div>

        <div className="relative mx-auto mt-12 h-[24rem] max-w-2xl">
          {showFinished ? (
            <Suspense fallback={<StaticFlat className="h-full w-full" />}>
              <GarmentStage
                progress={still}
                frozen={1}
                density={0.8}
                pointer={pointer}
                calloutEls={calloutEls}
              />
            </Suspense>
          ) : (
            <StaticFlat className="h-full w-full" />
          )}
        </div>

        <div
          className={`mt-14 grid gap-px sm:grid-cols-2 ${showFinished ? 'bg-ink/12' : 'bg-paper/15'}`}
        >
          {stages.map((s) => (
            <div key={s.step} className={showFinished ? 'bg-paper p-7' : 'bg-ink p-7'}>
              <div className="flex items-baseline justify-between">
                <span className={`mono-label ${showFinished ? 'text-signal-700' : 'text-signal'}`}>
                  {s.step}
                </span>
                <span className="text-faint mono-label">{s.meta}</span>
              </div>
              <h3 className="mt-4 w-condensed text-xl font-bold uppercase leading-tight">
                {s.title}
              </h3>
              <p className="text-dim mt-2 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- export */

export default function GarmentLine({
  stages,
  index,
  label: labelText,
  title,
  lede,
}: {
  stages: Stage[];
  index: string;
  label: string;
  title: React.ReactNode[];
  lede: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [webgl] = useState(hasWebGL);

  if (reduce || !webgl) {
    return (
      <StaticGarment
        stages={stages}
        index={index}
        labelText={labelText}
        title={title}
        lede={lede}
        webgl={webgl}
        reduced={!!reduce}
      />
    );
  }

  return (
    <PinnedGarment stages={stages} index={index} labelText={labelText} title={title} lede={lede} />
  );
}
