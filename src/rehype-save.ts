import { lumaSave } from "./luma-save/micromark-extension.js";
import type {
  MdxJsxFlowElement,
  MdxJsxFlowElementHast,
} from "mdast-util-mdx-jsx";
import { lumaSaveFromMarkdown } from "./luma-save/from-markdown-extension.js";
import {
  DELETE,
  REPLACE,
  STEP_OVER,
  visit,
} from "@luma-dev/unist-util-visit-fast";
import { estreeJsonParseOf } from "./util/estree-json-parse-of.js";

type Root = import("hast").Root;

const nameOfSave = (node: MdxJsxFlowElementHast) => {
  for (const attr of node.attributes) {
    if (attr.type === "mdxJsxAttribute" && attr.name.startsWith("$")) {
      return attr.name.slice(1);
    }
  }
  return null;
};

export type RehypeSavePlugin = import("unified").Plugin<[], Root>;
const rehypeSave: RehypeSavePlugin = function () {
  const data: any = this.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);

  micromarkExtensions.push(lumaSave);
  fromMarkdownExtensions.push(lumaSaveFromMarkdown);

  return (tree) => {
    const saved: Map<string, any> = new Map();
    visit(tree, (node) => {
      if (node.type === "mdxJsxFlowElement" && node.name === "Save") {
        node.attributes.find(
          (e) => e.type === "mdxJsxAttribute" && e.name.startsWith("a"),
        );
        const name = nameOfSave(node) ?? "";
        saved.set(name, node.children);
        return DELETE;
      }
      if (
        node.type === "mdxJsxFlowElement" &&
        node.name === "_luma_internal_load"
      ) {
        const name = node._luma_internal_load ?? "";
        const cache = saved.get(name);
        const found = cache != null;
        return REPLACE(
          {
            type: "mdxJsxFlowElement",
            name: "LumaLoaded",
            children: cache ?? [],
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "byName",
                value: {
                  type: "mdxJsxAttributeValueExpression",
                  value: "",
                  data: {
                    estree: estreeJsonParseOf(name),
                  },
                },
              },
              {
                type: "mdxJsxAttribute",
                name: "found",
                value: {
                  type: "mdxJsxAttributeValueExpression",
                  value: "",
                  data: {
                    estree: estreeJsonParseOf(found),
                  },
                },
              },
            ],
          } satisfies MdxJsxFlowElement,
          STEP_OVER,
        );
      }
    });
  };
};

export default rehypeSave;
