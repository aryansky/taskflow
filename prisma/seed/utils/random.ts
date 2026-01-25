export const pickRandom = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
