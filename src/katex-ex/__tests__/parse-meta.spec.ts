import { parseMeta } from "../parse-meta.js";
import { describe, expect, it } from "vitest";

describe("parseMeta", () => {
  it("show", () => {
    expect(parseMeta("")).toStrictEqual({
      category: "show",
      mode: "display",
      subCategory: "normal",
    });
    expect(parseMeta("inline")).toStrictEqual({
      category: "show",
      mode: "inline",
      subCategory: "normal",
    });
    expect(parseMeta("inline-block")).toStrictEqual({
      category: "show",
      mode: "inline-block",
      subCategory: "normal",
    });
    expect(parseMeta("trans1")).toStrictEqual({
      category: "show",
      mode: "display",
      subCategory: "transform1",
    });
    expect(parseMeta("display trans2")).toStrictEqual({
      category: "show",
      mode: "display",
      subCategory: "transform2",
    });
  });

  it("def", () => {
    expect(parseMeta("def")).toStrictEqual({
      category: "def",
    });
  });

  it("def", () => {
    expect(parseMeta("$foo")).toStrictEqual({
      category: "save",
      saveName: "foo",
      saved: {
        category: "show",
        mode: "display",
        subCategory: "normal",
      },
    });
    expect(parseMeta("$foo trans1")).toStrictEqual({
      category: "save",
      saveName: "foo",
      saved: {
        category: "show",
        mode: "display",
        subCategory: "transform1",
      },
    });
    expect(parseMeta("inline $")).toStrictEqual({
      category: "save",
      saveName: "",
      saved: {
        category: "show",
        mode: "inline",
        subCategory: "normal",
      },
    });
  });
});
