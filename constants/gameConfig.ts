// Car Physics
export const CAR_WIDTH = 15;
export const CAR_HEIGHT = 28;
export const ACCELERATION = 0.15;
export const BRAKING = 0.4;
export const MAX_SPEED = 11;
export const MAX_REVERSE_SPEED = -2;
export const FRICTION = 0.015; // Lowered to increase top speed
export const TURN_SPEED = 2.5; // degrees per frame
export const OFF_TRACK_SPEED_DECAY = 0.40; // Car retains 80% of speed per second off-track
export const WALL_BOUNCE = -0.5;

// AI Config
export const AI_COUNT = 5;
export const AI_LOOKAHEAD_DISTANCE = 80;
export const AI_TURN_SENSITIVITY = 4;
export const AI_ACCELERATION_FACTOR = 0.95; 
export const AI_MAX_SPEED_FACTOR = 0.98;

// Race Config
export const TOTAL_LAPS = 3;
export const RACE_START_COUNTDOWN = 3; // seconds