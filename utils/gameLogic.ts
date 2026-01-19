
import { Player, CellValue, ROWS, COLS } from '../types';

export const createEmptyBoard = (): CellValue[][] => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

export const findAvailableRow = (board: CellValue[][], col: number): number | null => {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      return r;
    }
  }
  return null;
};

export const checkWinner = (board: CellValue[][]): { winner: Player | 'DRAW' | null; coords: [number, number][] | null } => {
  // Check horizontal
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const cell = board[r][c];
      if (cell && cell === board[r][c + 1] && cell === board[r][c + 2] && cell === board[r][c + 3]) {
        return { winner: cell, coords: [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]] };
      }
    }
  }

  // Check vertical
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c];
      if (cell && cell === board[r + 1][c] && cell === board[r + 2][c] && cell === board[r + 3][c]) {
        return { winner: cell, coords: [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]] };
      }
    }
  }

  // Check diagonal (down-right)
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const cell = board[r][c];
      if (cell && cell === board[r + 1][c + 1] && cell === board[r + 2][c + 2] && cell === board[r + 3][c + 3]) {
        return { winner: cell, coords: [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]] };
      }
    }
  }

  // Check diagonal (up-right)
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      const cell = board[r][c];
      if (cell && cell === board[r - 1][c + 1] && cell === board[r - 2][c + 2] && cell === board[r - 3][c + 3]) {
        return { winner: cell, coords: [[r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3]] };
      }
    }
  }

  // Check draw
  const isFull = board.every(row => row.every(cell => cell !== null));
  if (isFull) return { winner: 'DRAW', coords: null };

  return { winner: null, coords: null };
};
