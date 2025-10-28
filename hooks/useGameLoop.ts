import { useEffect, useRef, useCallback } from 'react';

export const useGameLoop = (callback: (deltaTime: number) => void, isPaused: boolean = false) => {
  // FIX: Provide an initial value of `undefined` to `useRef` as it was missing.
  const requestRef = useRef<number | undefined>(undefined);
  // FIX: Provide an initial value of `undefined` to `useRef` as it was missing.
  const previousTimeRef = useRef<number | undefined>(undefined);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      if (!isPaused) {
        callback(deltaTime);
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback, isPaused]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};
