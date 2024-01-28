import type { Program } from "estree";

export const estreeDeleteCtx = (varName: string): Program => {
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
                    type: "UnaryExpression",
                    operator: "delete",
                    prefix: true,
                    argument: {
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
