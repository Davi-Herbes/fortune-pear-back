const SYMBOLS = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5];

export function makeSymbol(): number {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}
