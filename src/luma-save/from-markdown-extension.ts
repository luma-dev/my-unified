import { type Extension as FromMarkdownExtension } from "mdast-util-from-markdown";

export const lumaSaveFromMarkdown: FromMarkdownExtension = {
  enter: {
    "luma:save:load:name"(token) {
      this.enter(
        {
          type: "mdxJsxFlowElement",
          name: "_luma_internal_load",
          attributes: [],
          children: [],
          _luma_internal_load: "",
        },
        token,
      );
      this.buffer();
    },
  },
  exit: {
    "luma:save:load:name"(token) {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      if (node.type !== "mdxJsxFlowElement")
        throw new Error(
          `UNREACHABLE: expected node.type === 'mdxJsxFlowElement'`,
        );
      node._luma_internal_load = data;
      this.exit(token);
    },
  },
};
