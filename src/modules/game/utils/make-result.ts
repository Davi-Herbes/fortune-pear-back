import { makeSymbol } from "./make-symbol.js";

export function makeResult(): [number, number, number] {
  const isTriple = Math.random() < 0.025;

  if (isTriple) {
    const symbol = makeSymbol();

    return [symbol, symbol, symbol];
  }

  return [makeSymbol(), makeSymbol(), makeSymbol()];
}
