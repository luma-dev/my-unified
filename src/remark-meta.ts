import { getMdastMeta } from "./util/util-mdast-meta.js";
import { estreeJsonParseOf } from "./util/estree-json-parse-of.js";

type Root = import("mdast").Root;

export type RemarkMetaPlugin = import("unified").Plugin<[], Root>;
const remarkMeta: RemarkMetaPlugin = function () {
  return (tree) => {
    const meta = getMdastMeta(tree);
    tree.children.unshift({
      type: "mdxJsxFlowElement",
      children: [],
      name: "_luma_internal_meta",
      attributes: [
        {
          name: "meta",
          type: "mdxJsxAttribute",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: "",
            data: {
              estree: estreeJsonParseOf(meta ?? null),
            },
          },
        },
      ],
    });
  };
};

export default remarkMeta;
