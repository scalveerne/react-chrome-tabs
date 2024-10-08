export function sum(...args: number[]) {
  return args.reduce((acc, curr) => acc + curr, 0);
}

export function inRange(value: number, start: number, end: number) {
  return value >= start && value <= end;
}
