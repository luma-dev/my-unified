import type { Extension as FromMarkdownExtension } from "mdast-util-from-markdown";

export const lumaCounterFromMarkdown: FromMarkdownExtension = {
  enter: {
    "luma:counter:name"(token) {
      this.enter(
        {
          type: "mdxJsxFlowElement",
          name: "_luma_internal_counter",
          attributes: [],
          children: [],
          _luma_internal_counter: "",
        },
        token,
      );
      this.buffer();
    },
  },
  exit: {
    "luma:counter:name"(token) {
      const data = this.resume();
      const node = this.stack[this.stack.length - 1];
      if (node.type !== "mdxJsxFlowElement")
        throw new Error(
          `UNREACHABLE: expected node.type === 'mdxJsxFlowElement'`,
        );
      node._luma_internal_counter = data;
      this.exit(token);
    },
  },
};
