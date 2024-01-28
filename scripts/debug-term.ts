import { fromMarkdown } from "mdast-util-from-markdown";
import { inspect } from "node:util";
import { lumaTerm } from "../src/luma-term/micromark-extension.js";
import { lumaTermFromMarkdown } from "../src/luma-term/from-markdown-extension.js";

const buf = `
# Hello
[this is a link](https://example.com).
[@foo] bar
`;

const tree = fromMarkdown(buf, {
  extensions: [lumaTerm],
  mdastExtensions: [lumaTermFromMarkdown],
});

console.log(inspect(tree, false, 12, true));
