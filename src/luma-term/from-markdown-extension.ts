import { type Extension as FromMarkdownExtension } from "mdast-util-from-markdown";
import { lumaTermAttributes } from "./constants";

export const lumaTermFromMarkdown: FromMarkdownExtension = {
  enter: {
    "luma:term:name"(token) {
      this.enter(
        {
          type: "mdxJsxFlowElement",
          name: "LumaTerm",
          children: [],
          attributes: [],
        },
        token,
      );
      this.buffer();
    },
  },
  exit: {
    "luma:term:name"(token) {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      if (node.type !== "mdxJsxFlowElement")
        throw new Error(
          `UNREACHABLE: expected node.type === 'mdxJsxFlowElement'`,
        );
      node.attributes.push({
        type: "mdxJsxAttribute",
        name: lumaTermAttributes.rawTermRef,
        value: data,
      });
      this.exit(token);
    },
  },
};
