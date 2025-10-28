import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { usePlayerControls } from '../hooks/usePlayerControls';
import type { GameMode, CircuitData, CarState, Vector2D } from '../types';
import { Car } from './Car';
import { Circuit } from './Circuit';
import { HUD } from './HUD';
import { CAR_HEIGHT, CAR_WIDTH, ACCELERATION, BRAKING, MAX_SPEED, MAX_REVERSE_SPEED, FRICTION, TURN_SPEED, AI_COUNT, TOTAL_LAPS, RACE_START_COUNTDOWN, AI_LOOKAHEAD_DISTANCE, AI_MAX_SPEED_FACTOR, AI_TURN_SENSITIVITY, AI_ACCELERATION_FACTOR, OFF_TRACK_SPEED_DECAY, WALL_BOUNCE } from '../constants/gameConfig';
import { vectorAdd, vectorSub, vectorScale, normalizeVector, distance, checkLineIntersection, degToRad, radToDeg } from '../utils/math';

interface GameScreenProps {
    gameMode: GameMode;
    circuit: CircuitData;
    onBackToMenu: () => void;
}

type GamePhase = 'countdown' | 'racing' | 'finished';

const carColors = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#a855f7', '#f97316'];

const initialCarState = (circuit: CircuitData, carIndex: number, isPlayer: boolean): CarState => {
    const posOffset = (carIndex - Math.floor(AI_COUNT/2)) * CAR_WIDTH * 2;
    const rowOffset = (carIndex % 2) * CAR_HEIGHT * 1.5;
    const angleRad = degToRad(circuit.startAngle);
    const perpRad = angleRad + Math.PI/2;

    const startPos = {
        x: circuit.startPosition.x + Math.cos(perpRad) * posOffset - Math.cos(angleRad) * rowOffset,
        y: circuit.startPosition.y + Math.sin(perpRad) * posOffset - Math.sin(angleRad) * rowOffset
    };

    return {
        id: carIndex,
        name: isPlayer ? 'YOU' : `AI ${carIndex}`,
        color: isPlayer ? '#ffffff' : carColors[carIndex % carColors.length],
        position: startPos,
        velocity: { x: 0, y: 0 },
        angle: circuit.startAngle,
        speed: 0,
        isPlayer,
        lap: 1,
        lastWaypointIndex: circuit.waypoints.length - 1,
        lapTimes: [],
        totalTime: 0,
        isFinished: false,
        steering: 0,
    };
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CAMERA_VIEWBOX_WIDTH = 1000;
const CAMERA_VIEWBOX_HEIGHT = 600;

export const GameScreen: React.FC<GameScreenProps> = ({ gameMode, circuit, onBackToMenu }) => {
    const [cars, setCars] = useState<CarState[]>(() => {
        const allCars = [initialCarState(circuit, 0, true)];
        if (gameMode === 'RACE') {
            for (let i = 1; i <= AI_COUNT; i++) {
                allCars.push(initialCarState(circuit, i, false));
            }
        }
        return allCars;
    });
    
    const [gamePhase, setGamePhase] = useState<GamePhase>('countdown');
    const [countdown, setCountdown] = useState(RACE_START_COUNTDOWN);
    const [gameTime, setGameTime] = useState(0);

    const playerControls = usePlayerControls();
    const collisionCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const cameraPosRef = useRef<Vector2D>(circuit.startPosition);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = circuit.width;
        canvas.height = circuit.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            const p = new Path2D(circuit.trackPath);
            // Use a thick stroke to draw the track on the collision canvas
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 100;
            ctx.stroke(p);
        }
        collisionCanvasRef.current = canvas;
    }, [circuit]);

    useEffect(() => {
        if (gamePhase !== 'countdown') return;
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setGamePhase('racing'), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, gamePhase]);

    const isOffTrack = useCallback((pos: Vector2D): boolean => {
        if (!collisionCanvasRef.current) return false;
        const ctx = collisionCanvasRef.current.getContext('2d');
        if (!ctx) return false;
        if(pos.x < 0 || pos.y < 0 || pos.x >= circuit.width || pos.y >= circuit.height) return true;
        const pixel = ctx.getImageData(Math.round(pos.x), Math.round(pos.y), 1, 1).data;
        // Check for black pixel (R,G,B = 0)
        return pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0;
    }, [circuit.width, circuit.height]);

    const gameTick = useCallback((deltaTime: number) => {
        const dt = deltaTime / 16.67;
        if (gamePhase !== 'racing') return;
        
        setGameTime(t => t + deltaTime / 1000);

        const updatedCars = cars.map(car => {
            if (car.isFinished) return car;

            let newCar = { ...car };
            let accelerationInput = 0;
            let turnInput = 0;

            if (newCar.isPlayer) {
                if (playerControls.w || playerControls.ArrowUp) accelerationInput = 1;
                if (playerControls.s || playerControls.ArrowDown) accelerationInput = -1;
                if (playerControls.a || playerControls.ArrowLeft) turnInput = -1;
                if (playerControls.d || playerControls.ArrowRight) turnInput = 1;
            } else { 
                const targetWaypointIndex = (newCar.lastWaypointIndex + 1) % circuit.waypoints.length;
                const target = circuit.waypoints[targetWaypointIndex];

                const toTarget = vectorSub(target, newCar.position);
                const targetAngle = radToDeg(Math.atan2(toTarget.y, toTarget.x));
                let angleDiff = targetAngle - newCar.angle;
                while (angleDiff > 180) angleDiff -= 360;
                while (angleDiff < -180) angleDiff += 360;
                
                turnInput = Math.max(-1, Math.min(1, angleDiff / AI_TURN_SENSITIVITY));

                const sharpness = Math.abs(angleDiff);
                const speedReduction = 1 - Math.min(1, Math.pow(sharpness / 90, 2));
                const targetSpeed = (MAX_SPEED * AI_MAX_SPEED_FACTOR) * speedReduction;

                if (newCar.speed > targetSpeed) {
                    accelerationInput = -0.5; // Braking
                } else {
                    accelerationInput = AI_ACCELERATION_FACTOR;
                }
            }

            const onTrack = !isOffTrack(newCar.position);
            
            if (newCar.speed > 0.1) {
              newCar.angle += turnInput * TURN_SPEED * (1 - newCar.speed / (MAX_SPEED * 2)) * dt;
            } else if (newCar.speed < -0.1) {
              newCar.angle -= turnInput * TURN_SPEED * (1 - Math.abs(newCar.speed) / (MAX_SPEED * 2)) * dt;
            }

            let currentAcceleration = 0;
            if (accelerationInput > 0) currentAcceleration = ACCELERATION;
            if (accelerationInput < 0) currentAcceleration = -BRAKING;

            // Physics update
            if (onTrack) {
                // On-track physics
                const frictionForce = -newCar.speed * FRICTION;
                const totalForce = currentAcceleration + frictionForce;
                newCar.speed += totalForce * dt;
            } else {
                // Off-track penalty: speed decays by a percentage per second
                const decayPerFrame = Math.pow(OFF_TRACK_SPEED_DECAY, (deltaTime / 1000));
                newCar.speed *= decayPerFrame;

                // Allow minimal control off-track to avoid getting stuck
                const offTrackControlFactor = 0.1;
                newCar.speed += currentAcceleration * offTrackControlFactor * dt;
            }
            
            const maxSpeed = newCar.isPlayer ? MAX_SPEED : MAX_SPEED * AI_MAX_SPEED_FACTOR;
            newCar.speed = Math.max(MAX_REVERSE_SPEED, Math.min(maxSpeed, newCar.speed));
            
            const angleRad = degToRad(newCar.angle);
            const forwardVector = { x: Math.cos(angleRad), y: Math.sin(angleRad) };
            newCar.velocity = vectorScale(forwardVector, newCar.speed);
            
            const prevPosition = newCar.position;
            newCar.position = vectorAdd(newCar.position, vectorScale(newCar.velocity, dt));

            if (checkLineIntersection(prevPosition, newCar.position, circuit.finishLine.p1, circuit.finishLine.p2)) {
                const time = gameTime - newCar.totalTime;
                newCar.totalTime = gameTime;
                newCar.lapTimes.push(time);
                if (newCar.lap >= TOTAL_LAPS) {
                    newCar.isFinished = true;
                } else {
                    newCar.lap++;
                }
            }

            if (!newCar.isPlayer) {
                const targetWaypointIndex = (newCar.lastWaypointIndex + 1) % circuit.waypoints.length;
                if (distance(newCar.position, circuit.waypoints[targetWaypointIndex]) < AI_LOOKAHEAD_DISTANCE) {
                    newCar.lastWaypointIndex = targetWaypointIndex;
                }
            }

            return newCar;
        });
        
        const sortedCars = updatedCars.sort((a, b) => {
          if(a.isFinished && !b.isFinished) return -1;
          if(!a.isFinished && b.isFinished) return 1;
          if (a.isFinished && b.isFinished) return a.totalTime - b.totalTime;
          if (b.lap !== a.lap) return b.lap - a.lap;
          
          const aNextWaypoint = (a.lastWaypointIndex + 1) % circuit.waypoints.length;
          const bNextWaypoint = (b.lastWaypointIndex + 1) % circuit.waypoints.length;
          
          if (a.lastWaypointIndex !== b.lastWaypointIndex) return b.lastWaypointIndex - a.lastWaypointIndex;
          
          const aDist = distance(a.position, circuit.waypoints[aNextWaypoint]);
          const bDist = distance(b.position, circuit.waypoints[bNextWaypoint]);

          return aDist - bDist;
        });

        // The camera logic and state update must be separated to avoid race conditions.
        // First, calculate all new car positions.
        const playerCarForCamera = sortedCars.find(c => c.isPlayer);
        
        // Then, update the camera based on the new player position.
        if (playerCarForCamera) {
            cameraPosRef.current.x = lerp(cameraPosRef.current.x, playerCarForCamera.position.x, 0.08);
            cameraPosRef.current.y = lerp(cameraPosRef.current.y, playerCarForCamera.position.y, 0.08);
            if (svgRef.current) {
                const vbX = cameraPosRef.current.x - CAMERA_VIEWBOX_WIDTH / 2;
                const vbY = cameraPosRef.current.y - CAMERA_VIEWBOX_HEIGHT / 2;
                svgRef.current.setAttribute('viewBox', `${vbX} ${vbY} ${CAMERA_VIEWBOX_WIDTH} ${CAMERA_VIEWBOX_HEIGHT}`);
            }
        }

        // Finally, commit the new state.
        setCars(sortedCars);
        
        const allFinished = updatedCars.every(c => c.isFinished);
        if(allFinished) setGamePhase('finished');

    }, [gamePhase, playerControls, circuit, isOffTrack, gameTime, cars]);

    useGameLoop(gameTick, gamePhase !== 'racing');
    
    const playerCar = cars.find(c => c.isPlayer) || cars[0];

    const renderOverlay = () => {
        if (gamePhase === 'countdown') {
            return (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                    <div className="text-9xl font-orbitron font-black text-red-500 animate-ping">
                        {countdown > 0 ? countdown : 'GO!'}
                    </div>
                </div>
            )
        }
        if (gamePhase === 'finished') {
            const playerResult = cars.find(c => c.isPlayer);
            const playerPosition = cars.findIndex(c => c.id === playerResult?.id) + 1;
            return (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4 z-20">
                    <h2 className="text-6xl font-orbitron font-bold text-red-500 mb-4">
                        {gameMode === 'RACE' ? `Finished: Position ${playerPosition}` : 'Time Trial Complete!'}
                    </h2>
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Your Lap Times</h3>
                        <ul className="text-lg">
                            {playerResult?.lapTimes.map((time, index) => (
                                <li key={index} className="flex justify-between py-1 border-b border-gray-700">
                                    <span>Lap {index + 1}</span>
                                    <span className="font-mono">{new Date(time * 1000).toISOString().slice(14, -1)}</span>
                                </li>
                            ))}
                             <li className="flex justify-between py-2 font-bold mt-2">
                                    <span>Total</span>
                                    <span className="font-mono">{new Date(playerResult?.totalTime * 1000).toISOString().slice(14, -1)}</span>
                                </li>
                        </ul>
                    </div>
                    <button 
                        onClick={onBackToMenu}
                        className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-orbitron text-xl font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        Back to Menu
                    </button>
                </div>
            )
        }
        return null;
    }

    const initialViewBox = `${cameraPosRef.current.x - CAMERA_VIEWBOX_WIDTH / 2} ${cameraPosRef.current.y - CAMERA_VIEWBOX_HEIGHT / 2} ${CAMERA_VIEWBOX_WIDTH} ${CAMERA_VIEWBOX_HEIGHT}`;

    return (
        <div className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
            <svg ref={svgRef} viewBox={initialViewBox} className="w-full h-full">
                <Circuit circuit={circuit} />
                {cars.map(car => <Car key={car.id} car={car} />)}
            </svg>
            <div className="absolute inset-0 pointer-events-none z-10">
                <HUD playerCar={playerCar} cars={cars} gameTime={gameTime} gameMode={gameMode} totalLaps={TOTAL_LAPS} />
            </div>
            {renderOverlay()}
        </div>
    );
};