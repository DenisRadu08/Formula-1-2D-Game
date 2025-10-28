import React from 'react';
import type { CarState } from '../types';

interface CarProps {
    car: CarState;
}

export const Car: React.FC<CarProps> = ({ car }) => {
    const { position, angle, color, isPlayer, name } = car;
    const carTransform = `translate(${position.x} ${position.y}) rotate(${angle})`;

    return (
        <g transform={carTransform}>
            <g transform="rotate(90)">
                {/* Shadow */}
                <path 
                    d="M -8 15 L 8 15 L 10 12 L 10 -13 L 8 -16 L -8 -16 L -10 -13 L -10 12 Z"
                    fill="black" 
                    opacity="0.2"
                    transform="translate(2, 2)"
                />

                {/* Tires */}
                <rect x={-13} y={-14} width="5" height="10" fill="#1f2937" rx="2" /> {/* Front Left */}
                <rect x={8} y={-14} width="5" height="10" fill="#1f2937" rx="2" /> {/* Front Right */}
                <rect x={-14} y={6} width="6" height="12" fill="#1f2937" rx="2" /> {/* Rear Left */}
                <rect x={8} y={6} width="6" height="12" fill="#1f2937" rx="2" /> {/* Rear Right */}

                {/* Rear Wing */}
                <path d="M -12 14 L 12 14 L 11 11 L -11 11 Z" fill="#111827" />
                <rect x={-1.5} y={12} width="3" height="4" fill="#111827" />
                
                {/* Main Body */}
                <path 
                    d="M 0 -10 
                       L -7 -8
                       L -7 5
                       C -7 10, -4 12, 0 13 
                       C 4 12, 7 10, 7 5
                       L 7 -8
                       Z" 
                    fill={color} 
                />
                
                 {/* Shark Fin */}
                <path d="M 0 0 L 0 13 L -2 12 L -2 0 Z" fill={color} stroke={isPlayer ? 'white' : 'black'} strokeWidth="0.2" />

                {/* Sidepods */}
                <path 
                    d="M -7 -4 
                       L -9 -3
                       L -9 6
                       L -7 5
                       Z" 
                    fill={color} 
                    stroke={isPlayer ? 'white' : 'black'} 
                    strokeWidth="0.5"
                />
                <path 
                    d="M 7 -4 
                       L 9 -3
                       L 9 6
                       L 7 5
                       Z" 
                    fill={color} 
                    stroke={isPlayer ? 'white' : 'black'} 
                    strokeWidth="0.5"
                />

                {/* Front Body / Nose */}
                <path 
                    d="M 0 -18 
                       L -2 -10
                       L 2 -10
                       Z" 
                    fill={color} 
                    stroke={isPlayer ? 'white' : 'black'} 
                    strokeWidth="0.5"
                />
                
                {/* Front Wing */}
                <path d="M -12 -17 L 12 -17 L 10 -14 L -10 -14 Z" fill="#111827" />

                 {/* Driver */}
                <circle cx="0" cy="-1" r="3" fill={isPlayer ? '#facc15' : '#d1d5db'} stroke="black" strokeWidth="0.5" />
                 {/* Halo */}
                <path d="M 0 -5 A 3.5 3.5 0 0 1 0 2 M 0 -5 L 0 -1" stroke="black" strokeWidth="1" fill="none" />


                {!isPlayer && (
                     <text
                        x="0"
                        y={-22}
                        textAnchor="middle"
                        className="fill-white font-bold text-[10px]"
                        style={{ paintOrder: 'stroke', stroke: 'black', strokeWidth: '2px' }}
                    >
                        {name}
                    </text>
                )}
            </g>
        </g>
    );
};