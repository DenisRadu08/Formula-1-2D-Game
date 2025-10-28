import React from 'react';

export const TrophyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
        <path d="M13 11V5h-2v6H9v2h2v2h2v-2h2v-2h-2z"></path>
    </svg>
);

export const RaceFlagIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 6c-1.3 0-2.6.4-3.7 1.2.1-1 .1-1.9.1-2.7 0-1.1-.9-2-2-2h-10c-.6 0-1 .4-1 1s.4 1 1 1h9v3.4c-1.3-1.1-3-1.8-4.9-1.8-3.4 0-6.4 2.1-7.7 5.1-1-.1-1.8-.7-1.8-1.5 0-.8.7-1.5 1.5-1.5H2c-.6 0-1 .4-1 1s.4 1 1 1h.5C3.8 15.9 6.8 18 10.2 18c1.9 0 3.6-.7 4.9-1.8V20h-4c-.6 0-1 .4-1 1s.4 1 1 1h5c1.1 0 2-.9 2-2v-3.5c3.3-1.1 5.4-4.2 5.4-7.8 0-1.9-.7-3.7-2-5.2zM10.2 16c-2.3 0-4.4-1.4-5.4-3.5.9-2 2.9-3.4 5.2-3.5v7zm8.3-4.5c0 2.8-2.2 5-5 5V7c2.8 0 5 2.2 5 5z"></path>
    </svg>
);

export const Grandstand = (props: React.SVGProps<SVGGElement>) => (
    <g {...props}>
        <rect width="100%" height="100%" fill="#4a5568" />
        <path d="M0 0 L 10 20 H 290 L 300 0 Z" fill="#2d3748" transform={`scale(${parseInt(props.width as string, 10) / 300} ${parseInt(props.height as string, 10) / 20})`} />
        {[...Array(10)].map((_, i) => (
            <line key={i} x1={0} y1={i * (parseInt(props.height as string, 10) / 10)} x2="100%" y2={i * (parseInt(props.height as string, 10) / 10)} stroke="#a0aec0" strokeWidth="1" />
        ))}
    </g>
);

export const Kerb = ({ d, inside = true }: { d: string; inside?: boolean }) => {
    const offset = inside ? -52 : 52;
    return (
    <>
      <path d={d} stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d={d} stroke="red" strokeWidth="6" strokeDasharray="8 8" fill="none" strokeLinecap="round" />
    </>
)};

export const SandTrap = (props: React.SVGProps<SVGPathElement>) => (
    <g>
        <path {...props} fill="#fde68a" stroke="#ca8a04" strokeWidth="3" />
        <path {...props} fill="url(#sand-pattern)" />
         <defs>
            <pattern id="sand-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="2" cy="2" r="1" fill="#ca8a04" fillOpacity="0.3" />
                <circle cx="7" cy="7" r="1" fill="#ca8a04" fillOpacity="0.3" />
            </pattern>
        </defs>
    </g>
);