import { MdxJsxFlowElementHast } from "mdast-util-mdx-jsx";
import { visit } from "./util/visit";
import { getAttrByName } from "./util/util-mdast";
import { estreeJsonParseOf } from "./util/estree-json-parse-of";
import { lumaCounter } from "./luma-counter/micromark-extension";
import { lumaCounterFromMarkdown } from "./luma-counter/from-markdown-extension";

type Root = import("hast").Root;

export type RehypeCounterPlugin = import("unified").Plugin<[], Root>;

const f = (node: MdxJsxFlowElementHast) => {
  for (const attr of node.attributes) {
    if (
      attr.type === "mdxJsxAttribute" &&
      attr.name.startsWith("$") &&
      !/\d/.test(attr.name[1] ?? "")
    ) {
      return attr.name.slice(1);
    }
  }
  return null;
};

const rehypeCounter: RehypeCounterPlugin = function () {
  const data: any = this.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);

  micromarkExtensions.push(lumaCounter);
  fromMarkdownExtensions.push(lumaCounterFromMarkdown);

  return (tree, _file) => {
    const map = new Map<string, any>();
    const count = new Map<string, number>();
    const nodes = new Map<string, MdxJsxFlowElementHast[]>();

    const resetCounterOn = (
      name: string,
      arr: readonly MdxJsxFlowElementHast[],
    ) => {
      for (const node of arr) {
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "total",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: "",
            data: {
              estree: estreeJsonParseOf(count.get(name)!),
            },
          },
        });
      }
    };
    const resetCounter = (name: string) => {
      resetCounterOn(name, nodes.get(name) ?? []);
      nodes.set(name, []);
    };

    visit(tree, (node) => {
      if (node.type === "mdxJsxFlowElement" && node.name === "C") {
        const name = f(node) ?? "";
        const keep = getAttrByName(node, "keep") != null;
        map.set(name, node.attributes);
        if (!keep) {
          resetCounter(name);
          count.set(name, 0);
        }
      } else if (
        node.type === "mdxJsxFlowElement" &&
        node.name === "_luma_internal_counter"
      ) {
        const name = node._luma_internal_counter ?? "";
        const c = count.get(name) ?? 0;
        node.name = "LumaCounter";
        count.set(name, c + 1);
        node.attributes.push(...map.get(name), {
          type: "mdxJsxAttribute",
          name: "index",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: "",
            data: {
              estree: estreeJsonParseOf(c),
            },
          },
        });
        let arr = nodes.get(name);
        if (arr == null) {
          arr = [];
          nodes.set(name, arr);
        }
        arr.push(node);
      }
    });

    for (const [name, arr] of nodes.entries()) {
      resetCounterOn(name, arr);
    }
  };
};

export default rehypeCounter;
