import {
  parseMathTransform,
  makeMathTransform1Column,
  makeMathTransform2Column,
} from "../transform.js";
import { describe, it, expect } from "vitest";

describe("parseMathTransform", () => {
  it("basic", () => {
    expect(
      parseMathTransform(
        ["x", "= x^2", "~ x^3", "$ desc1", "- x^4", "? desc2"].join("\n")
      )
    ).toMatchInlineSnapshot(`
      {
        "first": "x",
        "steps": [
          {
            "formula": "x^2",
            "prefix": "= ",
          },
          {
            "description": "desc1",
            "formula": "x^3",
            "prefix": "\\sim ",
          },
          {
            "descIsText": true,
            "description": "desc2",
            "formula": "x^4",
            "prefix": "\\iff ",
          },
        ],
      }
    `);
  });
});

describe("makeMathTransform1Column", () => {
  it("basic", () => {
    expect(
      makeMathTransform1Column({
        first: "x",
        steps: [
          {
            formula: "x^2",
            prefix: "=",
          },
          {
            formula: "x^3",
            prefix: "\\sim ",
          },
          {
            formula: "x^4",
            prefix: "\\iff ",
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "\\begin{aligned}
      &&&x&&\\\\
      &=&&x^2&&\\\\
      &\\sim &&x^3&&\\\\
      &\\iff &&x^4&&\\\\
      \\end{aligned}"
    `);
  });
});

describe("makeMathTransform2Column", () => {
  it("basic", () => {
    expect(
      makeMathTransform2Column({
        first: "x",
        steps: [
          {
            formula: "x^2",
            prefix: "=",
          },
          {
            formula: "x^3",
            prefix: "\\sim ",
          },
          {
            formula: "x^4",
            prefix: "\\iff ",
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "\\begin{aligned}
      &x&&=&&x^2&&\\\\
      &&&\\sim &&x^3&&\\\\
      &&&\\iff &&x^4&&\\\\
      \\end{aligned}"
    `);
  });
  it("with description", () => {
    expect(
      makeMathTransform2Column({
        first: "x",
        steps: [
          {
            formula: "x^2",
            prefix: "=",
            description: "desc1",
          },
          {
            formula: "x^3",
            prefix: "\\sim ",
          },
          {
            formula: "x^4",
            prefix: "\\iff ",
            description: "desc2",
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      "\\begin{aligned}
      &x&&=&&x^2&&\\left({desc1}\\right)\\\\
      &&&\\sim &&x^3&&\\\\
      &&&\\iff &&x^4&&\\left({desc2}\\right)\\\\
      \\end{aligned}"
    `);
  });
});
