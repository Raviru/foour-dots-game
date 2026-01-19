
import React from 'react';
import Cell from './Cell';
import { CellValue, ROWS, COLS } from '../types';

interface BoardProps {
  board: CellValue[][];
  winningCoords: [number, number][] | null;
  lastDropped: [number, number] | null;
}

const Board: React.FC<BoardProps> = ({ board, winningCoords, lastDropped }) => {
  const isWinningCell = (r: number, c: number) => {
    return winningCoords?.some(([wr, wc]) => wr === r && wc === c) ?? false;
  };

  const isLastDroppedCell = (r: number, c: number) => {
    return lastDropped?.[0] === r && lastDropped?.[1] === c;
  };

  return (
    <div className="bg-blue-800 p-4 rounded-2xl shadow-2xl border-b-8 border-blue-900 inline-block">
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {board.map((row, r) => 
          row.map((cell, c) => (
            <Cell 
              key={`${r}-${c}`} 
              value={cell} 
              isWinningCell={isWinningCell(r, c)}
              isLastDropped={isLastDroppedCell(r, c)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
