
import React, { useState, useCallback } from 'react';
import { GameScreen } from './components/GameScreen';
import { GameMenu } from './components/GameMenu';
import { CIRCUITS } from './constants/circuits';
import type { GameMode, CircuitData } from './types';

export default function App(): React.ReactElement {
    const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
    const [gameMode, setGameMode] = useState<GameMode>('RACE');
    const [selectedCircuit, setSelectedCircuit] = useState<CircuitData>(CIRCUITS[0]);

    const handleStartGame = useCallback((mode: GameMode, circuit: CircuitData) => {
        setGameMode(mode);
        setSelectedCircuit(circuit);
        setGameState('playing');
    }, []);

    const handleBackToMenu = useCallback(() => {
        setGameState('menu');
    }, []);

    return (
        <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
            {gameState === 'menu' ? (
                <GameMenu onStartGame={handleStartGame} />
            ) : (
                <GameScreen 
                    gameMode={gameMode} 
                    circuit={selectedCircuit} 
                    onBackToMenu={handleBackToMenu} 
                />
            )}
        </div>
    );
}
