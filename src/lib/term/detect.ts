type ExtractedTerm = {
  readonly type: "term";
  readonly term: string;
};
type ExtractedText = {
  readonly type: "text";
  readonly text: string;
};
type Extracted = ExtractedTerm | ExtractedText;

export const extractTerms = (text: string): Extracted[] => {
  const extractedRev: Extracted[] = [];
  while (text.length > 0) {
    const g = text.match(/([\s\S]*)\[([^[\]\s,]+)\]([\s\S]*)/);
    if (g === null) {
      extractedRev.push({
        type: "text",
        text,
      });
      break;
    }
    const [, before, term, after] = g;
    text = before;
    if (after.length > 0) {
      extractedRev.push({
        type: "text",
        text: after,
      });
    }
    extractedRev.push({
      type: "term",
      term,
    });
  }
  return extractedRev.reverse();
};
