import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { shirt, shirtMobile } from 'virtual:frame-sequence';
import useMinWidth from './useMinWidth';
import frameFor from './frameFor';

/* ====================================================================== *
 *  ShirtScrub
 *
 *  A shirt assembles itself under the scroll wheel. The section pins for a
 *  fixed scroll distance; how far through that distance you are is the only
 *  input to everything else in the frame. Scrolling down plays forward,
 *  scrolling up rewinds, nothing autoplays.
 *
 *  The clip is the background. Its studio grey is a vignette, so no flat
 *  colour could sit beside it without a seam; instead the canvas covers the
 *  whole pinned viewport, the frame is placed beside the type, and every
 *  exposed frame edge is blended into a grey sampled from the footage.
 * ====================================================================== */

/** Pinned scroll distance, in viewport heights. */
const DISTANCE_DESKTOP = 5;
const DISTANCE_MOBILE = 3.5;

/** The fixed header, at each breakpoint. Pinned content clears it. */
const NAV_PX = { mobile: 64, desktop: 72 };
const NAV_CLEARANCE = 'pt-16 lg:pt-[4.5rem]';

/**
 * Backing-store multiplier.
 *
 * Capped well below the retina 2 on purpose. Every scrubbed frame is a fresh
 * bitmap the GPU has never seen, so its cost scales with drawn area and no
 * amount of caching removes it: measured here, redrawing the same frame is
 * free, while stepping through different ones costs about 14ms at 2.2
 * megapixels. At 2 this canvas would be 2880x1800 and the scrub visibly
 * lags. The subject is a soft studio photograph behind gradient blends,
 * where the extra sampling buys nothing the eye can find, and all the type
 * in this section is DOM, so it stays at full device resolution regardless.
 */
const MAX_DPR = 1.25;

/** Until the first frame is sampled, the section wears a grey from the
    middle of the frame's edge range so the loading state does not flash. */
const FALLBACK_BG = '#b3b5b6';

const NONE: string[] = [];

/* --------------------------------------------------------------- steps --- */

type Step = { title: string; weeks: string; body: string };

/* Body copy is held to about 70 characters so it sits on two lines at the
   narrowest measure this slot ever has. Nothing here uses an em dash. */
const STEPS: Step[] = [
  {
    title: 'Design and consultation',
    weeks: 'Week 1',
    body: 'Tech pack review, fabric selection, costing and factory allocation.',
  },
  {
    title: 'Sample development',
    weeks: 'Weeks 2 to 4',
    body: 'Proto, fit and PP samples, with written approval at every gate.',
  },
  {
    title: 'Production and QC',
    weeks: 'Weeks 5 to 10',
    body: 'Bulk manufacturing with inline inspection and a four-point fabric audit.',
  },
  {
    title: 'Delivery and support',
    weeks: 'Weeks 11 to 12',
    body: 'Final AQL inspection, packing, documentation and global freight.',
  },
];
const N = STEPS.length;

/**
 * The scrolling column is the heading plus the four steps, so it moves in
 * N + 1 stages: stage 0 is the heading, stages 1 to N are the steps.
 */
const STAGES = N + 1;

/** Which step owns a given progress value, once the heading has passed. */
const stepAt = (p: number) => Math.min(N - 1, Math.max(0, Math.floor(p * STAGES) - 1));

/** Height of one step block, and so of the window it travels through. Taller
    on narrow screens, where both the title and the body wrap to more lines
    and a desktop-sized window would let two steps collide. */
const SLOT_DESKTOP = '11rem';
const SLOT_NARROW = '13.5rem';

/* ------------------------------------------------------------- preload --- */

type Sequence = {
  frames: (HTMLImageElement | null)[];
  /** Nearest already-decoded frame to `i`, or -1 while nothing has arrived. */
  nearest: (i: number) => number;
  total: number;
  /** At least one frame is drawable, so the section can stop waiting. */
  usable: boolean;
};

/** How many frames are in flight at once. Enough to saturate a connection,
    few enough that the earliest frames are not stuck behind 200 others. */
const CONCURRENCY = 8;

/**
 * The order frames are fetched in.
 *
 * Not 1, 2, 3. A sequential fetch means the end of the clip only exists once
 * everything before it has arrived, so a reader who scrolls straight through
 * sees nothing at the bottom. This walks the sequence in halving strides, so
 * after a couple of dozen frames there is coverage across the whole clip and
 * every later frame lands between two that already exist.
 */
function fetchOrder(n: number): number[] {
  const out: number[] = [];
  const seen = new Uint8Array(n);
  const push = (i: number) => {
    if (i >= 0 && i < n && !seen[i]) {
      seen[i] = 1;
      out.push(i);
    }
  };
  push(0);
  push(n - 1);
  for (let stride = 64; stride >= 1; stride = Math.floor(stride / 2)) {
    for (let i = 0; i < n; i += stride) push(i);
    if (stride === 1) break;
  }
  for (let i = 0; i < n; i++) push(i);
  return out;
}

/**
 * Streams the sequence in rather than blocking on all of it.
 *
 * Decoding matters as much as fetching: `decode()` resolves when the bitmap
 * is ready to draw, so the first `drawImage` of each frame does not pay a
 * decode on the main thread mid-scroll. But waiting for all of them before
 * showing anything meant a wait of seconds, so the section goes live on the
 * first frame and sharpens as the rest arrive.
 */
function usePreload(urls: string[], start: boolean, onFrame?: () => void): Sequence {
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const mask = useRef<Uint8Array>(new Uint8Array(0));
  const [usable, setUsable] = useState(false);

  useEffect(() => {
    if (!start || urls.length === 0) return;
    let cancelled = false;
    const n = urls.length;
    frames.current = new Array(n).fill(null);
    mask.current = new Uint8Array(n);
    setUsable(false);

    const order = fetchOrder(n);
    let cursor = 0;
    /* Deliberately no per-frame state: the section re-rendering on every one
       of 240 arrivals would cost more than the streaming saves. Progress is
       communicated by the picture sharpening, not by a counter. */
    let done = 0;

    const one = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        const settle = () => {
          if (cancelled) return resolve();
          /* A frame that fails still counts, so one bad file cannot wedge
             the loader; that index simply resolves to a neighbour. */
          if (img.naturalWidth) {
            frames.current[i] = img;
            mask.current[i] = 1;
          }
          done += 1;
          if (done === 1) setUsable(true);
          onFrame?.();
          resolve();
        };
        img.onerror = settle;
        img.src = urls[i];
        const dec = typeof img.decode === 'function' ? img.decode() : Promise.resolve();
        dec.then(settle, settle);
      });

    const worker = async (): Promise<void> => {
      while (!cancelled && cursor < order.length) {
        const i = order[cursor++];
        await one(i);
      }
    };
    for (let k = 0; k < Math.min(CONCURRENCY, n); k++) void worker();

    return () => {
      cancelled = true;
    };
  }, [urls, start, onFrame]);

  const nearest = useCallback((i: number) => {
    const m = mask.current;
    if (!m.length) return -1;
    const clamped = Math.min(m.length - 1, Math.max(0, i));
    if (m[clamped]) return clamped;
    for (let d = 1; d < m.length; d++) {
      if (clamped - d >= 0 && m[clamped - d]) return clamped - d;
      if (clamped + d < m.length && m[clamped + d]) return clamped + d;
    }
    return -1;
  }, []);

  return { frames: frames.current, nearest, total: urls.length, usable };
}

/* -------------------------------------------------------------- canvas --- */

type DrawResult = 'skip' | 'queued';

type StageHandle = {
  /** Ask for a frame. Coalesced into the next animation frame; 'skip' when
      that frame is already on screen or already queued. */
  draw: (index: number) => DrawResult;
  /** Re-resolve the frame last asked for. Called as new frames decode, so a
      coarse stand-in is replaced by the exact frame once it exists. */
  refresh: () => void;
};

type StageProps = {
  frames: (HTMLImageElement | null)[];
  /** Nearest decoded frame to an index, so scrubbing works mid-download. */
  nearest: (i: number) => number;
  ready: boolean;
  /** Reports the grey sampled from the footage, once a frame is drawable. */
  onPalette?: (hex: string) => void;
};

/** The page shell, mirrored from index.css so the canvas can place the frame
    relative to the text column rather than the viewport edge. */
const SHELL_MAX = 1344;
const shellPad = (cw: number) => Math.min(72, Math.max(20, 0.05 * cw));

type Placement = {
  dx: number;
  dy: number;
  dw: number;
  dh: number;
  /** Width of the soft blend into fill colour at each exposed frame edge. */
  blend: { left: number; right: number; top: number; bottom: number };
};

/**
 * Where the frame lands on the canvas, in CSS pixels.
 *
 * The footage has the shirt dead centre and, mid-sequence, its sleeves reach
 * the frame edges. Cover-fitting it therefore puts garment under any text
 * placed on top, at every scale. So the frame is not covered: it is placed.
 *
 * Landscape: the frame sits to the right of the text column, its left edge
 * just inside the column's right edge, cropped by the viewport on the right.
 * Portrait: the frame sits at the top under the header, the text below it.
 */
function layout(cw: number, ch: number, iw: number, ih: number): Placement {
  const stacked = cw < 1024 || cw < ch;

  if (!stacked) {
    const pad = shellPad(cw);
    const shellW = Math.min(cw, SHELL_MAX) - 2 * pad;
    const shellLeft = (cw - Math.min(cw, SHELL_MAX)) / 2 + pad;
    const textRight = shellLeft + Math.min(0.42 * shellW, 512);
    /* Occupancy is a performance dial as much as a compositional one: the
       per-frame cost is proportional to the pixels drawn. */
    const s = (0.78 * ch) / ih;
    const dw = iw * s;
    const dh = ih * s;
    const dx = textRight - 0.1 * dw;
    const dy = (ch - dh) / 2;
    return {
      dx,
      dy,
      dw,
      dh,
      blend: {
        left: dw * 0.26,
        right: dx + dw < cw ? dw * 0.12 : 0,
        top: dh * 0.14,
        bottom: dh * 0.14,
      },
    };
  }

  /* Slightly over width so the resting shirt has presence, capped so the
     text block always has the lower half or more to itself. */
  const s = Math.min((1.33 * cw) / iw, (0.42 * ch) / ih);
  const dw = iw * s;
  const dh = ih * s;
  const dx = (cw - dw) / 2;
  return {
    dx,
    dy: cw >= 1024 ? NAV_PX.desktop : NAV_PX.mobile,
    dw,
    dh,
    blend: {
      left: dx > 0 ? dw * 0.16 : 0,
      right: dx > 0 ? dw * 0.16 : 0,
      top: 0,
      bottom: dh * 0.3,
    },
  };
}

/** Average colour of the frame's outer border ring, as hex. Sampled from the
    first frame, before any garment is near the edges. */
function sampleBorder(img: HTMLImageElement): string | null {
  const w = 64;
  const h = 36;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x > 1 && x < w - 2 && y > 1 && y < h - 2) continue;
      const i = (y * w + x) * 4;
      r += d[i];
      g += d[i + 1];
      b += d[i + 2];
      n += 1;
    }
  }
  const hex = (v: number) => Math.round(v / n).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** Fill colour with an alpha, for the blend gradients. */
function withAlpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

const FrameCanvas = forwardRef<StageHandle, StageProps>(function FrameCanvas(
  { frames, nearest, ready, onPalette },
  ref,
) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const drawn = useRef(-1);
  const pending = useRef(-1);
  const raf = useRef(0);
  const fill = useRef(FALLBACK_BG);
  const dprRef = useRef(1);
  const imagesRef = useRef(frames);
  imagesRef.current = frames;
  const nearestRef = useRef(nearest);
  nearestRef.current = nearest;
  /* The frame the reader is actually on, as opposed to the one on screen,
     which may still be a neighbour standing in for it. */
  const wanted = useRef(-1);

  /* The four blend bands depend only on the layout and the fill colour, never
     on which frame is showing. Building them per paint meant allocating four
     gradients and alpha-filling several million pixels every frame, which at
     devicePixelRatio 2 costs more than the 16ms budget on its own. They are
     rendered once into this overlay and blitted. */
  const overlay = useRef<HTMLCanvasElement | null>(null);
  const overlayKey = useRef('');

  const buildOverlay = useCallback((cw: number, ch: number, place: Placement, hex: string) => {
    const key = `${cw}x${ch}|${hex}|${Math.round(place.dx)},${Math.round(place.dy)},${Math.round(place.dw)},${Math.round(place.dh)}`;
    if (overlayKey.current === key && overlay.current) return overlay.current;

    const dpr = dprRef.current;
    const c = overlay.current ?? document.createElement('canvas');
    c.width = Math.round(cw * dpr);
    c.height = Math.round(ch * dpr);
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    /* Surround and bands together, so the whole thing blits in one call at
       integer coordinates. */
    const { dx, dy, dw, dh, blend } = place;
    const solid = withAlpha(hex, 1);
    const clear = withAlpha(hex, 0);
    const band = (x0: number, y0: number, x1: number, y1: number, w: number, h: number) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, solid);
      g.addColorStop(1, clear);
      ctx.fillStyle = g;
      ctx.fillRect(Math.min(x0, x1), Math.min(y0, y1), w, h);
    };
    /* Opaque outside the frame, so the image never shows past its box. */
    ctx.fillStyle = solid;
    if (dx > 0) ctx.fillRect(0, 0, dx, ch);
    if (dx + dw < cw) ctx.fillRect(dx + dw, 0, cw - (dx + dw), ch);
    if (dy > 0) ctx.fillRect(dx, 0, dw, dy);
    if (dy + dh < ch) ctx.fillRect(dx, dy + dh, dw, ch - (dy + dh));

    if (blend.left > 0) band(dx, 0, dx + blend.left, 0, blend.left, ch);
    if (blend.right > 0) band(dx + dw, 0, dx + dw - blend.right, 0, blend.right, ch);
    if (blend.top > 0) band(0, dy, 0, dy + blend.top, cw, blend.top);
    if (blend.bottom > 0) band(0, dy + dh, 0, dy + dh - blend.bottom, cw, blend.bottom);

    overlay.current = c;
    overlayKey.current = key;
    return c;
  }, []);


  /* Paints whatever `drawn` says. Called only from the rAF callback and from
     resize, never straight from a scroll event. */
  const paint = useCallback(() => {
    const el = canvas.current;
    const img = imagesRef.current[drawn.current];
    if (!el || !img || !img.naturalWidth) return;
    const ctx = el.getContext('2d', { alpha: false });
    if (!ctx) return;

    /* Work in CSS pixels; the transform carries the pixel ratio. */
    const dpr = dprRef.current;
    const cw = el.width / dpr;
    const ch = el.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const place = layout(cw, ch, img.naturalWidth, img.naturalHeight);
    const { dx, dy, dw, dh } = place;
    const hex = fill.current;

    /* 'low' is bilinear and materially cheaper. Measured against 'high' on
       this canvas: 17.6ms average per frame versus 20.5ms, and three times
       as many dropped frames, for a difference the pre-sharpened source
       already covers. Sharpness is bought offline, not per frame. */
    ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(img, dx, dy, dw, dh);

    /* Then the cached surround-and-blends layer, in one blit at integer
       coordinates. Blitting only the band sub-rects measured no faster and
       put fractional source rects through the resampler, which left visible
       seams down the frame edges at fractional pixel ratios. */
    const ov = buildOverlay(cw, ch, place, hex);
    if (ov) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(ov, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    el.dataset.frame = String(drawn.current);
  }, [buildOverlay]);

  useImperativeHandle(
    ref,
    () => ({
      draw(index) {
        wanted.current = index;
        const resolved = nearestRef.current(index);
        if (resolved < 0) return 'skip';
        if (resolved === drawn.current || resolved === pending.current) return 'skip';
        pending.current = resolved;
        if (raf.current) return 'queued';
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          if (pending.current === drawn.current) return;
          drawn.current = pending.current;
          paint();
        });
        return 'queued';
      },
      refresh() {
        if (wanted.current >= 0) this.draw(wanted.current);
      },
    }),
    [paint],
  );

  /* Backing store follows the box and the pixel ratio. Zoom and monitor
     changes fire `resize` on window without touching the box, so both are
     listened to; either way the current frame is repainted at the new size. */
  useLayoutEffect(() => {
    const b = box.current;
    const el = canvas.current;
    if (!b || !el) return;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      dprRef.current = dpr;
      const w = Math.round(b.clientWidth * dpr);
      const h = Math.round(b.clientHeight * dpr);
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
      }
      paint();
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [paint]);

  /* Once the set is decoded: sample the footage's border grey from the first
     frame, then paint whatever index is pending or drawn, so a frame
     requested during loading is not lost. */
  useEffect(() => {
    if (!ready) return;
    const first = imagesRef.current[nearestRef.current(0)] ?? null;
    const hex = first ? sampleBorder(first) : null;
    if (hex) {
      fill.current = hex;
      onPalette?.(hex);
    }
    if (drawn.current < 0 && pending.current >= 0) drawn.current = pending.current;
    paint();
  }, [ready, paint, onPalette]);

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvas}
        aria-hidden
        className={`block h-full w-full transition-opacity duration-700 ease-brand ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
});

/* -------------------------------------------------------------- loader --- */

function Loading() {
  /* Shown only until the very first frame is drawable, which is now a
     fraction of a second. It deliberately carries no percentage: the number
     that matters to the reader is already zero by the time they could read
     it, and the rest of the sequence arrives behind a working section. */
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="mono-label animate-pulse text-ink/45">Loading sequence</span>
    </div>
  );
}

/* ------------------------------------------------------------ step text --- */

/**
 * The steps as one continuous strip that travels through a fixed window,
 * rather than four panels fading in place. Every pixel of page scroll moves
 * the text, so the section reads as scrolling instead of as a slideshow
 * changing slides. The window's mask does the fading at its edges, which is
 * what a real scroll looks like: content entering and leaving a viewport.
 *
 * Each block is exactly the window's height, so the strip is N times taller
 * and shifting it by 100/N per cent advances exactly one step. Step i sits
 * centred at the middle of its quarter, and the travel is clamped so the
 * first step holds before it and the last holds after.
 */
function StepStrip({ progress }: { progress: MotionValue<number> }) {
  const wide = useMinWidth(1024);
  const slot = wide ? SLOT_DESKTOP : SLOT_NARROW;
  const y = useTransform(progress, (p) => {
    const v = Math.min(STAGES - 1, Math.max(0, STAGES * p - 0.5));
    return `${-v * (100 / STAGES)}%`;
  });

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]"
      style={{ height: slot }}
    >
      <motion.div style={{ y }} className="will-change-transform">
        {/* Stage 0: the section heading travels with everything else rather
            than sitting static above it. One column, one movement. */}
        <div className="flex flex-col justify-center" style={{ height: slot }}>
          <div className="flex items-center gap-4 border-t border-ink/20 pt-4">
            <span className="mono-label text-ink">01 / 04</span>
            <span className="mono-label text-ink/55">How it runs</span>
          </div>
          <h2
            id="shirt-scrub-heading"
            className="mt-5 w-condensed text-display-sm font-black uppercase leading-[0.94] text-ink"
          >
            From tech pack
            <br />
            to container
          </h2>
        </div>

        {STEPS.map((step, index) => (
          <div
            key={step.title}
            aria-hidden
            className="flex flex-col justify-center"
            style={{ height: slot }}
          >
            <div className="flex items-baseline gap-4">
              <span className="mono-label text-ink/55">0{index + 1}</span>
              <span className="mono-label text-ink/55">{step.weeks}</span>
            </div>
            <h3 className="mt-3 w-condensed text-2xl font-bold uppercase leading-tight text-ink lg:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">{step.body}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Row height of the persistent rail, in px. Drives the sliding rule. */
const RAIL_ROW = 28;

function RailItem({ step, index, progress }: { step: Step; index: number; progress: MotionValue<number> }) {
  const a = index / N;
  const b = (index + 1) / N;
  const opacity = useTransform(progress, [a - 0.0001, a, b - 0.0001, b], [0.35, 1, 1, 0.35]);
  return (
    <motion.li style={{ opacity, height: RAIL_ROW }} className="flex items-center pl-5">
      <span className="mono-label text-ink">
        {step.title}
        <span className="sr-only">
          . {step.weeks}. {step.body}
        </span>
      </span>
    </motion.li>
  );
}

/**
 * The four steps as a real list, always in the DOM: what a screen reader or
 * keyboard user gets is the full text of every step, with no scrubbing.
 * Visually it is the compact index down the left, with one yellow rule that
 * slides to the active row.
 */
function Rail({ progress }: { progress: MotionValue<number> }) {
  const ruleY = useTransform(progress, (p) => stepAt(p) * RAIL_ROW);
  return (
    <div className="relative">
      <motion.span
        aria-hidden
        style={{ y: ruleY, height: RAIL_ROW }}
        className="absolute left-0 top-0 w-[2px] bg-signal"
      />
      <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-ink/15" />
      <ol aria-label="Production process, four steps">
        {STEPS.map((s, i) => (
          <RailItem key={s.title} step={s} index={i} progress={progress} />
        ))}
      </ol>
    </div>
  );
}

function Heading() {
  return (
    <>
      <div className="flex items-center gap-4 border-t border-ink/20 pt-4">
        <span className="mono-label text-ink">01 / 04</span>
        <span className="mono-label text-ink/55">How it runs</span>
      </div>
      <h2
        id="shirt-scrub-heading"
        className="mt-5 w-condensed text-display-sm font-black uppercase leading-[0.94] text-ink"
      >
        From tech pack
        <br />
        to container
      </h2>
    </>
  );
}

/* --------------------------------------------------- reduced motion path --- */

/**
 * No scrub, no pin: the finished garment as a still, with all four steps
 * listed in full. One frame is fetched to sample the same border grey the
 * live version uses, so the two read as the same section.
 */
function StaticSequence({ src }: { src: string | null }) {
  const [bg, setBg] = useState(FALLBACK_BG);
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    const done = () => {
      const hex = sampleBorder(img);
      if (hex) {
        setBg(hex);
        document.documentElement.style.setProperty('--shirt-bg', hex);
      }
    };
    (typeof img.decode === 'function' ? img.decode() : Promise.resolve()).then(done, () => {});
  }, [src]);

  return (
    <section
      className="relative text-ink"
      style={{ backgroundColor: bg }}
      aria-labelledby="shirt-scrub-heading"
    >
      <div className="shell grid gap-12 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <Heading />
          <ol className="mt-10 space-y-7">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-l-2 border-signal pl-5">
                <div className="flex items-baseline gap-4">
                  <span className="mono-label text-ink/55">0{i + 1}</span>
                  <span className="mono-label text-ink/55">{s.weeks}</span>
                </div>
                <h3 className="mt-2 w-condensed text-xl font-bold uppercase leading-tight">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        {src && (
          <img
            src={src}
            alt="The finished shirt from the assembly sequence"
            className="w-full [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_100%)]"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- section --- */

function LiveSequence({ urls }: { urls: string[] }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<StageHandle>(null);
  const desktop = useMinWidth(768);
  const distance = desktop ? DISTANCE_DESKTOP : DISTANCE_MOBILE;

  /* Nothing is fetched until the section is within a viewport of arriving,
     so the requests never compete with first paint. */
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '100% 0px 100% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Each newly decoded frame lets the canvas replace whatever stand-in is on
     screen with something closer to the frame actually being asked for. */
  const onFrame = useCallback(() => stage.current?.refresh(), []);
  const seq = usePreload(urls, near, onFrame);

  /* The section's own colour: sampled from the footage once it is decoded,
     so the loading state and any viewport sliver are the clip's grey. */
  const [bg, setBg] = useState(FALLBACK_BG);
  /* Published as a custom property so the section that follows can wear the
     same grey. Hardcoding it would drift the moment the frames are replaced. */
  const onPalette = useCallback((hex: string) => {
    setBg(hex);
    document.documentElement.style.setProperty('--shirt-bg', hex);
  }, []);

  /* Progress runs 0 at the moment the section top reaches the viewport top
     (the pin engages) to 1 when the section bottom meets the viewport bottom
     (the pin releases). Everything downstream reads this one value. */
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });

  /* Scroll to frame. The change handler does no drawing itself: it maps
     progress to an index and hands it to the stage, which coalesces into the
     next animation frame. */
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    stage.current?.draw(frameFor(p, seq.total));
  });

  /* When the set finishes decoding, paint wherever the reader already is
     rather than frame 0; they may have scrolled into the pin while it loaded. */
  useEffect(() => {
    if (seq.usable) stage.current?.draw(frameFor(scrollYProgress.get(), seq.total));
  }, [seq.usable, seq.total, scrollYProgress]);

  return (
    <section
      ref={section}
      className="relative text-ink"
      style={{ height: `${distance * 100}vh`, backgroundColor: bg }}
      aria-labelledby="shirt-scrub-heading"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <FrameCanvas
          ref={stage}
          frames={seq.frames}
          nearest={seq.nearest}
          ready={seq.usable}
          onPalette={onPalette}
        />
        {near && !seq.usable && <Loading />}

        {/* Type, set on the clip. Bottom-anchored in portrait so it sits
            under the frame; a left column, vertically centred, in landscape.
            All of it renders before a single frame arrives, so a slow
            connection still gets a complete, readable section. */}
        <div className={`relative flex h-full flex-col ${NAV_CLEARANCE}`}>
          <div className="shell flex flex-1 flex-col justify-end pb-10 lg:justify-center lg:pb-0">
            <div className="lg:w-[42%] lg:max-w-lg">
              {/* Fixed-height window: the whole column travels inside it, so
                  the longest block can never push into what sits beneath. */}
              <StepStrip progress={scrollYProgress} />

              {/* The visual rail needs about 120px of height that portrait
                  screens do not have under the frame. There, the accessible
                  list stays in the DOM and only the animated panel shows. */}
              <div className="mt-2 hidden lg:block">
                <Rail progress={scrollYProgress} />
              </div>
              <ol className="sr-only lg:hidden" aria-label="Production process, four steps">
                {STEPS.map((s) => (
                  <li key={s.title}>
                    {s.title}. {s.weeks}. {s.body}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ShirtScrub() {
  const reduce = useReducedMotion();
  const desktop = useMinWidth(768);

  /* Mobile takes the half-resolution set when one exists, otherwise the
     same frames. Both lists come from the directory at build time. */
  const urls = (!desktop && shirtMobile) || shirt || NONE;

  if (reduce) return <StaticSequence src={urls.length ? urls[urls.length - 1] : null} />;
  return <LiveSequence urls={urls} />;
}
