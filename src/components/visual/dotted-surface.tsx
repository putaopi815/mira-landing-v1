"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

/**
 * 与 21st efferd/dotted-surface 相同：网格、正弦波、透视相机、雾、点大小与透明度。
 * 不依赖 three（避免本地未 npm install 时构建失败），用 Canvas2D + 列主序 MVP 复现画面。
 * @see https://21st.dev/r/efferd/dotted-surface
 */
type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

function mat4Multiply(a: Float32Array, b: Float32Array, out = new Float32Array(16)) {
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      out[c * 4 + r] =
        a[0 * 4 + r] * b[c * 4 + 0] +
        a[1 * 4 + r] * b[c * 4 + 1] +
        a[2 * 4 + r] * b[c * 4 + 2] +
        a[3 * 4 + r] * b[c * 4 + 3];
    }
  }
  return out;
}

function mat4Perspective(fovyRad: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovyRad / 2);
  const nf = 1 / (near - far);
  const o = new Float32Array(16);
  o[0] = f / aspect;
  o[5] = f;
  o[10] = (far + near) * nf;
  o[11] = -1;
  o[14] = 2 * far * near * nf;
  return o;
}

function mat4LookAt(
  eye: [number, number, number],
  center: [number, number, number],
  up: [number, number, number],
) {
  const zx = eye[0] - center[0];
  const zy = eye[1] - center[1];
  const zz = eye[2] - center[2];
  let len = Math.hypot(zx, zy, zz);
  const z0 = zx / len;
  const z1 = zy / len;
  const z2 = zz / len;
  const ux = up[0];
  const uy = up[1];
  const uz = up[2];
  let x0 = uy * z2 - uz * z1;
  let x1 = uz * z0 - ux * z2;
  let x2 = ux * z1 - uy * z0;
  len = Math.hypot(x0, x1, x2);
  x0 /= len;
  x1 /= len;
  x2 /= len;
  const y0 = z1 * x2 - z2 * x1;
  const y1 = z2 * x0 - z0 * x2;
  const y2 = z0 * x1 - z1 * x0;
  const o = new Float32Array(16);
  o[0] = x0;
  o[1] = y0;
  o[2] = z0;
  o[3] = 0;
  o[4] = x1;
  o[5] = y1;
  o[6] = z1;
  o[7] = 0;
  o[8] = x2;
  o[9] = y2;
  o[10] = z2;
  o[11] = 0;
  o[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]);
  o[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
  o[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]);
  o[15] = 1;
  return o;
}

function transformPoint(m: Float32Array, x: number, y: number, z: number) {
  const w = 1;
  const cx = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  const cy = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  const cz = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  const cw = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return { cx, cy, cz, cw };
}

export function DottedSurface({ className, style, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;
    const FOV_DEG = 60;
    const NEAR = 1;
    const FAR = 10000;
    /* 略拉远、略压低视角，便于在「底部条」容器里看到整片点阵 */
    /* 略俯视前方，让「地面」更靠画布下方 */
    const EYE: [number, number, number] = [0, 280, 1750];
    const LOOK: [number, number, number] = [0, -580, 0];
    const FOG_NEAR = 2000;
    const FOG_FAR = 10000;
    const FOG_RGB = [255, 255, 255] as const;
    const DOT_RGB = [200, 200, 200] as const;
    const MATERIAL_OPACITY = 0.82;
    /** 原参考 amplitude=50，底部条里显夸张，改小 */
    const WAVE_AMP = 18;
    const WAVE_IX = 0.22;
    const WAVE_IY = 0.38;
    const COUNT_STEP = 0.055;
    /**
     * 近大远小：用 view 空间深度 viewZ，按 r ∝ 1 / viewZ^P（P>1 时远处更小得更快），再夹到 [MIN, MAX]。
     * 直径（CSS px）= 2 × radius。
     */
    const POINT_R_MIN = 0.28;
    /** 近处半径上限（CSS px） */
    const POINT_R_MAX = 8.1;
    /** 与 PERSP_POWER 一起决定整体尺度 */
    const POINT_R_COEFF = 5350;
    /** >1 增强透视：远处比纯 1/z 更小 */
    const PERSP_POWER = 1.2;
    const VIEW_Z_EPS = 72;
    /** 将投影整体下移，让波浪「地面」贴齐画布底边 */
    const SCREEN_ANCHOR_DOWN = 0.34;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const countRef = { v: 0 };
    let wCss = 1;
    let hCss = 1;
    let dpr = 1;

    const positions = new Float32Array(AMOUNTX * AMOUNTY * 3);

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i++] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[i++] = 0;
        positions[i++] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      }
    }

    const view = mat4LookAt(EYE, LOOK, [0, 1, 0]);
    const proj = new Float32Array(16);
    const mvp = new Float32Array(16);

    const resize = () => {
      wCss = Math.max(1, container.clientWidth);
      hCss = Math.max(1, container.clientHeight);
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.floor(wCss * dpr);
      canvas.height = Math.floor(hCss * dpr);
      const aspect = wCss / hCss;
      const p = mat4Perspective((FOV_DEG * Math.PI) / 180, aspect, NEAR, FAR);
      proj.set(p);
      mat4Multiply(proj, view, mvp);
    };

    const fogFactor = (dist: number) => {
      if (dist <= FOG_NEAR) return 0;
      if (dist >= FOG_FAR) return 1;
      return (dist - FOG_NEAR) / (FOG_FAR - FOG_NEAR);
    };

    const paint = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, wCss, hCss);

      const count = countRef.v;
      let pi = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const base = pi * 3;
          const wx = positions[base];
          const wy =
            Math.sin((ix + count) * WAVE_IX) * WAVE_AMP +
            Math.sin((iy + count) * WAVE_IY) * WAVE_AMP;
          const wz = positions[base + 2];

          const { cx, cy, cw } = transformPoint(mvp, wx, wy, wz);
          if (cw <= 0) {
            pi++;
            continue;
          }

          const ndcX = cx / cw;
          const ndcY = cy / cw;
          const sx = (ndcX * 0.5 + 0.5) * wCss;
          const sy =
            (1 - (ndcY * 0.5 + 0.5)) * hCss + hCss * SCREEN_ANCHOR_DOWN;

          const dx = wx - EYE[0];
          const dy = wy - EYE[1];
          const dz = wz - EYE[2];
          const dist = Math.hypot(dx, dy, dz);
          const fog = fogFactor(dist);

          const viewZ = Math.abs(
            view[8] * wx + view[9] * wy + view[10] * wz + view[14],
          );
          const zSafe = Math.max(viewZ, VIEW_Z_EPS);
          const radiusRaw =
            POINT_R_COEFF / Math.pow(zSafe, PERSP_POWER);
          const radius = Math.max(
            POINT_R_MIN,
            Math.min(POINT_R_MAX, radiusRaw),
          );

          if (sx < -radius || sx > wCss + radius || sy < -radius || sy > hCss + radius) {
            pi++;
            continue;
          }

          const t = fog;
          const r = DOT_RGB[0] * (1 - t) + FOG_RGB[0] * t;
          const g = DOT_RGB[1] * (1 - t) + FOG_RGB[1] * t;
          const b = DOT_RGB[2] * (1 - t) + FOG_RGB[2] * t;
          const alpha = MATERIAL_OPACITY * (1 - t * 0.85);

          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
          ctx.fill();
          pi++;
        }
      }
    };

    resize();
    paint();

    const ro = new ResizeObserver(() => {
      resize();
      paint();
    });
    ro.observe(container);

    const loop = () => {
      frameRef.current = requestAnimationFrame(loop);
      countRef.v += COUNT_STEP;
      paint();
    };
    loop();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute z-0 overflow-hidden", className)}
      style={style}
      {...props}
    />
  );
}
