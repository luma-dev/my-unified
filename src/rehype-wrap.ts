import { EXIT, visit } from "@luma-dev/unist-util-visit-fast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { getAttrByName } from "./util/util-mdast.js";
import { estreeJsonParseOf } from "./util/estree-json-parse-of.js";

type Root = import("hast").Root;

export interface MathTransformStep {
  formula: string;
  prefix: string;
  description?: string;
  descIsText?: boolean;
}

export interface MathTransform {
  first: string;
  steps: MathTransformStep[];
}

export type RehypeWrapPlugin = import("unified").Plugin<[], Root>;
const rehypeWrap: RehypeWrapPlugin = () => {
  return async (tree, file) => {
    const children = tree.children;
    const { cwd: _cwd, ...fileInfo } = file;
    const attributes: MdxJsxFlowElement["attributes"] = [
      {
        type: "mdxJsxAttribute",
        name: "file",
        value: {
          type: "mdxJsxAttributeValueExpression",
          value: "",
          data: {
            estree: estreeJsonParseOf(fileInfo),
          },
        },
      },
    ];

    visit(tree, (node) => {
      if (
        node.type === "mdxJsxFlowElement" &&
        node.name === "_luma_internal_meta"
      ) {
        const attr = getAttrByName(node, "meta");
        if (attr != null) {
          attributes.push(attr);
        }
        return EXIT;
      }
    });

    visit(tree, (node) => {
      if (node.type === "mdxJsxFlowElement" && node.name === "LumaToc") {
        const attr = getAttrByName(node, "toc");
        if (attr != null) {
          attributes.push(attr);
        }
        return EXIT;
      }
    });

    tree.children = [
      {
        type: "mdxJsxFlowElement",
        name: "LumaMdxLayout",
        attributes,
        children: children as any,
      },
    ];
  };
};

export default rehypeWrap;
