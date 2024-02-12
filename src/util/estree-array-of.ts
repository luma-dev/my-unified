import type { Expression, Program, SpreadElement } from "estree";

export const estreeArrayOf = (
  exprs: readonly (Expression | SpreadElement | null)[],
): Program => {
  return {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "ArrayExpression",
          elements: [...exprs],
        },
      },
    ],
    sourceType: "module",
    comments: [],
  };
};
