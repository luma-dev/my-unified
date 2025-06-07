import { parseMeta } from "../parse-meta.js";
import { describe, expect, it } from "vitest";

describe("parseMeta", () => {
  it("show", () => {
    expect(parseMeta("")).toStrictEqual({
      category: "show",
      display: true,
      block: true,
      subCategory: "normal",
    });
    expect(parseMeta("inline")).toStrictEqual({
      category: "show",
      display: false,
      block: false,
      subCategory: "normal",
    });
    expect(parseMeta("inline block")).toStrictEqual({
      category: "show",
      display: false,
      block: true,
      subCategory: "normal",
    });
    expect(parseMeta("trans1")).toStrictEqual({
      category: "show",
      display: true,
      block: true,
      subCategory: "transform1",
    });
    expect(parseMeta("display trans2")).toStrictEqual({
      category: "show",
      display: true,
      block: true,
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
        display: true,
        block: true,
        subCategory: "normal",
      },
    });
    expect(parseMeta("$foo trans1")).toStrictEqual({
      category: "save",
      saveName: "foo",
      saved: {
        category: "show",
        display: true,
        block: true,
        subCategory: "transform1",
      },
    });
    expect(parseMeta("inline $")).toStrictEqual({
      category: "save",
      saveName: "",
      saved: {
        category: "show",
        display: false,
        block: false,
        subCategory: "normal",
      },
    });
  });
});
