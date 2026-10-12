/**
 * Creates a new object by excluding specified properties from the source object.
 * Keys may be passed as separate arguments, as arrays, or a mix of both.
 * Walks the prototype chain, so inherited enumerable properties are copied too.
 */
export function except<T extends Record<string, any>, K extends keyof T>(
  object: T,
  ...props: (K | K[])[]
): Omit<T, K> {
  const keys = new Set<PropertyKey>(props.flat());
  const result = {} as Omit<T, K>;
  for (const key in object) {
    if (keys.has(key)) continue;
    (result as any)[key] = object[key];
  }
  return result;
}
