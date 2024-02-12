import { visit } from "@luma-dev/unist-util-visit-fast";
import type { Element, ElementContent, Properties } from "hast";
import { MdxJsxAttribute } from "mdast-util-mdx-jsx";
import { estreeJsonParseOf } from "./estree-json-parse-of.js";
import { deleteAttr, setAttr } from "./util-mdast.js";

export const addAttrForAll = (
  node: Element | ElementContent,
  name: MdxJsxAttribute["name"],
  value: Properties[string],
) => {
  visit(node, (node) => {
    if (node.type === "element") {
      node.properties[name] = value;
    } else if (
      node.type === "mdxJsxFlowElement" ||
      node.type === "mdxJsxTextElement"
    ) {
      if (value === undefined) {
        deleteAttr(node, name);
      } else {
        setAttr(node, name, {
          type: "mdxJsxAttributeValueExpression",
          value: "",
          data: {
            estree: estreeJsonParseOf(value),
          },
        });
      }
    }
  });
};
