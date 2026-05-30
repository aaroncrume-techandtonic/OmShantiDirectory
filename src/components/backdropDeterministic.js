export function deterministicUnit(index, salt = 0) {
  const seed = (index + 1) * 12.9898 + (salt + 1) * 78.233;
  const value = Math.sin(seed) * 43758.5453;
  return value - Math.floor(value);
}
