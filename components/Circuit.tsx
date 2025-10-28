import React from 'react';
import type { CircuitData } from '../types';

// FIX: Define the CircuitProps interface.
interface CircuitProps {
    circuit: CircuitData;
}

export const Circuit: React.FC<CircuitProps> = ({ circuit }) => {
    return (
        <g>
            {/* Base color */}
            <rect x="0" y="0" width={circuit.width} height={circuit.height} fill="#166534" />
            {/* Grass Texture */}
            <rect x="0" y="0" width={circuit.width} height={circuit.height} fill="url(#grass-pattern)" opacity="0.3" />
            <defs>
                <pattern id="grass-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                    <path d="M 50,0 C 20,20 20,80 50,100 Z M 100,50 C 80,20 20,20 0,50 Z" fill="#a3e635" opacity="0.1" />
                </pattern>
                <pattern id="chequered" patternUnits="userSpaceOnUse" width="20" height="20">
                    <rect width="10" height="10" x="0" y="0" fill="white" />
                    <rect width="10" height="10" x="10" y="0" fill="#374151" />
                    <rect width="10" height="10" x="0" y="10" fill="#374151" />
                    <rect width="10" height="10" x="10" y="10" fill="white" />
                </pattern>
            </defs>

            {/* Decorations (sand, run-off areas) go under the track */}
            {circuit.decorations}
            
            {/* --- Track Rendering using Layered Strokes --- */}
            
            {/* 1. Soft shadow layer (widest) */}
            <path d={circuit.trackPath} fill="none" stroke="black" strokeWidth="118" strokeLinejoin="round" opacity="0.15" />

            {/* 2. Red and White track barriers */}
            <path d={circuit.trackPath} fill="none" stroke="white" strokeWidth="114" strokeLinejoin="round" />
            <path d={circuit.trackPath} fill="none" stroke="#dc2626" strokeWidth="114" strokeDasharray="25 25" strokeLinejoin="round" />

            {/* 3. Asphalt Border */}
            <path d={circuit.trackPath} fill="none" stroke="#374151" strokeWidth="102" strokeLinejoin="round" />

            {/* 4. Track Asphalt (narrowest, on top) */}
            <path d={circuit.trackPath} fill="none" stroke="#4b5563" strokeWidth="100" strokeLinejoin="round" />

            {/* Finish Line */}
            <path d={`M ${circuit.finishLine.p1.x} ${circuit.finishLine.p1.y} L ${circuit.finishLine.p2.x} ${circuit.finishLine.p2.y}`} stroke="url(#chequered)" strokeWidth="50" />

             {/* Pit Lane */}
            <path d={circuit.pitLanePath} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,10" />
            <path d={circuit.pitLanePath} transform="translate(0, 4)" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,10" />
            <path d={circuit.pitLanePath} transform="translate(0, -4)" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,10" />
        </g>
    );
};