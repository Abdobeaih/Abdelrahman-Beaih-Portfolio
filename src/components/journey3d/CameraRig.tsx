import { memo, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3, type CatmullRomCurve3 } from 'three';
import { gsap } from '../../lib/gsap';

const OFFSET = new Vector3(0.9, 0.5, 2.6);
const LOOK_AHEAD = 0.02;
const ROLL_DEG = 2;
const SWAY_PERIOD = 12;
const SWAY_AMOUNT = 0.15;
const PARALLAX_MAX = 0.2;

interface CameraRigProps {
  curve: CatmullRomCurve3;
  /** Target arc-length progress (0..1) for the active station. */
  progress: number;
  rtl: boolean;
  paused: boolean;
  /** Pointer parallax only on desktop / non-touch. */
  parallax: boolean;
}

function CameraRigBase({ curve, progress, rtl, paused, parallax }: CameraRigProps) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);

  const t = useRef({ value: progress });
  const roll = useRef({ value: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef(0);
  const tmp = useRef(new Vector3());
  const look = useRef(new Vector3());

  // Tween the ride along the curve when the active station changes.
  useEffect(() => {
    if (paused) {
      t.current.value = progress;
      return;
    }
    const direction = Math.sign(progress - t.current.value) || 1;
    const move = gsap.to(t.current, {
      value: progress,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: invalidate,
    });
    const tilt = gsap.fromTo(
      roll.current,
      { value: 0 },
      {
        value: (direction * ROLL_DEG * Math.PI) / 180,
        duration: 0.7,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      },
    );
    return () => {
      move.kill();
      tilt.kill();
    };
  }, [progress, paused, invalidate]);

  useEffect(() => {
    if (!parallax) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [parallax]);

  // Pointer drag only nudges sway; touch scrolling is never trapped.
  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = 'pan-y';
    let dragging = false;
    let lastX = 0;
    const onDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      drag.current = MathUtils.clamp(drag.current + (event.clientX - lastX) * 0.002, -0.4, 0.4);
      lastX = event.clientX;
    };
    const onUp = () => {
      dragging = false;
    };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [gl]);

  useFrame((state) => {
    const p = MathUtils.clamp(t.current.value, 0, 1);
    curve.getPointAt(p, tmp.current);
    curve.getPointAt(MathUtils.clamp(p + LOOK_AHEAD, 0, 1), look.current);

    const elapsed = state.clock.elapsedTime;
    const swayX = Math.sin((elapsed / SWAY_PERIOD) * Math.PI * 2) * SWAY_AMOUNT;
    const swayY = Math.cos((elapsed / SWAY_PERIOD) * Math.PI * 2) * (SWAY_AMOUNT * 0.66);

    drag.current *= 0.97; // ease the drag nudge back to neutral
    const offsetX = OFFSET.x * (rtl ? -1 : 1);

    camera.position.set(
      tmp.current.x + offsetX + swayX + drag.current + pointer.current.x * PARALLAX_MAX,
      tmp.current.y + OFFSET.y + swayY + -pointer.current.y * PARALLAX_MAX,
      tmp.current.z + OFFSET.z,
    );

    const rollValue = roll.current.value;
    camera.up.set(Math.sin(rollValue), Math.cos(rollValue), 0);
    camera.lookAt(look.current);
  });

  return null;
}

export const CameraRig = memo(CameraRigBase);
