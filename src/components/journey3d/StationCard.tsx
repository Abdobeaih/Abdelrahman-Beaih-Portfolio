import { memo } from 'react';
import { Html } from '@react-three/drei';
import type { Station } from '../../data/stations';
import { StationCardContent } from '../StationCardContent';

interface StationCardProps {
  station: Station;
  position: [number, number, number];
}

/** Floating DOM card anchored to the active 3D node (drei <Html>, no transform). */
function StationCardBase({ station, position }: StationCardProps) {
  return (
    <Html position={position} center zIndexRange={[40, 20]} style={{ pointerEvents: 'none' }}>
      <div style={{ width: 300, transform: 'translateY(calc(-100% - 22px))' }}>
        <div key={station.id} className="card-in">
          <StationCardContent station={station} />
        </div>
      </div>
    </Html>
  );
}

export const StationCard = memo(StationCardBase);
export default StationCard;
