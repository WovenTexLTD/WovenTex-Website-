import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  RepeatWrapping,
  Vector2,
  Vector3,
} from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import type { MotionValue } from 'framer-motion';
import {
  CALLOUTS,
  HEM_ROW_2,
  PANEL_IDS,
  SEAM_ORDER,
  SEAM_WIN,
  cameraAt,
  garmentYaw,
  outlineParams,
  planePoint,
  seamPolyline,
  smooth,
  win,
  worldPoint,
  type SeamId,
} from './geometry';

/* ====================================================================== *
 *  The 3D stage. One progress value drives everything; the scene renders
 *  on demand (scroll and pointer changes invalidate), so an idle page
 *  draws no frames at all.
 * ====================================================================== */

export type PointerPara = { mx: number; my: number };
export type CalloutEl = { el: HTMLDivElement | null };

type StageProps = {
  progress: MotionValue<number>;
  frozen?: number;
  density?: number;
  pointer: React.MutableRefObject<PointerPara>;
  calloutEls: React.MutableRefObject<CalloutEl[]>;
  debugEl?: React.MutableRefObject<HTMLSpanElement | null>;
  /* lets the host request a frame when the pointer moves */
  kick?: React.MutableRefObject<(() => void) | null>;
};

const INKC = '#EDEDF0';
const STITCH_DARK = '#FFC63F';
const STITCH_LIGHT = '#B08A28';

/* ------------------------------------------------------------ helpers */

function knitTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d')!;
  x.fillStyle = '#808080';
  x.fillRect(0, 0, 64, 64);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const y0 = row * 8;
      const x0 = col * 8;
      const g = x.createLinearGradient(x0, y0, x0 + 8, y0 + 8);
      g.addColorStop(0, '#8c8c8c');
      g.addColorStop(0.5, '#7a7a7a');
      g.addColorStop(1, '#858585');
      x.fillStyle = g;
      x.fillRect(x0, y0, 8, 8);
      x.fillStyle = row % 2 ? '#767676' : '#8e8e8e';
      x.fillRect(x0 + 2, y0 + (row % 2) * 4, 4, 2);
    }
  }
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(9, 12);
  return t;
}

function gridGeometry(nu: number, nv: number): { geo: BufferGeometry; count: number } {
  const geo = new BufferGeometry();
  const count = nu * nv;
  geo.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3));
  const idx: number[] = [];
  for (let v = 0; v < nv - 1; v++) {
    for (let u = 0; u < nu - 1; u++) {
      const a = v * nu + u, b = a + 1, c = a + nu, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  geo.setIndex(idx);
  return { geo, count };
}

function lineSet(maxSegs: number, mat: LineMaterial): { obj: LineSegments2; arr: Float32Array } {
  const geo = new LineSegmentsGeometry();
  const arr = new Float32Array(maxSegs * 6);
  geo.setPositions(arr);
  geo.instanceCount = 0;
  const obj = new LineSegments2(geo, mat);
  obj.frustumCulled = false;
  obj.visible = false;
  return { obj, arr };
}

function pushSeg(arr: Float32Array, i: number, a: Vector3, b: Vector3): void {
  const o = i * 6;
  arr[o] = a.x; arr[o + 1] = a.y; arr[o + 2] = a.z;
  arr[o + 3] = b.x; arr[o + 4] = b.y; arr[o + 5] = b.z;
}

function flushLines(set: { obj: LineSegments2; arr: Float32Array }, count: number): void {
  const geo = set.obj.geometry as LineSegmentsGeometry;
  const attr = geo.getAttribute('instanceStart') as unknown as { data: { array: Float32Array; needsUpdate: boolean } };
  attr.data.array.set(set.arr);
  attr.data.needsUpdate = true;
  geo.instanceCount = count;
  set.obj.visible = count > 0;
}

/* -------------------------------------------------------------- scene */

const STAGE_NAMES: [number, string][] = [
  [0.12, 'FABRIC SOURCING'],
  [0.3, 'MARKING AND CUTTING'],
  [0.48, 'PANEL LAYOUT'],
  [0.68, 'STITCHING'],
  [0.85, 'FINISHING'],
  [1.01, 'FINISHED GARMENT'],
];

function Scene({ progress, frozen, density = 1, pointer, calloutEls, debugEl, kick }: StageProps) {
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);

  useEffect(() => {
    if (!kick) return;
    kick.current = invalidate;
    return () => { kick.current = null; };
  }, [kick, invalidate]);

  const pRef = useRef(frozen ?? progress.get());
  useEffect(() => {
    if (frozen != null) return;
    return progress.on('change', (v) => {
      pRef.current = v;
      invalidate();
    });
  }, [progress, frozen, invalidate]);

  const N = Math.max(13, Math.round(30 * density)) | 1; // odd, >= 13

  const world = useMemo(() => {
    const group = new Group();

    /* fabric plane */
    const planeNu = 45, planeNv = 29;
    const plane = gridGeometry(planeNu, planeNv);
    const planeMat = new MeshBasicMaterial({
      color: '#17181C', transparent: true, opacity: 0.92, side: DoubleSide, depthWrite: false,
    });
    const planeMesh = new Mesh(plane.geo, planeMat);
    planeMesh.frustumCulled = false;
    group.add(planeMesh);

    /* panels: shared geometry, dark technical material + fabric material */
    const knit = knitTexture();
    const panels = PANEL_IDS.map((id) => {
      const nu = id === 'collar' ? 57 : N + 1;
      const nv = id === 'collar' ? 5 : N + 1;
      const g = gridGeometry(nu, nv);
      g.geo.setAttribute('normal', new BufferAttribute(new Float32Array(nu * nv * 3), 3));
      const dark = new MeshBasicMaterial({
        color: '#1D1F24', transparent: true, opacity: 0, side: DoubleSide, depthWrite: true,
      });
      const fab = new MeshStandardMaterial({
        color: '#F2F0EC', transparent: true, opacity: 0, side: DoubleSide,
        roughness: 0.9, metalness: 0, bumpMap: knit, bumpScale: 0.03,
      });
      const meshDark = new Mesh(g.geo, dark);
      const meshFab = new Mesh(g.geo, fab);
      meshDark.frustumCulled = meshFab.frustumCulled = false;
      meshDark.visible = meshFab.visible = false;
      meshFab.renderOrder = 1;
      group.add(meshDark, meshFab);
      return { id, nu, nv, geo: g.geo, dark, fab, meshDark, meshFab };
    });

    /* line materials (shared per family) */
    const res = new Vector2(1, 1);
    const outlineMat = new LineMaterial({
      color: new Color(INKC).getHex(), linewidth: 1.6, transparent: true, opacity: 0.95,
    });
    const gridMat = new LineMaterial({
      color: new Color(INKC).getHex(), linewidth: 0.8, transparent: true, opacity: 0.0,
    });
    const stitchMat = new LineMaterial({
      color: new Color(STITCH_DARK).getHex(), linewidth: 2.2, transparent: true, opacity: 0.95,
    });
    for (const m of [outlineMat, gridMat, stitchMat]) m.resolution = res;

    /* outlines: draw-on cut lines that stay as panel edges */
    const PER_SIDE = 26;
    const outlines = PANEL_IDS.map((id) => {
      const params = outlineParams(id, PER_SIDE);
      const set = lineSet(params.length - 1, outlineMat);
      group.add(set.obj);
      return { id, params, set };
    });

    /* drafting iso-lines on the body and sleeve panels */
    const isoDefs = panels
      .filter((p) => p.id !== 'collar')
      .map((p) => {
        const step = Math.max(3, Math.floor((p.nu - 1) / 6));
        const uLines: number[] = [];
        for (let i = step; i < p.nu - 1; i += step) uLines.push(i / (p.nu - 1));
        const segs = uLines.length * 2 * (p.nu - 1);
        const set = lineSet(segs, gridMat);
        group.add(set.obj);
        return { id: p.id, uLines, n: p.nu - 1, set };
      });

    /* stitch seams: literal dash geometry, revealed along arc length */
    const seamSets = SEAM_ORDER.map((id) => {
      const set = lineSet(72, stitchMat);
      group.add(set.obj);
      return { id, set };
    });
    const hemRow2 = lineSet(72, stitchMat);
    group.add(hemRow2.obj);

    /* lights: dark stages are unlit; these ramp in with the fabric */
    const hemi = new HemisphereLight('#ffffff', '#9a958c', 0);
    const dir = new DirectionalLight('#ffffff', 0);
    dir.position.set(2.4, 3.6, 3.2);
    const dir2 = new DirectionalLight('#fff6e6', 0);
    dir2.position.set(-2.8, 1.4, -2.2);
    const dir3 = new DirectionalLight('#ffffff', 0);
    dir3.position.set(-1.6, 0.9, 2.6);

    return { group, planeMesh, planeMat, planeNu, planeNv, panels, outlines, isoDefs, seamSets, hemRow2, outlineMat, gridMat, stitchMat, res, hemi, dir, dir2, dir3 };
  }, [N]);

  /* mount/unmount */
  const rootRef = useRef<Group>(null);
  useEffect(() => {
    const w = world;
    return () => {
      w.group.traverse((o) => {
        const m = o as Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      for (const p of w.panels) { p.dark.dispose(); p.fab.dispose(); }
      w.planeMat.dispose(); w.outlineMat.dispose(); w.gridMat.dispose(); w.stitchMat.dispose();
    };
  }, [world]);

  /* scratch */
  const scratch = useMemo(
    () => ({
      v: new Vector3(), tgt: new Vector3(), pos: new Vector3(),
      poly: Array.from({ length: 40 }, () => new Vector3()),
      para: { x: 0, y: 0 },
      col: new Color(), colA: new Color(STITCH_DARK), colB: new Color(STITCH_LIGHT),
      ndc: new Vector3(),
    }),
    [],
  );

  useFrame(() => {
    const p = frozen ?? pRef.current;
    const w = world;
    const s = scratch;

    w.res.set(size.width, size.height);

    /* ---- fabric plane ---- */
    const planeOp = 0.9 * (1 - smooth(win(p, 0.26, 0.33)));
    w.planeMat.opacity = planeOp;
    w.planeMesh.visible = planeOp > 0.01;
    if (w.planeMesh.visible) {
      const attr = w.planeMesh.geometry.getAttribute('position') as BufferAttribute;
      const a = attr.array as Float32Array;
      let k = 0;
      for (let vy = 0; vy < w.planeNv; vy++) {
        for (let ux = 0; ux < w.planeNu; ux++) {
          planePoint(ux / (w.planeNu - 1), vy / (w.planeNv - 1), p, s.v);
          a[k++] = s.v.x; a[k++] = s.v.y; a[k++] = s.v.z;
        }
      }
      attr.needsUpdate = true;
    }

    /* ---- panels ---- */
    const darkOp = 0.9 * smooth(win(p, 0.24, 0.3)) * (1 - smooth(win(p, 0.68, 0.78)));
    const fabOp = smooth(win(p, 0.68, 0.82));
    const lightUp = smooth(win(p, 0.66, 0.8));
    w.hemi.intensity = 0.9 * lightUp;
    w.dir.intensity = 1.55 * lightUp;
    w.dir2.intensity = 0.45 * lightUp;
    w.dir3.intensity = 0.4 * lightUp;

    for (const panel of w.panels) {
      const attr = panel.geo.getAttribute('position') as BufferAttribute;
      const a = attr.array as Float32Array;
      let k = 0;
      for (let vy = 0; vy < panel.nv; vy++) {
        for (let ux = 0; ux < panel.nu; ux++) {
          worldPoint(panel.id, ux / (panel.nu - 1), vy / (panel.nv - 1), p, s.v);
          a[k++] = s.v.x; a[k++] = s.v.y; a[k++] = s.v.z;
        }
      }
      attr.needsUpdate = true;
      panel.dark.opacity = darkOp;
      panel.fab.opacity = fabOp;
      /* transparent materials at opacity 0 still enter the render list and
         the depth games that come with it; gate visibility outright */
      panel.meshDark.visible = darkOp > 0.01;
      panel.meshFab.visible = fabOp > 0.005;
      if (panel.meshFab.visible) {
        panel.geo.computeVertexNormals();
      }
    }

    /* ---- cut outlines / persistent edges ---- */
    const outlineFade = 0.95 - 0.75 * smooth(win(p, 0.68, 0.8));
    w.outlineMat.opacity = outlineFade;
    for (let oi = 0; oi < w.outlines.length; oi++) {
      const o = w.outlines[oi];
      const drawWin: [number, number] = [0.125 + oi * 0.018, 0.2 + oi * 0.02];
      const reveal = frozen != null ? 1 : smooth(win(p, drawWin[0], drawWin[1]));
      const total = o.params.length - 1;
      const visible = Math.round(total * reveal);
      for (let i = 0; i < visible; i++) {
        const [u0, v0] = o.params[i];
        const [u1, v1] = o.params[i + 1];
        worldPoint(o.id, u0, v0, p, s.v);
        worldPoint(o.id, u1, v1, p, s.tgt);
        pushSeg(o.set.arr, i, s.v, s.tgt);
      }
      flushLines(o.set, visible);
    }

    /* ---- drafting iso-lines ---- */
    const gridOp = 0.42 * smooth(win(p, 0.3, 0.365)) * (1 - smooth(win(p, 0.68, 0.76)));
    w.gridMat.opacity = gridOp;
    for (const iso of w.isoDefs) {
      if (gridOp < 0.01) { flushLines(iso.set, 0); continue; }
      let seg = 0;
      for (const u of iso.uLines) {
        for (let i = 0; i < iso.n; i++) {
          worldPoint(iso.id, u, i / iso.n, p, s.v);
          worldPoint(iso.id, u, (i + 1) / iso.n, p, s.tgt);
          pushSeg(iso.set.arr, seg++, s.v, s.tgt);
        }
      }
      for (const v of iso.uLines) {
        for (let i = 0; i < iso.n; i++) {
          worldPoint(iso.id, i / iso.n, v, p, s.v);
          worldPoint(iso.id, (i + 1) / iso.n, v, p, s.tgt);
          pushSeg(iso.set.arr, seg++, s.v, s.tgt);
        }
      }
      flushLines(iso.set, seg);
    }

    /* ---- stitches ---- */
    s.col.lerpColors(s.colA, s.colB, smooth(win(p, 0.68, 0.85)));
    w.stitchMat.color.copy(s.col);
    const DASH = 0.052, GAPL = 0.034;

    const emitSeam = (
      set: { obj: LineSegments2; arr: Float32Array },
      id: SeamId,
      override?: typeof HEM_ROW_2,
    ) => {
      const [w0, w1] = SEAM_WIN[id];
      const reveal = frozen != null ? 1 : smooth(win(p, w0, w1));
      if (reveal <= 0) { flushLines(set, 0); return; }
      const nPts = seamPolyline(id, p, s.poly, override);
      /* cumulative arc length */
      let total = 0;
      for (let i = 1; i < nPts; i++) total += s.poly[i].distanceTo(s.poly[i - 1]);
      const visLen = total * reveal;
      let seg = 0, walked = 0, cursor = 1, segStart = 0;
      const pointAt = (d: number, out: Vector3) => {
        while (cursor < nPts) {
          const stepLen = s.poly[cursor].distanceTo(s.poly[cursor - 1]);
          if (segStart + stepLen >= d || cursor === nPts - 1) {
            const t = stepLen > 0 ? (d - segStart) / stepLen : 0;
            return out.copy(s.poly[cursor - 1]).lerp(s.poly[cursor], Math.min(Math.max(t, 0), 1));
          }
          segStart += stepLen;
          cursor++;
        }
        return out.copy(s.poly[nPts - 1]);
      };
      for (let d = 0; d < visLen && seg < 70; d += DASH + GAPL) {
        cursor = 1; segStart = 0;
        pointAt(d, s.v);
        cursor = 1; segStart = 0;
        pointAt(Math.min(d + DASH, visLen), s.tgt);
        pushSeg(set.arr, seg++, s.v, s.tgt);
        walked = d;
      }
      void walked;
      flushLines(set, seg);
    };

    for (const seam of w.seamSets) emitSeam(seam.set, seam.id);
    emitSeam(w.hemRow2, 'hemBody', HEM_ROW_2);

    /* ---- final rotation ---- */
    const yaw = garmentYaw(p);
    w.group.rotation.y = yaw;

    /* ---- camera ---- */
    cameraAt(p, s.pos, s.tgt);
    /* damped pointer parallax, a few degrees at most */
    s.para.x += (pointer.current.mx - s.para.x) * 0.08;
    s.para.y += (pointer.current.my - s.para.y) * 0.08;
    camera.position.set(
      s.pos.x + s.para.x * 0.22,
      s.pos.y + s.para.y * 0.14,
      s.pos.z,
    );
    camera.lookAt(s.tgt);
    if (
      Math.abs(s.para.x - pointer.current.mx) > 0.002 ||
      Math.abs(s.para.y - pointer.current.my) > 0.002
    ) {
      invalidate();
    }

    /* ---- callouts (DOM, imperative) ---- */
    const callOp = smooth(win(p, 0.865, 0.92));
    for (let i = 0; i < CALLOUTS.length; i++) {
      const el = calloutEls.current[i]?.el;
      if (!el) continue;
      if (callOp <= 0.01) { el.style.opacity = '0'; continue; }
      const c = CALLOUTS[i];
      worldPoint(c.panel, c.u, c.v, p, s.ndc);
      s.ndc.applyAxisAngle(UP, yaw);
      s.ndc.project(camera);
      const sx = (s.ndc.x * 0.5 + 0.5) * 100;
      const sy = (-s.ndc.y * 0.5 + 0.5) * 100;
      el.style.opacity = String(callOp);
      el.style.left = `${sx}%`;
      el.style.top = `${sy}%`;
    }

    /* ---- debug readout ---- */
    if (debugEl?.current) {
      const stage = STAGE_NAMES.find(([end]) => p < end)?.[1] ?? 'FINISHED GARMENT';
      debugEl.current.textContent = `P ${p.toFixed(3)} · ${stage}`;
    }
  });

  return (
    <group ref={rootRef}>
      <primitive object={world.group} />
      <primitive object={world.hemi} />
      <primitive object={world.dir} />
      <primitive object={world.dir2} />
      <primitive object={world.dir3} />
    </group>
  );
}

const UP = new Vector3(0, 1, 0);

/* ------------------------------------------------------------- canvas */

export default function GarmentStage(props: StageProps) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      camera={{ fov: 38, near: 0.1, far: 40, position: [0, 3.7, 3.1] }}
      frameloop="demand"
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <Scene {...props} />
    </Canvas>
  );
}
