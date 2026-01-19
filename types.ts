
export type Player = 'RED' | 'YELLOW';
export type CellValue = Player | null;

export interface GameState {
  board: CellValue[][]; // grid[row][col]
  currentPlayer: Player;
  winner: Player | 'DRAW' | null;
  winningCoords: [number, number][] | null;
  scores: {
    RED: number;
    YELLOW: number;
  };
}

export const ROWS = 6;
export const COLS = 7;
