import { memo, useEffect, useMemo, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { TubeGeometry, type CatmullRomCurve3 } from 'three';
import { gsap } from '../../lib/gsap';
import { useThemeColors } from '../../hooks/useThemeColors';

const TUBULAR_SEGMENTS = 240;
const RADIAL_SEGMENTS = 8;
const RADIUS = 0.025;
const INDEX_PER_SEGMENT = RADIAL_SEGMENTS * 6;

interface PathTubeProps {
  curve: CatmullRomCurve3;
  /** Completed fraction of the path (0..1) = active station progress. */
  progress: number;
  /** When true, the first-view draw animation runs from 0 to `progress`. */
  drawOnMount: boolean;
  paused: boolean;
}

function PathTubeBase({ curve, progress, drawOnMount, paused }: PathTubeProps) {
  const { accent, borderStrong } = useThemeColors();
  const invalidate = useThree((state) => state.invalidate);

  const baseGeometry = useMemo(
    () => new TubeGeometry(curve, TUBULAR_SEGMENTS, RADIUS, RADIAL_SEGMENTS, false),
    [curve],
  );
  const accentGeometry = useMemo(
    () => new TubeGeometry(curve, TUBULAR_SEGMENTS, RADIUS * 1.02, RADIAL_SEGMENTS, false),
    [curve],
  );

  useEffect(
    () => () => {
      baseGeometry.dispose();
      accentGeometry.dispose();
    },
    [baseGeometry, accentGeometry],
  );

  const target = progress * TUBULAR_SEGMENTS * INDEX_PER_SEGMENT;
  const draw = useRef({ count: 0 });

  // Animate the accent (completed) portion of the tube.
  useEffect(() => {
    if (!accentGeometry) return;
    const apply = () => accentGeometry.setDrawRange(0, draw.current.count);
    if (paused) {
      draw.current.count = target;
      apply();
      invalidate();
      return;
    }
    const tween = gsap.to(draw.current, {
      count: target,
      duration: drawOnMount && draw.current.count === 0 ? 1.4 : 0.6,
      ease: drawOnMount && draw.current.count === 0 ? 'power2.inOut' : 'power3.inOut',
      onUpdate: () => {
        apply();
        invalidate();
      },
    });
    return () => {
      tween.kill();
    };
  }, [target, accentGeometry, drawOnMount, paused, invalidate]);

  return (
    <group>
      {/* Remaining path — full tube in border-strong. */}
      <mesh geometry={baseGeometry}>
        <meshStandardMaterial
          color={borderStrong}
          roughness={0.5}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Completed path — accent emissive, drawn up to the active station. */}
      <mesh geometry={accentGeometry} renderOrder={1}>
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.55}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export const PathTube = memo(PathTubeBase);
