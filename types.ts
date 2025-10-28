
export type GameMode = 'RACE' | 'TIME_TRIAL';

export interface Vector2D {
  x: number;
  y: number;
}

export interface CarState {
  id: number;
  name: string;
  color: string;
  position: Vector2D;
  velocity: Vector2D;
  angle: number; // in degrees
  speed: number;
  isPlayer: boolean;
  lap: number;
  lastWaypointIndex: number;
  lapTimes: number[];
  totalTime: number;
  isFinished: boolean;
  steering: number;
}

export interface CircuitData {
  id: string;
  name: string;
  trackPath: string; 
  wallPath: string; 
  pitLanePath: string;
  decorations: React.ReactNode;
  viewBox: string;
  width: number;
  height: number;
  startPosition: Vector2D;
  startAngle: number;
  waypoints: Vector2D[];
  finishLine: { p1: Vector2D; p2: Vector2D };
}

export interface KeyState {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  w: boolean;
  s: boolean;
  a: boolean;
  d: boolean;
}
