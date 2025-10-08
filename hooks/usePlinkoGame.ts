
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Pin, Ball, Multiplier } from '../types';
import {
  PIN_RADIUS,
  BALL_RADIUS,
  GRAVITY,
  BOUNCE_FACTOR,
  HORIZONTAL_DAMPENING,
  ROW_COUNT_MIN,
  PLAY_COUNT_MIN,
  getMultiplierBuckets,
  BALL_COLORS
} from '../constants';

const BOARD_WIDTH = 800;
const ROW_SPACING = 45;
const PIN_SPACING = 50;

export const usePlinkoGame = () => {
  const [rows, setRows] = useState<number>(10);
  const [playCount, setPlayCount] = useState<number>(3);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationFrameId = useRef<number | null>(null);
  const [results, setResults] = useState<number[]>([]);

  const { pins, multipliers, boardHeight } = useMemo(() => {
    const newPins: Pin[] = [];
    for (let row = 0; row < rows; row++) {
      const numPinsInRow = row + 1;
      const y = (row + 2) * ROW_SPACING;
      for (let col = 0; col < numPinsInRow; col++) {
        const x = BOARD_WIDTH / 2 - (numPinsInRow - 1) * PIN_SPACING / 2 + col * PIN_SPACING;
        newPins.push({ x, y, id: `pin-${row}-${col}` });
      }
    }
    const newMultipliers = getMultiplierBuckets(rows);
    const newBoardHeight = (rows + 3) * ROW_SPACING;
    return { pins: newPins, multipliers: newMultipliers, boardHeight: newBoardHeight };
  }, [rows]);

  const startGame = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setResults([]);
    const newBalls: Ball[] = Array.from({ length: playCount }, (_, i) => ({
      id: Date.now() + i,
      x: BOARD_WIDTH / 2 + (Math.random() - 0.5) * 20,
      y: 20,
      vx: (Math.random() - 0.5) * 2,
      vy: 0,
      landed: false,
      color: BALL_COLORS[i % BALL_COLORS.length],
      landedMultiplierIndex: null,
    }));
    setBalls(newBalls);
  }, [isAnimating, playCount]);
  
  const gameLoop = useCallback(() => {
    setBalls(prevBalls => {
      const updatedBalls = prevBalls.map(ball => {
        if (ball.landed) return ball;

        let { x, y, vx, vy } = ball;

        vy += GRAVITY;
        vx *= HORIZONTAL_DAMPENING;
        x += vx;
        y += vy;
        
        // Pin collision
        for (const pin of pins) {
          const dx = x - pin.x;
          const dy = y - pin.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < PIN_RADIUS + BALL_RADIUS) {
            const angle = Math.atan2(dy, dx);
            const overlap = (PIN_RADIUS + BALL_RADIUS) - distance;
            x += Math.cos(angle) * overlap;
            y += Math.sin(angle) * overlap;
            
            const normalX = dx / distance;
            const normalY = dy / distance;
            const dotProduct = vx * normalX + vy * normalY;
            
            vx -= 2 * dotProduct * normalX * BOUNCE_FACTOR;
            vy -= 2 * dotProduct * normalY * BOUNCE_FACTOR;
            vx += (Math.random() - 0.5) * 0.5; // Add randomness to bounce
          }
        }

        // Boundary collision
        if (x - BALL_RADIUS < 0 || x + BALL_RADIUS > BOARD_WIDTH) {
          vx *= -BOUNCE_FACTOR;
          x = x - BALL_RADIUS < 0 ? BALL_RADIUS : BOARD_WIDTH - BALL_RADIUS;
        }

        // Landing condition
        if (y + BALL_RADIUS > boardHeight) {
          ball.landed = true;
          const multiplierWidth = BOARD_WIDTH / multipliers.length;
          let landedIndex = Math.floor(x / multiplierWidth);
          landedIndex = Math.max(0, Math.min(multipliers.length - 1, landedIndex));
          ball.landedMultiplierIndex = landedIndex;
          setResults(prev => [...prev, landedIndex]);
        }

        return { ...ball, x, y, vx, vy };
      });
      
      if (updatedBalls.every(b => b.landed)) {
        setIsAnimating(false);
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
      }
      return updatedBalls;
    });

    if (isAnimating) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
    }
  }, [pins, boardHeight, multipliers.length, isAnimating]);
  
  useEffect(() => {
    if (isAnimating) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
    } else if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
    }
    return () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating]);

  return {
    rows,
    setRows,
    playCount,
    setPlayCount,
    pins,
    balls,
    multipliers,
    isAnimating,
    startGame,
    results
  };
};
