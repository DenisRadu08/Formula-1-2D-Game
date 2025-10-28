
import type { Vector2D } from "../types";

export const degToRad = (degrees: number): number => degrees * (Math.PI / 180);
export const radToDeg = (radians: number): number => radians * (180 / Math.PI);

export const vectorAdd = (v1: Vector2D, v2: Vector2D): Vector2D => ({ x: v1.x + v2.x, y: v1.y + v2.y });
export const vectorSub = (v1: Vector2D, v2: Vector2D): Vector2D => ({ x: v1.x - v2.x, y: v1.y - v2.y });
export const vectorScale = (v: Vector2D, scalar: number): Vector2D => ({ x: v.x * scalar, y: v.y * scalar });
export const vectorMagnitude = (v: Vector2D): number => Math.sqrt(v.x * v.x + v.y * v.y);

export const normalizeVector = (v: Vector2D): Vector2D => {
    const mag = vectorMagnitude(v);
    if (mag === 0) return { x: 0, y: 0 };
    return { x: v.x / mag, y: v.y / mag };
};

export const distance = (p1: Vector2D, p2: Vector2D): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

export const checkLineIntersection = (
    p1: Vector2D, p2: Vector2D, // Line segment 1
    p3: Vector2D, p4: Vector2D  // Line segment 2
): boolean => {
    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (d === 0) return false;
    const t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    const u = -((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)) / d;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
};
