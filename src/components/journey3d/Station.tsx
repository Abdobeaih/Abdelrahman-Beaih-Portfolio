import { memo, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Color, type Mesh, type MeshBasicMaterial } from 'three';
import { useThemeColors } from '../../hooks/useThemeColors';

export type StationState = 'inactive' | 'visited' | 'active';

interface StationProps {
  index: number;
  position: [number, number, number];
  state: StationState;
  onSelect: (index: number) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

function StationBase({ index, position, state, onSelect }: StationProps) {
  const { accent, borderStrong, bg } = useThemeColors();
  const [hovered, setHovered] = useState(false);
  const pulseRef = useRef<Mesh>(null);

  const isActive = state === 'active';
  const isOn = state !== 'inactive'; // visited or active

  const bodyColor = useMemo<Color>(
    () => (isOn ? accent.clone() : new Color(bg).lerp(borderStrong, 0.35)),
    [isOn, accent, bg, borderStrong],
  );

  useFrame((threeState) => {
    const mesh = pulseRef.current;
    if (!mesh) return;
    const phase = (threeState.clock.elapsedTime % 1.8) / 1.8;
    mesh.scale.setScalar(1 + phase * 0.8);
    (mesh.material as MeshBasicMaterial).opacity = 0.6 * (1 - phase);
  });

  return (
    <group position={position}>
      {/* Body */}
      <mesh
        scale={hovered ? 1.18 : 1}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = '';
        }}
      >
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial
          color={bodyColor}
          emissive={isOn ? accent : bodyColor}
          emissiveIntensity={isActive ? 0.9 : isOn ? 0.4 : 0.06}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.012, 12, 48]} />
        <meshStandardMaterial
          color={isOn ? accent : borderStrong}
          emissive={accent}
          emissiveIntensity={isOn ? 0.5 : 0}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Active pulse ring — transform/opacity only, 1.8s loop. */}
      {isActive && (
        <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.02, 8, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={0.6} depthWrite={false} />
        </mesh>
      )}

      {/* Number label, always facing the camera (drei Html, no transform). */}
      <Html
        position={[0, 0.34, 0]}
        center
        zIndexRange={[8, 0]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <span
          className="mono-isolate"
          style={{
            display: 'block',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: isOn ? 'var(--accent)' : 'var(--text-faint)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            padding: '1px 6px',
            whiteSpace: 'nowrap',
          }}
        >
          {pad(index + 1)}
        </span>
      </Html>
    </group>
  );
}

export const Station = memo(StationBase);
