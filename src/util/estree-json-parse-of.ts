import type { Program } from "@mdx-js/mdx/lib/core";

export const estreeJsonParseOf = (value: unknown): Program => {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "JSON",
            },
            property: {
              type: "Identifier",
              name: "parse",
            },
            computed: false,
            optional: false,
          },
          arguments: [
            {
              type: "Literal",
              value: "",
              raw: JSON.stringify(JSON.stringify(value)),
            },
          ],
          optional: false,
        },
      },
    ],
  };
};
