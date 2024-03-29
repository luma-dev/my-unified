import { replaceJapanesePunctuation } from "./lib/replace-japanese-punctuation.js";
import { visit, STEP_OVER } from "@luma-dev/unist-util-visit-fast";

type Root = import("hast").Root;

export type RehypeReplaceTextPlugin = import("unified").Plugin<[], Root>;
const rehypeReplaceText: RehypeReplaceTextPlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "element") return;
      if (
        node.tagName === "pre" ||
        node.tagName === "code" ||
        node.tagName === "blockquote"
      )
        return STEP_OVER;

      for (const child of node.children) {
        if (child.type !== "text") continue;
        if (typeof child.value !== "string") continue;
        child.value = replaceJapanesePunctuation(child.value);
      }

      return STEP_OVER;
    });
  };
};

export default rehypeReplaceText;
