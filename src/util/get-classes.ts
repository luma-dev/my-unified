import type { Element } from "hast";

export const getClasses = (element: Element): string[] => {
  const { className } = element.properties;
  if (typeof className === "string") return className.trim().split(/\s+/);
  if (Array.isArray(className)) return className.map((x) => x.toString());
  return [];
};
