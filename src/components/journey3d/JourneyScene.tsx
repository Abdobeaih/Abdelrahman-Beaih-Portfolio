import { memo, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { stations } from '../../data/stations';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useThemeColors } from '../../hooks/useThemeColors';
import { buildJourneyCurve, STATION_COUNT, stationProgress } from './curve';
import { PathTube } from './PathTube';
import { Station } from './Station';
import { CameraRig } from './CameraRig';
import { Dust } from './Dust';
import { StationCard } from './StationCard';

/**
 * Keeps the demand-frameloop canvas alive while the section is on screen, so
 * the pulse, particles, camera tween and tweens render. Stops rendering (0
 * frames) the moment the section scrolls away.
 */
function RenderLoop({ paused }: { paused: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (paused) return;
    let raf = 0;
    const tick = () => {
      invalidate();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, invalidate]);
  return null;
}

export interface JourneySceneProps {
  active: number;
  onSelect: (index: number) => void;
  paused: boolean;
  rtl: boolean;
  showFloatingCard: boolean;
}

function JourneySceneBase({ active, onSelect, paused, rtl, showFloatingCard }: JourneySceneProps) {
  const { bg, accent } = useThemeColors();
  const parallax = useMediaQuery('(hover: hover) and (min-width: 1024px)');

  const curve = useMemo(() => buildJourneyCurve(rtl), [rtl]);

  const positions = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: STATION_COUNT }, (_, i) => {
        const p = curve.getPointAt(stationProgress(i));
        return [p.x, p.y, p.z];
      }),
    [curve],
  );

  const progress = stationProgress(active);
  const activePos = positions[active] ?? positions[0];

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 0, 6] }}
      style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <fog attach="fog" args={[bg, 7, 22]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      <pointLight position={activePos} color={accent} intensity={16} distance={6} decay={2} />

      <RenderLoop paused={paused} />
      <CameraRig curve={curve} progress={progress} rtl={rtl} paused={paused} parallax={parallax && !paused} />
      <PathTube curve={curve} progress={progress} drawOnMount paused={paused} />

      {positions.map((pos, i) => (
        <Station
          key={stations[i]?.id ?? i}
          index={i}
          position={pos}
          state={i === active ? 'active' : i < active ? 'visited' : 'inactive'}
          onSelect={onSelect}
        />
      ))}

      <Dust />

      {showFloatingCard && <StationCard station={stations[active]} position={activePos} />}
    </Canvas>
  );
}

export const JourneyScene = memo(JourneySceneBase);
export default JourneyScene;
