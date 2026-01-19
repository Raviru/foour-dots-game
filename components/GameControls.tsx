
import React from 'react';
import { Player, COLS } from '../types';

interface GameControlsProps {
  onDrop: (col: number) => void;
  disabled: boolean;
  currentPlayer: Player;
}

const GameControls: React.FC<GameControlsProps> = ({ onDrop, disabled, currentPlayer }) => {
  return (
    <div className="grid grid-cols-7 gap-2 sm:gap-3 px-4 mb-4">
      {Array.from({ length: COLS }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDrop(i)}
          disabled={disabled}
          className={`
            w-10 h-10 sm:w-16 sm:h-12 flex items-center justify-center rounded-xl transition-all
            ${disabled 
              ? 'opacity-50 cursor-not-allowed bg-slate-700' 
              : 'hover:bg-slate-700 active:scale-95 group'
            }
          `}
        >
          <i className={`
            fas fa-chevron-down text-xl sm:text-2xl transition-colors
            ${currentPlayer === 'RED' ? 'group-hover:text-rose-500' : 'group-hover:text-amber-400'}
            ${disabled ? 'text-slate-500' : 'text-slate-400'}
          `}></i>
        </button>
      ))}
    </div>
  );
};

export default GameControls;
