import { DELETE, visit } from "@luma-dev/unist-util-visit-fast";

type Root = import("hast").Root;

export type RehypeCleanInternalPlugin = import("unified").Plugin<[], Root>;
const rehypeCleanInternal: RehypeCleanInternalPlugin = () => {
  return async (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "mdxJsxFlowElement" &&
        node.name === "_luma_internal_meta"
      )
        return DELETE;
    });
  };
};

export default rehypeCleanInternal;
