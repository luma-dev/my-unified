import { visit, STEP_OVER } from "@luma-dev/unist-util-visit-fast";

type Root = import("hast").Root;

export type RehypeCodeMetaPlugin = import("unified").Plugin<[], Root>;
const rehypeCodeMeta: RehypeCodeMetaPlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "element") return;
      if (node.tagName !== "code") return;
      if ("meta" in node.properties) return;
      node.properties.meta = (node.data as any)?.meta;
      return STEP_OVER;
    });
  };
};

export default rehypeCodeMeta;
