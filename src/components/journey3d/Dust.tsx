import { memo, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry, type Group } from 'three';
import { useThemeColors } from '../../hooks/useThemeColors';

const COUNT = 220;

function DustBase() {
  const groupRef = useRef<Group>(null);
  const { textMuted } = useThemeColors();

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    // Transform-only drift (DESIGN.md motion rules).
    group.rotation.y += delta * 0.02;
    group.rotation.x += delta * 0.006;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <pointsMaterial
          color={textMuted}
          size={0.012}
          sizeAttenuation
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export const Dust = memo(DustBase);
