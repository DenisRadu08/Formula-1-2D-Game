
import React, { useState } from 'react';
import { CIRCUITS } from '../constants/circuits';
import type { GameMode, CircuitData } from '../types';
import { RaceFlagIcon, TrophyIcon } from './icons';

interface GameMenuProps {
    onStartGame: (mode: GameMode, circuit: CircuitData) => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
    const [selectedMode, setSelectedMode] = useState<GameMode>('RACE');
    const [selectedCircuitIndex, setSelectedCircuitIndex] = useState(0);

    const handleStart = () => {
        onStartGame(selectedMode, CIRCUITS[selectedCircuitIndex]);
    };

    const circuit = CIRCUITS[selectedCircuitIndex];

    return (
        <div className="w-full max-w-4xl bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 border-2 border-red-500/50">
            <div className="flex-1 flex flex-col">
                <h1 className="text-5xl font-orbitron font-bold text-red-500 mb-2">Formula React</h1>
                <p className="text-gray-300 mb-6">The ultimate 2D racing experience.</p>
                
                {/* Game Mode Selection */}
                <div className="mb-6">
                    <h2 className="text-2xl font-orbitron mb-3">Game Mode</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setSelectedMode('RACE')}
                            className={`flex items-center justify-center gap-3 p-4 rounded-lg text-lg font-bold transition-all duration-300 ${selectedMode === 'RACE' ? 'bg-red-600 text-white ring-2 ring-offset-2 ring-offset-gray-800 ring-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            <RaceFlagIcon className="w-6 h-6" /> Race
                        </button>
                        <button
                            onClick={() => setSelectedMode('TIME_TRIAL')}
                            className={`flex items-center justify-center gap-3 p-4 rounded-lg text-lg font-bold transition-all duration-300 ${selectedMode === 'TIME_TRIAL' ? 'bg-red-600 text-white ring-2 ring-offset-2 ring-offset-gray-800 ring-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            <TrophyIcon className="w-6 h-6" /> Time Trial
                        </button>
                    </div>
                </div>

                {/* Start Button */}
                <button 
                    onClick={handleStart}
                    className="w-full mt-auto bg-green-600 hover:bg-green-500 text-white font-orbitron text-2xl font-bold py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                >
                    START
                </button>
            </div>

            {/* Circuit Selection */}
            <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-2xl font-orbitron mb-3">Select Circuit</h2>
                <div className="bg-gray-900 rounded-lg p-4 flex-grow flex items-center justify-center">
                    <svg viewBox={circuit.viewBox} className="w-full h-auto">
                        <path d={circuit.trackPath} fill="#4b5563" stroke="white" strokeWidth="10" />
                    </svg>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button 
                        onClick={() => setSelectedCircuitIndex((prev) => (prev - 1 + CIRCUITS.length) % CIRCUITS.length)}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">&lt;</button>
                    <span className="text-xl font-bold font-orbitron">{circuit.name}</span>
                    <button 
                         onClick={() => setSelectedCircuitIndex((prev) => (prev + 1) % CIRCUITS.length)}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">&gt;</button>
                </div>
            </div>
        </div>
    );
};
