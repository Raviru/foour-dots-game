
import React from 'react';
import { CellValue, Player } from '../types';

interface CellProps {
  value: CellValue;
  isWinningCell: boolean;
  isLastDropped: boolean;
}

const Cell: React.FC<CellProps> = ({ value, isWinningCell, isLastDropped }) => {
  const getBgColor = () => {
    if (value === 'RED') return 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]';
    if (value === 'YELLOW') return 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]';
    return 'bg-slate-800';
  };

  return (
    <div className="relative w-10 h-10 sm:w-16 sm:h-16 bg-blue-700 rounded-lg flex items-center justify-center p-1 sm:p-2 shadow-inner">
      <div 
        className={`
          w-full h-full rounded-full transition-all duration-300
          ${getBgColor()}
          ${isWinningCell ? 'ring-4 ring-white animate-pulse' : ''}
          ${isLastDropped ? 'animate-drop' : ''}
          border-2 border-black/20
        `}
      />
    </div>
  );
};

export default Cell;
