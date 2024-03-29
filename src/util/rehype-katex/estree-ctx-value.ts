import type { Program } from "estree";

export const estreeCtxValue = (varName: string): Program => {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
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
      },
    ],
  };
};
