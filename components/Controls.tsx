
import React from 'react';
import { ROW_COUNT_MIN, ROW_COUNT_MAX, PLAY_COUNT_MIN, PLAY_COUNT_MAX } from '../constants';
import { GamepadIcon, InstructionsIcon, MuteIcon } from './icons/Icons';

interface ControlsProps {
  rows: number;
  setRows: (value: number) => void;
  playCount: number;
  setPlayCount: (value: number) => void;
  onPlay: () => void;
  isAnimating: boolean;
}

const Slider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({ label, value, min, max, onChange, disabled }) => {
    const progress = ((value - min) / (max - min)) * 100;
    return (
        <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
            <label className="text-gray-300">{label}</label>
            <span className="bg-gray-700/50 text-white font-medium px-3 py-1 rounded-md">{value}</span>
        </div>
        <div className="relative">
            <div 
                className="absolute top-1/2 -translate-y-1/2 h-[6px] bg-red-500 rounded-l-full"
                style={{ width: `calc(${progress}% - 8px)` }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full"
            />
        </div>
        </div>
    );
};

const Controls: React.FC<ControlsProps> = ({
  rows,
  setRows,
  playCount,
  setPlayCount,
  onPlay,
  isAnimating,
}) => {
  return (
    <div className="bg-[#1A2532] p-6 rounded-xl border border-gray-700/50 flex flex-col h-[80%]">
      <div className="flex-grow space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#C0FC5C]">Plinko</h2>
          <div className="text-xs text-gray-400">
            <span>12:30:14</span>
            <span className="ml-2 font-semibold text-white bg-gray-700/80 px-2 py-1 rounded">20 / 20</span>
          </div>
        </div>
        <Slider 
          label="Plinko Row"
          value={rows}
          min={ROW_COUNT_MIN}
          max={ROW_COUNT_MAX}
          onChange={(e) => setRows(Number(e.target.value))}
          disabled={isAnimating}
        />
        <Slider 
          label="Play Count"
          value={playCount}
          min={PLAY_COUNT_MIN}
          max={PLAY_COUNT_MAX}
          onChange={(e) => setPlayCount(Number(e.target.value))}
          disabled={isAnimating}
        />
        <button
          onClick={onPlay}
          disabled={isAnimating}
          className="w-full bg-[#C0FC5C] text-gray-900 font-bold py-4 rounded-lg text-lg hover:bg-[#3A7E24] transition-all duration-200 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transform active:scale-95"
        >
          {isAnimating ? 'PLAYING...' : 'PLAY'}
        </button>
      </div>

      <div className="text-[#C0FC5C]"> Built by BuytheDip with 💚</div>

    
    </div>
  );
};

export default Controls;
