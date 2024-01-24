export const mapIntersection = <T, U1, U2>(
  map1: Map<T, U1>,
  map2: Map<T, U2>,
): Set<T> => {
  const set = new Set<T>();
  for (const key of map1.keys()) {
    if (map2.has(key)) {
      set.add(key);
    }
  }
  return set;
};
