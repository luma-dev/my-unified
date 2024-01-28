import type { Program } from "estree";

export const estreeVar = (varName: string): Program => {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "Identifier",
          name: varName,
        },
      },
    ],
  };
};
