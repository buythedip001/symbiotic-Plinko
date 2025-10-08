
import React, { useRef, useEffect, useState } from 'react';
import { Pin, Ball, Multiplier } from '../types';
import { BALL_RADIUS, PIN_RADIUS } from '../constants';

interface PlinkoBoardProps {
  pins: Pin[];
  balls: Ball[];
  multipliers: Multiplier[];
  results: number[];
}

const PlinkoBoard: React.FC<PlinkoBoardProps> = ({ pins, balls, multipliers, results }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [lastResult, setLastResult] = useState<number | null>(null);
  
  useEffect(() => {
    if(results.length > 0) {
      setLastResult(results[results.length -1]);
      const timer = setTimeout(() => setLastResult(null), 300); // Highlight duration
      return () => clearTimeout(timer);
    }
  }, [results]);

  return (
    <div ref={boardRef} className="relative bg-[#101820] rounded-xl border border-gray-700/50 w-full aspect-square max-w-[800px] mx-auto overflow-hidden h-[75%]">
      {/* Pins */}
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute bg-gray-600 rounded-full"
          style={{
            left: `${pin.x - PIN_RADIUS}px`,
            top: `${pin.y - PIN_RADIUS}px`,
            width: `${PIN_RADIUS * 2}px`,
            height: `${PIN_RADIUS * 2}px`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
          }}
        />
      ))}

      {/* Balls */}
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="absolute rounded-full"
          style={{
            left: `${ball.x - BALL_RADIUS}px`,
            top: `${ball.y - BALL_RADIUS}px`,
            width: `${BALL_RADIUS * 2}px`,
            height: `${BALL_RADIUS * 2}px`,
            backgroundColor: ball.color,
            boxShadow: `0 0 15px ${ball.color}`,
            transform: ball.landed ? 'scale(0.8)' : 'scale(1)',
            opacity: ball.landed ? 0.8 : 1,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
          }}
        />
      ))}
      
      {/* Multipliers */}
      <div className="absolute bottom-0 left-0 right-0 flex">
        {multipliers.map((multiplier, index) => (
          <div
            key={index}
            className={`flex-1 flex items-center justify-center text-xs sm:text-sm font-bold h-10 m-0.5 rounded-md transition-all duration-200 ${multiplier.color}
             ${ballIsLanding(balls, index) ? 'brightness-150 scale-105' : 'brightness-90'}
             ${lastResult === index ? 'border-2 border-white' : ''}
            `}
            style={{
              boxShadow: ballIsLanding(balls, index) ? '0 0 20px rgba(255, 255, 255, 0.5)' : 'none'
            }}
          >
            {multiplier.value}x
          </div>
        ))}
      </div>
    </div>
  );
};


function ballIsLanding(balls: Ball[], index: number): boolean {
    return balls.some(b => b.landedMultiplierIndex === index);
}

export default PlinkoBoard;
