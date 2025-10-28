
import React from 'react';
import type { CarState, GameMode } from '../types';

interface HUDProps {
    playerCar: CarState;
    cars: CarState[];
    gameTime: number;
    gameMode: GameMode;
    totalLaps: number;
}

export const HUD: React.FC<HUDProps> = ({ playerCar, cars, gameTime, gameMode, totalLaps }) => {
    const speed = Math.round(Math.abs(playerCar.speed) * 30); // MPH/KPH approximation
    const formattedTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
        const milliseconds = Math.floor((timeInSeconds * 1000) % 1000).toString().padStart(3, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    };

    const playerPosition = cars.findIndex(c => c.id === playerCar.id) + 1;

    return (
        <div className="absolute inset-0 pointer-events-none text-white p-4 lg:p-8 font-orbitron">
            <div className="grid grid-cols-3 gap-4">
                {/* Left Side */}
                <div className="flex flex-col items-start">
                    <div className="bg-black/50 p-3 rounded-lg">
                        <div className="text-lg text-gray-400">LAP</div>
                        <div className="text-4xl font-bold">{Math.min(playerCar.lap, totalLaps)}/{totalLaps}</div>
                    </div>
                </div>

                {/* Center */}
                <div className="flex flex-col items-center">
                    { gameMode === 'RACE' && (
                         <div className="bg-black/50 p-3 rounded-lg text-center">
                            <div className="text-lg text-gray-400">POSITION</div>
                            <div className="text-4xl font-bold">{playerPosition}/{cars.length}</div>
                        </div>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-end">
                     <div className="bg-black/50 p-3 rounded-lg text-right">
                        <div className="text-lg text-gray-400">TIME</div>
                        <div className="text-4xl font-bold">{formattedTime(gameTime)}</div>
                    </div>
                </div>
            </div>

             {/* Bottom Left - Speedometer */}
             <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded-full flex items-center justify-center w-48 h-48 border-4 border-red-500">
                <div className="text-center">
                    <div className="text-6xl font-black text-red-500">{speed}</div>
                    <div className="text-xl text-gray-300">KPH</div>
                </div>
             </div>

        </div>
    );
};