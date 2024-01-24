import type { Program } from "@mdx-js/mdx/lib/core";

export const estreePushCtxConst = (varName: string, v: string): Program => {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "ArrowFunctionExpression",
            expression: false,
            generator: false,
            async: false,
            params: [],
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
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
                    right: {
                      type: "Literal",
                      value: v,
                      raw: JSON.stringify(v),
                    },
                  },
                },
              ],
            },
          },
          arguments: [],
          optional: false,
        },
      },
    ],
  };
};
