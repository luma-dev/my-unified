import { extractTerms } from "../detect";
import { describe, expect, it } from "vitest";

describe("extractTerms", () => {
  it("", () => {
    expect(extractTerms("こんにちは．")).toStrictEqual([
      {
        type: "text",
        text: "こんにちは．",
      },
    ]);
    expect(extractTerms("[逆元]を考える．")).toStrictEqual([
      {
        type: "term",
        term: "逆元",
      },
      {
        type: "text",
        text: "を考える．",
      },
    ]);
    expect(extractTerms("[逆元]を考える．\n[実数]を想定する．")).toStrictEqual([
      {
        type: "term",
        term: "逆元",
      },
      {
        type: "text",
        text: "を考える．\n",
      },
      {
        type: "term",
        term: "実数",
      },
      {
        type: "text",
        text: "を想定する．",
      },
    ]);
    expect(extractTerms("")).toStrictEqual([]);
    expect(extractTerms("[inverse]")).toStrictEqual([
      {
        type: "term",
        term: "inverse",
      },
    ]);
  });
});
