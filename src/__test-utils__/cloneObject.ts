export function cloneObject<T>(toBeCloned: T): T {
  return JSON.parse(JSON.stringify(toBeCloned));
}
