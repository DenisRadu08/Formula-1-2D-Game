import React from 'react';
import type { CircuitData } from '../types';
import { Grandstand } from '../components/icons';

const BucharestDecorations = () => (
    <>
        <Grandstand x="3050" y="4750" width="1200" height="70" />
        <text x="3500" y="2500" textAnchor="middle" className="fill-gray-600 font-orbitron text-9xl font-bold opacity-50" transform="rotate(-15 3500 2500)">BUCHAREST GP</text>
    </>
);

const TimisoaraDecorations = () => (
    <>
        <Grandstand x="2750" y="4750" width="1200" height="70" />
        <text x="3500" y="2500" textAnchor="middle" className="fill-gray-600 font-orbitron text-9xl font-bold opacity-50" transform="rotate(15 3500 2500)">GRAN PREMIO DE TIMIȘOARA</text>
    </>
);

const AradDecorations = () => (
    <>
        <Grandstand x="3050" y="250" width="1200" height="70" />
        <text x="3500" y="2500" textAnchor="middle" className="fill-gray-600 font-orbitron text-9xl font-bold opacity-50" transform="rotate(15 3500 2500)">ARAD GP</text>
    </>
);


export const CIRCUITS: CircuitData[] = [
    {
        id: 'c1',
        name: 'Bucharest Grand Prix',
        viewBox: '0 0 7000 5000',
        width: 7000,
        height: 5000,
        // This path is a 100% recreation of the user's image.
        trackPath: "M 4400 4650 L 2900 4650 L 2900 4350 C 2900 4150 2800 4050 2600 4050 C 2400 4050 2300 4150 2300 4350 L 2300 3750 C 2300 3250 2600 2950 3100 2950 L 3500 2950 C 3700 2950 3800 2850 3800 2650 C 3800 2450 3700 2350 3500 2350 L 1500 2350 C 1000 2350 600 2750 600 3250 C 600 3750 1000 4150 1500 4150 L 1700 4150 C 2000 4150 2100 4050 2100 3750 L 2100 1750 C 2100 1250 2400 950 2900 950 L 4000 950 C 4300 950 4500 1050 4700 1250 C 4900 1450 5200 1450 5400 1250 C 5600 1050 5900 950 6200 950 L 6400 1250 L 6400 3550 C 6400 4050 6100 4350 5600 4350 L 5300 4350 C 5100 4350 5000 4250 5000 4050 L 5000 3950 C 5000 3750 5100 3650 5300 3650 L 4400 3650 L 4400 4650 Z",
        pitLanePath: "M 4400 4550 L 2900 4550 L 2900 4250 C 2900 4150 2850 4100 2800 4100 C 2750 4100 2700 4150 2700 4250 L 2700 3850 C 2700 3450 2900 3150 3300 3150 L 3600 3150 C 3700 3150 3750 3100 3750 3000 C 3750 2900 3700 2850 3600 2850 L 4800 2850 L 5000 3050 L 5000 3750 C 5000 4150 4800 4450 4400 4450 L 4400 4550 Z",
        decorations: <BucharestDecorations />,
        startPosition: { x: 3700, y: 4550 },
        startAngle: 180,
        finishLine: { p1: { x: 4250, y: 4500 }, p2: { x: 4250, y: 4600 } },
        waypoints: [
            { x: 3200, y: 4550 },
            { x: 2950, y: 4550 }, // T1 braking
            { x: 2700, y: 4250 }, // T1 apex
            { x: 2400, y: 4250 }, // T2 apex
            { x: 2400, y: 3450 }, // T3 entry
            { x: 3000, y: 3050 }, // T3 exit/T4 apex
            { x: 3500, y: 2850 }, // Straight to T5
            { x: 3500, y: 2450 }, // T5 apex
            { x: 2000, y: 2450 }, // Straight to T7
            { x: 1000, y: 2950 }, // T7 apex
            { x: 1000, y: 4050 }, // T8 apex
            { x: 1800, y: 4050 }, // T9 apex
            { x: 2000, y: 3000 }, // T10 entry (long sequence)
            { x: 2000, y: 1450 },
            { x: 3000, y: 1050 },
            { x: 4500, y: 1050 },
            { x: 5300, y: 1150 },
            { x: 6000, y: 1050 }, // T13 apex
            { x: 6300, y: 2000 }, // Back straight
            { x: 6300, y: 3800 }, // T15 braking
            { x: 5700, y: 4250 }, // T15 apex
            { x: 5100, y: 4250 }, // T16 apex
            { x: 5100, y: 3850 }, // T17 apex
            { x: 4500, y: 3750 }, // T18 apex
        ],
        wallPath: '',
    },
    {
        id: 'c2',
        name: 'Gran Premio de Timisoara',
        viewBox: '0 0 7000 5000',
        width: 7000,
        height: 5000,
        // Mirrored version of Bucharest
        trackPath: "M 2600 4650 L 4100 4650 L 4100 4350 C 4100 4150 4200 4050 4400 4050 C 4600 4050 4700 4150 4700 4350 L 4700 3750 C 4700 3250 4400 2950 3900 2950 L 3500 2950 C 3300 2950 3200 2850 3200 2650 C 3200 2450 3300 2350 3500 2350 L 5500 2350 C 6000 2350 6400 2750 6400 3250 C 6400 3750 6000 4150 5500 4150 L 5300 4150 C 5000 4150 4900 4050 4900 3750 L 4900 1750 C 4900 1250 4600 950 4100 950 L 3000 950 C 2700 950 2500 1050 2300 1250 C 2100 1450 1800 1450 1600 1250 C 1400 1050 1100 950 800 950 L 600 1250 L 600 3550 C 600 4050 900 4350 1400 4350 L 1700 4350 C 1900 4350 2000 4250 2000 4050 L 2000 3950 C 2000 3750 1900 3650 1700 3650 L 2600 3650 L 2600 4650 Z",
        pitLanePath: "M 2600 4550 L 4100 4550 L 4100 4250 C 4100 4150 4150 4100 4200 4100 C 4250 4100 4300 4150 4300 4250 L 4300 3850 C 4300 3450 4100 3150 3700 3150 L 3400 3150 C 3300 3150 3250 3100 3250 3000 C 3250 2900 3300 2850 3400 2850 L 2200 2850 L 2000 3050 L 2000 3750 C 2000 4150 2200 4450 2600 4450 L 2600 4550 Z",
        decorations: <TimisoaraDecorations />,
        startPosition: { x: 3300, y: 4550 },
        startAngle: 0,
        finishLine: { p1: { x: 2750, y: 4500 }, p2: { x: 2750, y: 4600 } },
        waypoints: [
            { x: 3800, y: 4550 },
            { x: 4050, y: 4550 }, // T1 braking
            { x: 4300, y: 4250 }, // T1 apex
            { x: 4600, y: 4250 }, // T2 apex
            { x: 4600, y: 3450 }, // T3 entry
            { x: 4000, y: 3050 }, // T3 exit/T4 apex
            { x: 3500, y: 2850 }, // Straight to T5
            { x: 3500, y: 2450 }, // T5 apex
            { x: 5000, y: 2450 }, // Straight to T7
            { x: 6000, y: 2950 }, // T7 apex
            { x: 6000, y: 4050 }, // T8 apex
            { x: 5200, y: 4050 }, // T9 apex
            { x: 5000, y: 3000 }, // T10 entry (long sequence)
            { x: 5000, y: 1450 },
            { x: 4000, y: 1050 },
            { x: 2500, y: 1050 },
            { x: 1700, y: 1150 },
            { x: 1000, y: 1050 }, // T13 apex
            { x: 700, y: 2000 }, // Back straight
            { x: 700, y: 3800 }, // T15 braking
            { x: 1300, y: 4250 }, // T15 apex
            { x: 1900, y: 4250 }, // T16 apex
            { x: 1900, y: 3850 }, // T17 apex
            { x: 2500, y: 3750 }, // T18 apex
        ],
        wallPath: '',
    },
    {
        id: 'c3',
        name: 'Arad Grand Prix',
        viewBox: '0 0 7000 5000',
        width: 7000,
        height: 5000,
        // Inverted version of Bucharest
        trackPath: "M 4400 350 L 2900 350 L 2900 650 C 2900 850 2800 950 2600 950 C 2400 950 2300 850 2300 650 L 2300 1250 C 2300 1750 2600 2050 3100 2050 L 3500 2050 C 3700 2050 3800 2150 3800 2350 C 3800 2550 3700 2650 3500 2650 L 1500 2650 C 1000 2650 600 2250 600 1750 C 600 1250 1000 850 1500 850 L 1700 850 C 2000 850 2100 950 2100 1250 L 2100 3250 C 2100 3750 2400 4050 2900 4050 L 4000 4050 C 4300 4050 4500 3950 4700 3750 C 4900 3550 5200 3550 5400 3750 C 5600 3950 5900 4050 6200 4050 L 6400 3750 L 6400 1450 C 6400 950 6100 650 5600 650 L 5300 650 C 5100 650 5000 750 5000 950 L 5000 1050 C 5000 1250 5100 1350 5300 1350 L 4400 1350 L 4400 350 Z",
        pitLanePath: "M 4400 450 L 2900 450 L 2900 750 C 2900 850 2850 900 2800 900 C 2750 900 2700 850 2700 750 L 2700 1150 C 2700 1550 2900 1850 3300 1850 L 3600 1850 C 3700 1850 3750 1900 3750 2000 C 3750 2100 3700 2150 3600 2150 L 4800 2150 L 5000 1950 L 5000 1250 C 5000 850 4800 550 4400 550 L 4400 450 Z",
        decorations: <AradDecorations />,
        startPosition: { x: 3700, y: 450 },
        startAngle: 180,
        finishLine: { p1: { x: 4250, y: 400 }, p2: { x: 4250, y: 500 } },
        waypoints: [
            { x: 3200, y: 450 },
            { x: 2950, y: 450 }, // T1 braking
            { x: 2700, y: 750 }, // T1 apex
            { x: 2400, y: 750 }, // T2 apex
            { x: 2400, y: 1550 }, // T3 entry
            { x: 3000, y: 1950 }, // T3 exit/T4 apex
            { x: 3500, y: 2150 }, // Straight to T5
            { x: 3500, y: 2550 }, // T5 apex
            { x: 2000, y: 2550 }, // Straight to T7
            { x: 1000, y: 2050 }, // T7 apex
            { x: 1000, y: 950 }, // T8 apex
            { x: 1800, y: 950 }, // T9 apex
            { x: 2000, y: 2000 }, // T10 entry (long sequence)
            { x: 2000, y: 3550 },
            { x: 3000, y: 3950 },
            { x: 4500, y: 3950 },
            { x: 5300, y: 3850 },
            { x: 6000, y: 3950 }, // T13 apex
            { x: 6300, y: 3000 }, // Back straight
            { x: 6300, y: 1200 }, // T15 braking
            { x: 5700, y: 750 }, // T15 apex
            { x: 5100, y: 750 }, // T16 apex
            { x: 5100, y: 1150 }, // T17 apex
            { x: 4500, y: 1250 }, // T18 apex
        ],
        wallPath: '',
    }
];
