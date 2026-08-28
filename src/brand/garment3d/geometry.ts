import { Quaternion, Vector3 } from 'three';

/* ====================================================================== *
 *  Pure geometry for the scroll-scrubbed garment.
 *
 *  One rule governs everything here: every vertex position is a pure
 *  function of (panel, u, v, progress). No state, no simulation, no
 *  accumulation, which is what makes the timeline scrubbable in both
 *  directions with identical results.
 *
 *  The brief suggested two baked buffers and a morph uniform; this
 *  evaluates parametrically per frame instead. Same determinism, but
 *  drape, curvature, per-panel stagger and per-seam gap-closing compose
 *  in one place, and seam lines can track the closing panel edges
 *  exactly rather than being baked at their final positions.
 *
 *  Everything is written into caller buffers or module scratch: the hot
 *  path allocates nothing per frame.
 * ====================================================================== */

export type PanelId = 'front' | 'back' | 'sleeveL' | 'sleeveR' | 'collar';
export const PANEL_IDS: PanelId[] = ['front', 'back', 'sleeveL', 'sleeveR', 'collar'];

/* ------------------------------------------------------------ timeline */

export const STAGES = {
  fabric: [0.0, 0.12],
  cutting: [0.12, 0.3],
  layout: [0.3, 0.48],
  stitching: [0.48, 0.68],
  resolution: [0.68, 0.85],
  finished: [0.85, 1.0],
} as const;

export const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
export const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/* ----------------------------------------------- alloc-free 2D curves */

type P2 = { x: number; y: number };
type Curve = (t: number, out: P2) => P2;

const line =
  (ax: number, ay: number, bx: number, by: number): Curve =>
  (t, out) => {
    out.x = mix(ax, bx, t);
    out.y = mix(ay, by, t);
    return out;
  };

const cubic =
  (
    p0x: number, p0y: number, p1x: number, p1y: number,
    p2x: number, p2y: number, p3x: number, p3y: number,
  ): Curve =>
  (t, out) => {
    const s = 1 - t;
    const w0 = s * s * s, w1 = 3 * s * s * t, w2 = 3 * s * t * t, w3 = t * t * t;
    out.x = w0 * p0x + w1 * p1x + w2 * p2x + w3 * p3x;
    out.y = w0 * p0y + w1 * p1y + w2 * p2y + w3 * p3y;
    return out;
  };

/** Chain sub-curves over shares of the 0..1 parameter. */
const piecewise =
  (parts: { upTo: number; c: Curve }[]): Curve =>
  (t, out) => {
    let prev = 0;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (t <= part.upTo || i === parts.length - 1) {
        return part.c((t - prev) / (part.upTo - prev || 1), out);
      }
      prev = part.upTo;
    }
    return parts[parts.length - 1].c(1, out);
  };

/* -------------------------------------------------------- panel outlines
   Local pattern space: x right, y up, origin mid-chest. Torso half-width
   is ~1. Realistic tee pattern shapes, not rectangles.                  */

const FRONT_NECK_CTRL = 0.58;
const BACK_NECK_CTRL = 0.885;

function bodyBounds(neckCtrlY: number): Bounds {
  return {
    bot: line(-0.98, -1.05, 0.98, -1.05),
    top: piecewise([
      { upTo: 0.18, c: line(-0.8, 0.82, -0.33, 0.97) },
      { upTo: 0.82, c: cubic(-0.33, 0.97, -0.18, neckCtrlY, 0.18, neckCtrlY, 0.33, 0.97) },
      { upTo: 1.0, c: line(0.33, 0.97, 0.8, 0.82) },
    ]),
    left: piecewise([
      { upTo: 0.72, c: cubic(-0.98, -1.05, -0.99, -0.42, -0.955, 0.02, -0.94, 0.3) },
      { upTo: 1.0, c: cubic(-0.94, 0.3, -0.9, 0.54, -0.81, 0.68, -0.8, 0.82) },
    ]),
    right: piecewise([
      { upTo: 0.72, c: cubic(0.98, -1.05, 0.99, -0.42, 0.955, 0.02, 0.94, 0.3) },
      { upTo: 1.0, c: cubic(0.94, 0.3, 0.9, 0.54, 0.81, 0.68, 0.8, 0.82) },
    ]),
  };
}

const COLLAR_HALF_W = 1.12;
const COLLAR_HALF_H = 0.07;

type Bounds = { bot: Curve; top: Curve; left: Curve; right: Curve };

const BOUNDS: Record<PanelId, Bounds> = {
  front: bodyBounds(FRONT_NECK_CTRL),
  back: bodyBounds(BACK_NECK_CTRL),
  sleeveL: {
    bot: line(-0.42, -0.6, 0.42, -0.6),
    top: cubic(-0.55, 0, -0.28, 0.4, 0.28, 0.4, 0.55, 0),
    left: line(-0.42, -0.6, -0.55, 0),
    right: line(0.42, -0.6, 0.55, 0),
  },
  sleeveR: {
    bot: line(-0.42, -0.6, 0.42, -0.6),
    top: cubic(-0.55, 0, -0.28, 0.4, 0.28, 0.4, 0.55, 0),
    left: line(-0.42, -0.6, -0.55, 0),
    right: line(0.42, -0.6, 0.55, 0),
  },
  collar: {
    bot: line(-COLLAR_HALF_W, -COLLAR_HALF_H, COLLAR_HALF_W, -COLLAR_HALF_H),
    top: line(-COLLAR_HALF_W, COLLAR_HALF_H, COLLAR_HALF_W, COLLAR_HALF_H),
    left: line(-COLLAR_HALF_W, -COLLAR_HALF_H, -COLLAR_HALF_W, COLLAR_HALF_H),
    right: line(COLLAR_HALF_W, -COLLAR_HALF_H, COLLAR_HALF_W, COLLAR_HALF_H),
  },
};

/* corner cache per panel: C00, C10, C01, C11 */
const CORNERS: Record<PanelId, [P2, P2, P2, P2]> = (() => {
  const rec = {} as Record<PanelId, [P2, P2, P2, P2]>;
  for (const id of PANEL_IDS) {
    const b = BOUNDS[id];
    rec[id] = [
      b.bot(0, { x: 0, y: 0 }),
      b.bot(1, { x: 0, y: 0 }),
      b.top(0, { x: 0, y: 0 }),
      b.top(1, { x: 0, y: 0 }),
    ];
  }
  return rec;
})();

const _B: P2 = { x: 0, y: 0 };
const _T: P2 = { x: 0, y: 0 };
const _L: P2 = { x: 0, y: 0 };
const _R: P2 = { x: 0, y: 0 };
const _lp: P2 = { x: 0, y: 0 };

/** Coons patch: boundary-respecting interior for the panel grid. */
function coons(id: PanelId, u: number, v: number, out: P2): P2 {
  const b = BOUNDS[id];
  b.bot(u, _B); b.top(u, _T); b.left(v, _L); b.right(v, _R);
  const [C00, C10, C01, C11] = CORNERS[id];
  out.x =
    (1 - v) * _B.x + v * _T.x + (1 - u) * _L.x + u * _R.x -
    ((1 - u) * (1 - v) * C00.x + u * (1 - v) * C10.x + (1 - u) * v * C01.x + u * v * C11.x);
  out.y =
    (1 - v) * _B.y + v * _T.y + (1 - u) * _L.y + u * _R.y -
    ((1 - u) * (1 - v) * C00.y + u * (1 - v) * C10.y + (1 - u) * v * C01.y + u * v * C11.y);
  return out;
}

/* ------------------------------------------------- marker (table) layout */

export const TABLE = { w: 6.6, h: 3.7 };

const MARKER: Record<PanelId, { x: number; y: number }> = {
  front: { x: -1.58, y: -0.14 },
  back: { x: 1.58, y: -0.14 },
  sleeveL: { x: -0.62, y: 1.18 },
  sleeveR: { x: 0.62, y: 1.18 },
  collar: { x: 0, y: -1.44 },
};

/* ------------------------------------------------------- assembled form */

const TORSO_Y = 0.15;
const FRONT_DEPTH = 0.32;
const BACK_DEPTH = 0.28;

function bodyAssembled(lx: number, ly: number, front: boolean, out: Vector3): Vector3 {
  const x = (front ? lx : -lx) * 0.97;
  /* the shoulder seam meets near z 0: depth collapses toward the top edge */
  const shoulderTaper = 1 - 0.88 * smooth(win(ly, 0.42, 0.95));
  const hemEase = 1 - 0.08 * smooth(win(-ly, 0.55, 1.05));
  const depth = (front ? FRONT_DEPTH : -BACK_DEPTH) * shoulderTaper * hemEase;
  const z = depth * Math.cos(clamp01(Math.abs(lx) / 1.02) * 1.25);
  return out.set(x, ly + TORSO_Y, z);
}

/* ----------------------------------------------- edge-pinned attachments
   The sleeve cap edge samples the body armhole curve directly, and the
   collar bottom edge traces the assembled neckline, so the joins meet by
   construction. No tuning, no floating pieces.                          */

function sleeveFrame(leftSide: boolean) {
  const sgn = leftSide ? -1 : 1;
  const S = new Vector3(sgn * 0.87, 0.72 + TORSO_Y, 0.0);
  const a = new Vector3(sgn * 0.8, -0.52, -0.06).normalize();
  const n1 = new Vector3().crossVectors(a, new Vector3(0, 0, 1)).normalize();
  const n2 = new Vector3().crossVectors(a, n1).normalize();
  const up = new Vector3(0, 1, 0);
  const thetaUp = Math.atan2(n2.dot(up), n1.dot(up));
  const E = new Vector3().copy(S).addScaledVector(a, 0.5);
  return { S, a, n1, n2, thetaUp, sgn, E };
}
const SLV = { L: sleeveFrame(true), R: sleeveFrame(false) };

const _edge: P2 = { x: 0, y: 0 };

/** A point on the body armhole, k: 0 underarm to 1 shoulder tip. */
function armholePoint(leftWorld: boolean, onFront: boolean, k: number, out: Vector3): Vector3 {
  const vv = 0.72 + 0.28 * clamp01(k);
  const b = onFront ? BOUNDS.front : BOUNDS.back;
  /* world-left comes from front.left, but from back.right (back mirrors x) */
  const useLeft = onFront ? leftWorld : !leftWorld;
  (useLeft ? b.left : b.right)(vv, _edge);
  return bodyAssembled(_edge.x, _edge.y, onFront, out);
}

const _cap = new Vector3();
const _hem = new Vector3();

function sleeveAssembled(lx: number, ly: number, leftSide: boolean, out: Vector3): Vector3 {
  const f = leftSide ? SLV.L : SLV.R;
  const u01 = clamp01((lx + 0.55) / 1.1); // 0 front underarm, 0.5 tip, 1 back underarm
  const k = 1 - Math.abs(2 * u01 - 1);
  armholePoint(leftSide, u01 <= 0.5, k, _cap);

  const theta = f.thetaUp + (u01 - 0.5) * 2 * 1.45 * (leftSide ? 1 : -1);
  const c = Math.cos(theta), sn = Math.sin(theta);
  const dx = f.n1.x * c + f.n2.x * sn;
  const dy = f.n1.y * c + f.n2.y * sn;
  const dz = f.n1.z * c + f.n2.z * sn;
  _hem.set(f.E.x + dx * 0.19, f.E.y + dy * 0.19, f.E.z + dz * 0.19);

  const vN = clamp01((ly + 0.6) / 0.6); // 0 hem, 1 cap
  out.copy(_hem).lerp(_cap, vN);
  /* a little roundness along the tube */
  const bulge = 0.045 * Math.sin(vN * Math.PI);
  out.x += dx * bulge; out.y += dy * bulge; out.z += dz * bulge;
  return out;
}

/** A point on the assembled neckline, w: 0..0.5 front scoop, 0.5..1 back. */
function neckPoint(w: number, out: Vector3): Vector3 {
  if (w <= 0.5) {
    BOUNDS.front.top(0.18 + 0.64 * (w * 2), _edge);
    return bodyAssembled(_edge.x, _edge.y, true, out);
  }
  BOUNDS.back.top(0.18 + 0.64 * ((w - 0.5) * 2), _edge);
  return bodyAssembled(_edge.x, _edge.y, false, out);
}

function collarAssembled(lx: number, ly: number, out: Vector3): Vector3 {
  const w = clamp01((lx + COLLAR_HALF_W) / (2 * COLLAR_HALF_W));
  neckPoint(w, out);
  const vv = (ly + COLLAR_HALF_H) / (2 * COLLAR_HALF_H); // 0 bottom, 1 top
  /* band rises from the neckline, leaning slightly inward */
  const inx = -out.x * 0.12, inz = (0.02 - out.z) * 0.12;
  out.x += inx * vv;
  out.y += vv * 0.085;
  out.z += inz * vv;
  return out;
}

/* --------------------------------------------------------- rigid poses
   Body panels swing rigidly from the table into an upright pose while a
   growing correction bends them onto the true assembled surface.
   Sleeves and collar are small: a direct world-space blend reads as the
   piece flying in and curling on, so they skip the pose decomposition. */

const FLAT_ROT = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
const BACK_END_ROT = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI);
const IDENT = new Quaternion();

const LAYOUT_WIN: Record<PanelId, [number, number]> = {
  front: [0.3, 0.42],
  back: [0.325, 0.45],
  sleeveL: [0.355, 0.465],
  sleeveR: [0.375, 0.48],
  collar: [0.395, 0.485],
};

const LIFT_STAGGER: Record<PanelId, number> = {
  front: 0, back: 0.008, sleeveL: 0.016, sleeveR: 0.02, collar: 0.026,
};

/* -------------------------------------------------------- gap closing */

export const SEAM_ORDER = [
  'shoulderL', 'shoulderR', 'sleeveSeamL', 'sleeveSeamR',
  'sideL', 'sideR', 'collarSeam', 'hemSleeveL', 'hemSleeveR', 'hemBody',
] as const;
export type SeamId = (typeof SEAM_ORDER)[number];

export const SEAM_WIN: Record<SeamId, [number, number]> = {
  shoulderL: [0.48, 0.51],
  shoulderR: [0.503, 0.533],
  sleeveSeamL: [0.53, 0.562],
  sleeveSeamR: [0.558, 0.59],
  sideL: [0.588, 0.618],
  sideR: [0.612, 0.642],
  collarSeam: [0.64, 0.668],
  hemSleeveL: [0.652, 0.674],
  hemSleeveR: [0.66, 0.682],
  hemBody: [0.668, 0.69],
};

const GAP = { body: 0.3, sleeve: 0.42, collar: 0.28 };

const _gap = new Vector3();

function gapOffset(id: PanelId, p: number): Vector3 {
  switch (id) {
    case 'front':
    case 'back': {
      /* each of the four joining seams closes a quarter of the gap */
      const close =
        0.25 * smooth(win(p, ...SEAM_WIN.shoulderL)) +
        0.25 * smooth(win(p, ...SEAM_WIN.shoulderR)) +
        0.25 * smooth(win(p, ...SEAM_WIN.sideL)) +
        0.25 * smooth(win(p, ...SEAM_WIN.sideR));
      return _gap.set(0, 0, (id === 'front' ? 1 : -1) * GAP.body * (1 - close));
    }
    case 'sleeveL':
      return _gap.set(-GAP.sleeve * (1 - smooth(win(p, ...SEAM_WIN.sleeveSeamL))), 0, 0);
    case 'sleeveR':
      return _gap.set(GAP.sleeve * (1 - smooth(win(p, ...SEAM_WIN.sleeveSeamR))), 0, 0);
    case 'collar':
      return _gap.set(0, GAP.collar * (1 - smooth(win(p, ...SEAM_WIN.collarSeam))), 0);
  }
}

/* ------------------------------------------------------ the evaluator */

const _asm = new Vector3();
const _flatEnd = new Vector3();
const _pose = new Vector3();
const _q = new Quaternion();
const _endPos = new Vector3();

export function worldPoint(id: PanelId, u: number, v: number, p: number, out: Vector3): Vector3 {
  coons(id, u, v, _lp);
  const lx = _lp.x, ly = _lp.y;
  const m = MARKER[id];

  /* drape: deterministic ripple, alive only before the cut completes */
  const gx = m.x + lx;
  const gy = m.y + ly;
  const drapeAmp = 0.024 * (1 - smooth(win(p, 0.2, 0.3)));
  const drape = drapeAmp * Math.sin(gx * 2.1 + p * 9) * Math.cos(gy * 1.9 + p * 5.2);
  const lift = 0.085 * smooth(win(p, 0.26 + LIFT_STAGGER[id], 0.315 + LIFT_STAGGER[id]));

  /* flat world pose on the table (marker y runs along world -z) */
  const fx = gx, fy = 0.012 + drape + lift, fz = -gy;

  const [w0, w1] = LAYOUT_WIN[id];
  const t = smooth(win(p, w0, w1));
  if (t <= 0) return out.set(fx, fy, fz);

  const gap = gapOffset(id, p);

  if (id === 'front' || id === 'back') {
    const front = id === 'front';
    _endPos.set(0, TORSO_Y, front ? 0.1 : -0.1);
    _q.copy(FLAT_ROT).slerp(front ? IDENT : BACK_END_ROT, t);
    _pose.set(m.x, 0.012, -m.y).lerp(_endPos, t);
    out.set(lx, ly, 0).applyQuaternion(_q).add(_pose);
    /* growing correction from the rigid end pose onto the curved form */
    _flatEnd.set(lx, ly, 0).applyQuaternion(front ? IDENT : BACK_END_ROT).add(_endPos);
    bodyAssembled(lx, ly, front, _asm).add(gap);
    return out.add(_asm.sub(_flatEnd).multiplyScalar(t));
  }

  if (id === 'collar') collarAssembled(lx, ly, _asm);
  else sleeveAssembled(lx, ly, id === 'sleeveL', _asm);
  _asm.add(gap);
  return out.set(fx, fy, fz).lerp(_asm, t);
}

/* ------------------------------------------------------------- seams */

type EdgeSample = (t: number) => [PanelId, number, number];

const SEAM_EDGES: Record<SeamId, { a: EdgeSample; b?: EdgeSample; n: number }> = {
  shoulderL: { a: (t) => ['front', 0.18 * t, 1], b: (t) => ['back', 0.18 * t, 1], n: 10 },
  shoulderR: { a: (t) => ['front', 1 - 0.18 * t, 1], b: (t) => ['back', 1 - 0.18 * t, 1], n: 10 },
  sleeveSeamL: { a: (t) => ['sleeveL', t, 1], n: 26 },
  sleeveSeamR: { a: (t) => ['sleeveR', t, 1], n: 26 },
  sideL: { a: (t) => ['front', 0, 0.72 * t], b: (t) => ['back', 1, 0.72 * t], n: 22 },
  sideR: { a: (t) => ['front', 1, 0.72 * t], b: (t) => ['back', 0, 0.72 * t], n: 22 },
  collarSeam: { a: (t) => ['collar', t, 0.06], n: 30 },
  hemSleeveL: { a: (t) => ['sleeveL', 0.06 + 0.88 * t, 0.05], n: 12 },
  hemSleeveR: { a: (t) => ['sleeveR', 0.06 + 0.88 * t, 0.05], n: 12 },
  hemBody: { a: (t) => ['front', 0.03 + 0.94 * t, 0.035], n: 26 },
};

/** The second needle row of the double-needle hem. */
export const HEM_ROW_2: EdgeSample = (t) => ['front', 0.03 + 0.94 * t, 0.075];

const _sa = new Vector3();
const _sb = new Vector3();

/** Current seam polyline; tracks the closing panels every frame. */
export function seamPolyline(
  id: SeamId,
  p: number,
  out: Vector3[],
  override?: EdgeSample,
): number {
  const def = SEAM_EDGES[id];
  const sampler = override ?? def.a;
  for (let i = 0; i <= def.n; i++) {
    const t = i / def.n;
    const [pa, ua, va] = sampler(t);
    worldPoint(pa, ua, va, p, _sa);
    if (!override && def.b) {
      const [pb, ub, vb] = def.b(t);
      worldPoint(pb, ub, vb, p, _sb);
      _sa.lerp(_sb, 0.5);
    }
    (out[i] ??= new Vector3()).copy(_sa);
  }
  return def.n + 1;
}

export const seamSegmentCount = (id: SeamId) => SEAM_EDGES[id].n;

/* ------------------------------------------------------------ outlines */

/** Boundary loop of a panel as (u, v) samples, for cut lines and edges. */
export function outlineParams(id: PanelId, perSide: number): [number, number][] {
  void id;
  const q = perSide;
  const pts: [number, number][] = [];
  for (let i = 0; i < q; i++) pts.push([i / q, 0]);
  for (let i = 0; i < q; i++) pts.push([1, i / q]);
  for (let i = 0; i < q; i++) pts.push([1 - i / q, 1]);
  for (let i = 0; i < q; i++) pts.push([0, 1 - i / q]);
  pts.push([0, 0]);
  return pts;
}

/* -------------------------------------------------------- fabric plane */

export function planePoint(u: number, v: number, p: number, out: Vector3): Vector3 {
  const x = (u - 0.5) * TABLE.w;
  const yM = (v - 0.5) * TABLE.h;
  const drapeAmp = 0.028 * (1 - smooth(win(p, 0.2, 0.28)));
  const y = drapeAmp * Math.sin(x * 2.1 + p * 9) * Math.cos(yM * 1.9 + p * 5.2);
  return out.set(x, y, -yM);
}

/* -------------------------------------------------------- camera path */

const CAM_KEYS: { p: number; pos: [number, number, number]; tgt: [number, number, number] }[] = [
  /* fabric and cutting hold the drafting-table view; the arc that sells
     the third dimension belongs to the layout stage */
  { p: 0.0, pos: [0.0, 3.7, 3.1], tgt: [0, 0, -0.15] },
  { p: 0.3, pos: [0.35, 3.35, 3.45], tgt: [0, 0, -0.1] },
  { p: 0.385, pos: [2.2, 2.5, 3.9], tgt: [0, 0.2, 0] },
  { p: 0.48, pos: [2.6, 1.05, 3.3], tgt: [0, 0.36, 0] },
  { p: 0.68, pos: [1.7, 0.6, 3.4], tgt: [0, 0.35, 0] },
  { p: 0.85, pos: [1.15, 0.35, 3.95], tgt: [0, 0.3, 0] },
  { p: 1.0, pos: [1.0, 0.28, 4.1], tgt: [0, 0.28, 0] },
];

export function cameraAt(p: number, pos: Vector3, tgt: Vector3): void {
  let i = 0;
  while (i < CAM_KEYS.length - 2 && p > CAM_KEYS[i + 1].p) i++;
  const a = CAM_KEYS[i], b = CAM_KEYS[i + 1];
  const t = smooth(clamp01((p - a.p) / (b.p - a.p)));
  pos.set(mix(a.pos[0], b.pos[0], t), mix(a.pos[1], b.pos[1], t), mix(a.pos[2], b.pos[2], t));
  tgt.set(mix(a.tgt[0], b.tgt[0], t), mix(a.tgt[1], b.tgt[1], t), mix(a.tgt[2], b.tgt[2], t));
}

/** Final-act garment yaw, radians. */
export function garmentYaw(p: number): number {
  return 0.85 * smooth(win(p, 0.85, 1.0));
}

/* ---------------------------------------------------- callout anchors */

export const CALLOUTS: { text: string; panel: PanelId; u: number; v: number }[] = [
  { text: 'JERSEY KNIT', panel: 'front', u: 0.62, v: 0.55 },
  { text: 'SET-IN SLEEVE', panel: 'sleeveL', u: 0.5, v: 0.96 },
  { text: '1×1 RIB COLLAR', panel: 'collar', u: 0.72, v: 0.5 },
  { text: 'DOUBLE-NEEDLE HEM', panel: 'front', u: 0.35, v: 0.035 },
];
