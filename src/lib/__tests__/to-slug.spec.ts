import { toSlug } from "../to-slug.js";
import { describe, expect, it } from "vitest";

describe("toSlug", () => {
  it("simple cases", () => {
    expect(toSlug("a b c")).toBe("a_b_c");
    expect(toSlug("a b c ")).toBe("a_b_c");
    expect(toSlug(" a b c")).toBe("a_b_c");
    expect(toSlug(" a b c ")).toBe("a_b_c");
    expect(toSlug("a  b  c")).toBe("a_b_c");
    expect(toSlug("a  b  c  ")).toBe("a_b_c");
    expect(toSlug("  a  b  c")).toBe("a_b_c");
    expect(toSlug("  a  b  c  ")).toBe("a_b_c");
  });
  it("dot cases", () => {
    expect(toSlug("1. foo bar")).toBe("1.foo_bar");
    expect(toSlug("0.999... = 1")).toBe("0.999...=1");
    expect(toSlug(".999... = 1")).toBe(".999...=1");
    expect(toSlug("( . _ . )")).toBe("(._.)");
  });
});
