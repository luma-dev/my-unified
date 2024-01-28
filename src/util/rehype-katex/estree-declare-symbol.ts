import type { Program } from "estree";

export const estreeDeclareSymbol = (varName: string): Program => {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: varName,
            },
            init: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "Symbol",
              },
              arguments: [],
              optional: false,
            },
          },
        ],
      },
    ],
  };
};
