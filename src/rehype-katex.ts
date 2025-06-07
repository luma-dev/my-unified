import type {
  MdxJsxFlowElement,
  MdxJsxAttributeValueExpression,
} from "mdast-util-mdx-jsx";
import type { MdxFlowExpressionHast } from "mdast-util-mdx-expression";
import type { Expression } from "estree";
import {
  DELETE,
  REPLACE,
  STEP_OVER,
  visit,
} from "@luma-dev/unist-util-visit-fast";
import { toText } from "hast-util-to-text";
import { estreeDeclareSymbol } from "./util/rehype-katex/estree-declare-symbol.js";
import { estreeResetCtx } from "./util/rehype-katex/estree-ctx-reset.js";
import { estreeDeleteCtx } from "./util/rehype-katex/estree-ctx-delete.js";
import { estreePushCtx } from "./util/rehype-katex/estree-ctx-push.js";
import { estreeCtxValue } from "./util/rehype-katex/estree-ctx-value.js";
import type { Element } from "hast";
import { getClasses } from "./util/get-classes.js";
import { estreeJsonParseOf } from "./util/estree-json-parse-of.js";
import { Option } from "@luma-dev/option-ts";
import {
  KatexLumaMeta,
  KatexLumaMetaSave,
  parseMeta,
} from "./katex-ex/parse-meta.js";
import { getAttrByName } from "./util/util-mdast.js";

type MdxJsxAttributeValue =
  | string
  | MdxJsxAttributeValueExpression
  | null
  | undefined;

type Root = import("hast").Root;

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO
const expressionOfMdxJsxExpressionAttribute = (
  attr: MdxJsxAttributeValueExpression,
): Expression | null => {
  if (attr.data == null) return null;
  if (attr.data.estree == null) return null;
  if (attr.data.estree.body.length !== 1) return null;
  if (attr.data.estree.body[0].type !== "ExpressionStatement") return null;
  return attr.data.estree.body[0].expression;
};

export type RehypeKatexPluginParameters =
  | Readonly<{
      languageDetection?: string;
      dynamicSuffix?: () => string;
      context?: string;
    }>
  | undefined;
export type RehypeKatexPlugin = import("unified").Plugin<
  [RehypeKatexPluginParameters],
  Root
>;
const rehypeKatex: RehypeKatexPlugin = ({
  languageDetection = "math",
  dynamicSuffix = () => Math.random().toString(36).slice(2),
  context = "",
} = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO
  return async (tree, file) => {
    const dynamicKeyName = `_rehypeKatexContext${dynamicSuffix()}`;
    tree.children.unshift({
      type: "mdxFlowExpression",
      value: "",
      data: {
        estree: estreeResetCtx(dynamicKeyName),
      },
    });
    tree.children.push(
      {
        type: "mdxjsEsm",
        value: "",
        data: {
          estree: estreeDeclareSymbol(dynamicKeyName),
        },
      },
      {
        type: "mdxFlowExpression",
        value: "",
        data: {
          estree: estreeDeleteCtx(dynamicKeyName),
        },
      },
    );
    visit(tree, (node) => {
      const expressionOfMdxJsxExpressionAttributeOrReport = (
        attr: string | MdxJsxAttributeValueExpression | undefined | null,
      ) => {
        if (typeof attr === "string" || attr == null) {
          return { ok: true as const, content: attr };
        } else {
          const expression = expressionOfMdxJsxExpressionAttribute(attr);
          if (expression == null) {
            file.message(
              `Unreachable? Structure of MdxJsxExpressionAttribute is not expected`,
              node,
            );
            return { ok: false };
          }
          return { ok: true, content: expression };
        }
      };

      const metaOfPreCode = (codeEl: Element): Option<string> => {
        if (codeEl.data == null) return Option.none();
        if (!("meta" in codeEl.data) || typeof codeEl.data.meta !== "string")
          return Option.none();
        return Option.from(codeEl.data.meta);
      };

      const show = (content: MdxJsxAttributeValue, meta: KatexLumaMeta) => {
        return REPLACE(
          {
            type: "mdxJsxFlowElement",
            name: "LumaKatex",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "globalContext",
                value: {
                  type: "mdxJsxAttributeValueExpression",
                  value: "",
                  data: {
                    estree: estreeJsonParseOf(context),
                  },
                },
              },
              {
                type: "mdxJsxAttribute",
                name: "defContext",
                value: {
                  type: "mdxJsxAttributeValueExpression",
                  value: "",
                  data: {
                    estree: estreeCtxValue(dynamicKeyName),
                  },
                },
              },
              {
                type: "mdxJsxAttribute",
                name: "content",
                value: content,
              },
              {
                type: "mdxJsxAttribute",
                name: "meta",
                value: {
                  type: "mdxJsxAttributeValueExpression",
                  value: "",
                  data: {
                    estree: estreeJsonParseOf(meta),
                  },
                },
              },
            ],
            children: [],
          } satisfies MdxJsxFlowElement,
          STEP_OVER,
        );
      };
      const save = (content: MdxJsxAttributeValue, meta: KatexLumaMetaSave) => {
        return REPLACE(
          {
            type: "mdxJsxFlowElement",
            name: "Save",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "$" + meta.saveName,
              },
            ],
            children: [
              {
                type: "mdxJsxFlowElement",
                name: "LumaKatex",
                attributes: [
                  {
                    type: "mdxJsxAttribute",
                    name: "globalContext",
                    value: {
                      type: "mdxJsxAttributeValueExpression",
                      value: "",
                      data: {
                        estree: estreeJsonParseOf(context),
                      },
                    },
                  },
                  {
                    type: "mdxJsxAttribute",
                    name: "defContext",
                    value: {
                      type: "mdxJsxAttributeValueExpression",
                      value: "",
                      data: {
                        estree: estreeCtxValue(dynamicKeyName),
                      },
                    },
                  },
                  {
                    type: "mdxJsxAttribute",
                    name: "content",
                    value: content,
                  },
                  {
                    type: "mdxJsxAttribute",
                    name: "meta",
                    value: {
                      type: "mdxJsxAttributeValueExpression",
                      value: "",
                      data: {
                        estree: estreeJsonParseOf(meta),
                      },
                    },
                  },
                ],
                children: [],
              },
            ],
          } satisfies MdxJsxFlowElement,
          STEP_OVER,
        );
      };
      const def = (expressionLike: string | null | Expression) => {
        const expression = ((): Expression => {
          if (typeof expressionLike === "string" || expressionLike === null) {
            return {
              type: "Literal",
              value: expressionLike,
            };
          }
          return expressionLike;
        })();
        return REPLACE(
          {
            type: "mdxFlowExpression",
            value: "",
            data: {
              estree: estreePushCtx(dynamicKeyName, expression),
            },
          } satisfies MdxFlowExpressionHast,
          STEP_OVER,
        );
      };
      const reset = () => {
        return REPLACE(
          {
            type: "mdxFlowExpression",
            value: "",
            data: {
              estree: estreeResetCtx(dynamicKeyName),
            },
          } satisfies MdxFlowExpressionHast,
          STEP_OVER,
        );
      };

      if (
        node.type === "element" &&
        node.tagName === "pre" &&
        node.children?.length === 1 &&
        node.children[0]?.type === "element" &&
        node.children[0].tagName === "code"
      ) {
        const codeEl = node.children[0];
        const codeTextEl = codeEl.children[0];
        const content =
          codeTextEl.type === "text"
            ? codeTextEl.value
            : toText(codeTextEl, { whitespace: "nowrap" });
        const classes = getClasses(codeEl);
        const languageClassPrefix = `language-${languageDetection}`;
        if (!classes.includes(languageClassPrefix)) return;
        const meta = parseMeta(metaOfPreCode(codeEl).unwrapOr(""));
        switch (meta.category) {
          case "show":
            return show(content, meta);
          case "def":
            return def(content);
          case "save":
            return save(content, meta);
          default:
            return STEP_OVER;
        }
      }

      if (
        node.type === "element" &&
        node.tagName === "code" &&
        node.children?.length === 1
      ) {
        // $a+b$ のようなインラインスタイルの場合
        const classes = getClasses(node);
        const child = node.children[0];
        if (child.type !== "text") return;
        if (!classes.includes("language-math")) return;
        if (!classes.includes("math-inline")) return;

        const content = child.value;
        return show(content, {
          category: "show",
          block: false,
          display: false,
          subCategory: "normal",
        });
      }
      // TODO: これなんだっけ、Jupyterだっけ？
      // if (node.type === "element") {
      //   const classes = getClasses(node);
      //   const inline = classes.includes("math-inline");
      //   const displayMode = classes.includes("math-display");
      //   const content = toText(node, { whitespace: "pre" });
      //   if (!inline && !displayMode) return;
      //   return show(content, inline ? "math inline" : "math block");
      // }
      if (node.type === "mdxJsxFlowElement") {
        switch (node.name) {
          case "KatexReset": {
            return reset();
          }
          // TODO: このへん必要なのだっけ。
          case "KatexDef": {
            const attr = getAttrByName(node, "_");
            if (attr == null) {
              file.message(`KatexDef must have _ attribute`, node);
              return STEP_OVER;
            }
            if (attr.type !== "mdxJsxAttribute") {
              file.message(
                `Unreachable? KatexDef attribute _ is not mdxJsxAttribute`,
                node,
              );
              return STEP_OVER;
            }
            const maybe = expressionOfMdxJsxExpressionAttributeOrReport(
              attr.value,
            );
            if (!maybe.ok) {
              return DELETE;
            }
            return def(maybe.content ?? null);
          }
          // case "Katex": {
          //   const attr = getAttrByName(node, "_");
          //   if (attr == null) return DELETE;
          //   if (attr.type !== "mdxJsxAttribute") return DELETE;
          //   const metaAttr = (() => {
          //     const attr = getAttrByName(node, "meta");
          //     if (attr == null) return null;
          //     if (attr.type !== "mdxJsxAttribute") return null;
          //     return attr.value;
          //   })();
          //   return show(attr.value, metaAttr);
          // }
          default:
            return;
        }
      }
    });
  };
};

export default rehypeKatex;
