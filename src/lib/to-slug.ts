export const toSlug = (text: string) => {
  let slug = text.trim();
  // remove spaces around punctuation
  slug = slug.replace(/\s*([()[\]!@#$%^&*.\-,;:'"+=\\`_])\s*/g, "$1");
  slug = slug.replace(/\s+/g, "_");
  return slug;
};
