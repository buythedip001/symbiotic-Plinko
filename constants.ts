
import { Multiplier } from './types';

// Game constants
export const PIN_RADIUS = 8;
export const BALL_RADIUS = 10;
export const GRAVITY = 0.5;
export const BOUNCE_FACTOR = 0.6;
export const HORIZONTAL_DAMPENING = 0.98;

export const ROW_COUNT_MIN = 8;
export const ROW_COUNT_MAX = 16;
export const PLAY_COUNT_MIN = 1;
export const PLAY_COUNT_MAX = 20;

export const MULTIPLIER_CONFIG: { [key: number]: number[] } = {
    8: [28, 4, 1.5, 1, 0.5, 1, 1.5, 4, 28],
    9: [28, 4, 2, 1.2, 1, 0.5, 1, 1.2, 2, 4, 28],
    10: [55, 12, 3, 1.5, 1, 0, 1, 1.5, 3, 12, 55],
    11: [55, 12, 3, 1.5, 1, 0.5, 0.5, 1, 1.5, 3, 12, 55],
    12: [120, 20, 5, 2, 1, 0.5, 0.5, 1, 2, 5, 20, 120],
    13: [120, 20, 5, 2, 1, 0.5, 0.5, 0.5, 1, 2, 5, 20, 120],
    14: [250, 40, 10, 3, 1.2, 0.5, 0.2, 0.2, 0.5, 1.2, 3, 10, 40, 250],
    15: [250, 40, 10, 3, 1.2, 0.5, 0.2, 0.2, 0.2, 0.5, 1.2, 3, 10, 40, 250],
    16: [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000],
};

const MULTIPLIER_COLORS: { [key: string]: string } = {
  high: 'bg-red-500',
  mediumHigh: 'bg-pink-500',
  medium: 'bg-purple-500',
  lowMedium: 'bg-indigo-500',
  low: 'bg-blue-500',
  veryLow: 'bg-sky-500',
  zero: 'bg-[#C0FC5C]',
};

export const getMultiplierBuckets = (rows: number): Multiplier[] => {
  const values = MULTIPLIER_CONFIG[rows] || [];
  return values.map((value) => {
    let color = '';
    if (value >= 100) color = MULTIPLIER_COLORS.high;
    else if (value >= 20) color = MULTIPLIER_COLORS.mediumHigh;
    else if (value >= 5) color = MULTIPLIER_COLORS.medium;
    else if (value >= 2) color = MULTIPLIER_COLORS.lowMedium;
    else if (value >= 1) color = MULTIPLIER_COLORS.low;
    else if (value > 0) color = MULTIPLIER_COLORS.veryLow;
    else color = MULTIPLIER_COLORS.zero;

    return { value, color };
  });
};

export const BALL_COLORS = [
  '#22c55e', // green-500
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#8b5cf6', // violet-500
  '#a855f7', // purple-500
  '#C0FC5C', // fuchsia-500
  '#ec4899', // pink-500
  '#f43f5e', // rose-500
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#f59e0b', // amber-500
  '#eab308', // yellow-500
  '#C0FC5C', // lime-500
];
