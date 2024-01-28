import type { Program } from "estree";

export const estreeResetCtx = (varName: string): Program => {
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
            operator: "=",
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
            right: {
              type: "Literal",
              value: "",
              raw: '""',
            },
          },
        },
      },
    ],
  };
};
