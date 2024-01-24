import type { Program } from "@mdx-js/mdx/lib/core";

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
