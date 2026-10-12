import { CatmullRomCurve3, Vector3 } from 'three';

/**
 * Fixed control points for the winding journey path in 3D space.
 * A gentle S-curve with vertical (+/- ~1.2) and depth variation. Station 1 is
 * at the left/low end; station 8 at the right/high end. Never derived from
 * runtime data — geometry only.
 */
const CONTROL_POINTS: ReadonlyArray<[number, number, number]> = [
  [-4.4, -0.1, 0.0],
  [-3.1, 1.1, 0.6],
  [-1.9, -0.9, -0.6],
  [-0.7, 1.2, 0.7],
  [0.6, -1.1, -0.7],
  [1.8, 1.0, 0.6],
  [3.0, -0.7, -0.5],
  [4.4, 0.4, 0.2],
];

/** Number of stations along the curve (mirrors src/data/stations.ts). */
export const STATION_COUNT = CONTROL_POINTS.length;

/**
 * Build the curve. When `rtl` is true the whole path is mirrored on the X axis
 * so station 1 sits on the right (DESIGN.md section 5B, RTL rules).
 */
export function buildJourneyCurve(rtl: boolean): CatmullRomCurve3 {
  const points = CONTROL_POINTS.map(
    ([x, y, z]) => new Vector3(rtl ? -x : x, y, z),
  );
  return new CatmullRomCurve3(points, false, 'catmullrom', 0.5);
}

/** Arc-length progress (0..1) for a given station index. */
export function stationProgress(index: number): number {
  return index / (STATION_COUNT - 1);
}
