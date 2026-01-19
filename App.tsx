
import React, { useState, useCallback, useEffect } from 'react';
import { Player, CellValue, GameState, ROWS, COLS } from './types';
import { createEmptyBoard, findAvailableRow, checkWinner } from './utils/gameLogic';
import Board from './components/Board';
import GameControls from './components/GameControls';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 'RED',
    winner: null,
    winningCoords: null,
    scores: { RED: 0, YELLOW: 0 }
  });

  const [lastDropped, setLastDropped] = useState<[number, number] | null>(null);

  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      board: createEmptyBoard(),
      currentPlayer: Math.random() > 0.5 ? 'RED' : 'YELLOW',
      winner: null,
      winningCoords: null
    }));
    setLastDropped(null);
  }, []);

  const handleDrop = useCallback((col: number) => {
    if (state.winner) return;

    const row = findAvailableRow(state.board, col);
    if (row === null) return;

    const newBoard = state.board.map(r => [...r]);
    newBoard[row][col] = state.currentPlayer;
    setLastDropped([row, col]);

    const { winner, coords } = checkWinner(newBoard);

    setState(prev => {
      const newScores = { ...prev.scores };
      if (winner && winner !== 'DRAW') {
        newScores[winner] += 1;
      }

      return {
        ...prev,
        board: newBoard,
        winner,
        winningCoords: coords,
        currentPlayer: prev.currentPlayer === 'RED' ? 'YELLOW' : 'RED',
        scores: newScores
      };
    });
  }, [state.board, state.currentPlayer, state.winner]);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen max-w-4xl mx-auto">
      {/* Header & Scores */}
      <header className="w-full flex flex-col items-center mb-8">
        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-400 italic">
          CONNECT FOUR
        </h1>
        
        <div className="flex gap-4 sm:gap-12 w-full justify-center">
          <div className={`
            flex flex-col items-center p-4 rounded-2xl w-32 sm:w-40 transition-all border-b-4
            ${state.currentPlayer === 'RED' && !state.winner ? 'bg-rose-500/20 border-rose-500 scale-105 shadow-lg shadow-rose-500/20' : 'bg-slate-800 border-slate-700'}
          `}>
            <span className="text-rose-500 font-bold mb-1">RED</span>
            <span className="text-3xl font-black">{state.scores.RED}</span>
          </div>

          <div className="flex flex-col items-center justify-center px-4">
            <button 
              onClick={resetGame}
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors group"
              title="Reset Game"
            >
              <i className="fas fa-rotate-right text-xl group-active:rotate-180 transition-transform duration-300"></i>
            </button>
          </div>

          <div className={`
            flex flex-col items-center p-4 rounded-2xl w-32 sm:w-40 transition-all border-b-4
            ${state.currentPlayer === 'YELLOW' && !state.winner ? 'bg-amber-400/20 border-amber-400 scale-105 shadow-lg shadow-amber-400/20' : 'bg-slate-800 border-slate-700'}
          `}>
            <span className="text-amber-400 font-bold mb-1">YELLOW</span>
            <span className="text-3xl font-black">{state.scores.YELLOW}</span>
          </div>
        </div>
      </header>

      {/* Status Message */}
      <div className="mb-6 h-12 flex items-center justify-center w-full">
        {state.winner ? (
          <div className="text-2xl sm:text-3xl font-bold animate-bounce flex items-center gap-3">
            {state.winner === 'DRAW' ? (
              <span className="text-slate-400">IT'S A DRAW!</span>
            ) : (
              <>
                <div className={`w-8 h-8 rounded-full ${state.winner === 'RED' ? 'bg-rose-500' : 'bg-amber-400'}`}></div>
                <span className={state.winner === 'RED' ? 'text-rose-500' : 'text-amber-400'}>
                  {state.winner} WINS!
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="text-xl font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <div className={`w-4 h-4 rounded-full ${state.currentPlayer === 'RED' ? 'bg-rose-500 animate-pulse' : 'bg-amber-400 animate-pulse'}`}></div>
             {state.currentPlayer}'S TURN
          </div>
        )}
      </div>

      {/* Main Game Area */}
      <div className="relative">
        <GameControls 
          onDrop={handleDrop} 
          disabled={!!state.winner} 
          currentPlayer={state.currentPlayer}
        />
        <Board 
          board={state.board} 
          winningCoords={state.winningCoords} 
          lastDropped={lastDropped}
        />
        
        {state.winner && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-slate-900/40 backdrop-blur-[2px] w-full h-full rounded-2xl"></div>
          </div>
        )}
      </div>

      <footer className="mt-12 text-slate-500 text-sm flex gap-4 items-center">
        <p>Drop a token into a column to align 4 of your color!</p>
      </footer>
    </div>
  );
};

export default App;
