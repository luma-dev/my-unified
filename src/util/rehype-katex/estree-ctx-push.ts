import type { Program } from "estree";
import type { Expression } from "estree";

export const estreePushCtx = (varName: string, expr: Expression): Program => {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "void",
          prefix: true,
          argument: {
            type: "AssignmentExpression",
            operator: "+=",
            left: {
              type: "MemberExpression",
              object: {
                type: "Identifier",
                name: "globalThis",
              },
              property: {
                type: "Identifier",
                name: varName,
              },
              computed: true,
              optional: false,
            },
            right: expr,
          },
        },
      },
    ],
  };
};
