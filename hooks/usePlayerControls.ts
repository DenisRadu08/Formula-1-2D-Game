
import { useState, useEffect, useCallback } from 'react';
import type { KeyState } from '../types';

const INITIAL_KEY_STATE: KeyState = {
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
    w: false, s: false, a: false, d: false,
};

export const usePlayerControls = (): KeyState => {
    const [keys, setKeys] = useState<KeyState>(INITIAL_KEY_STATE);

    const handleKeyEvent = useCallback((e: KeyboardEvent, isPressed: boolean) => {
        if (e.key in INITIAL_KEY_STATE) {
            e.preventDefault();
            setKeys(prevKeys => ({ ...prevKeys, [e.key]: isPressed }));
        }
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => handleKeyEvent(e, true), [handleKeyEvent]);
    const handleKeyUp = useCallback((e: KeyboardEvent) => handleKeyEvent(e, false), [handleKeyEvent]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    return keys;
};
