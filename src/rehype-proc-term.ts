import { visit, STEP_OVER } from "@luma-dev/unist-util-visit-fast";
import { ElementContent } from "hast";
import util from "node:util";

type Root = import("hast").Root;

export type TextPartText = {
  readonly type: "text";
  readonly text: string;
};
export type TextPartTerm = {
  readonly type: "term";
  readonly term: string;
  readonly text: string;
};
export type TextPart = TextPartText | TextPartTerm;
export type TextProcessed = readonly TextPart[];

export type TermProcessorProtocol = {
  readonly processText: (text: string) => TextProcessed;
};

export type RehypeProcTermPluginParams = {
  readonly termProcessor: TermProcessorProtocol;
};

export type RehypeProcTermPlugin = import("unified").Plugin<
  [RehypeProcTermPluginParams],
  Root
>;
const rehypeProcTerm: RehypeProcTermPlugin = ({ termProcessor }) => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "element") return;
      if (
        node.tagName === "pre" ||
        node.tagName === "code" ||
        node.tagName === "blockquote"
      )
        return STEP_OVER;

      const newChildren: ElementContent[] = [];
      for (const child of node.children) {
        if (child.type !== "text" || typeof child.value !== "string") {
          newChildren.push(child);
          continue;
        }
        const text = child.value;
        const processed = termProcessor.processText(text);
        for (const parsed of processed) {
          switch (parsed.type) {
            case "text":
              newChildren.push({
                type: "text",
                value: parsed.text,
              });
              break;
            case "term":
              // TODO
              newChildren.push({
                type: "mdxJsxFlowElement",
                name: "Term",
                attributes: [
                  { type: "mdxJsxAttribute", name: "text", value: parsed.text },
                  {
                    type: "mdxJsxAttribute",
                    name: "reference",
                    value: parsed.term,
                  },
                ],
                children: [],
              });
              break;
            default:
              throw new Error(
                `Invalid parsed: ${(parsed satisfies never as { type: 0 }).type}`
              );
          }
        }
      }

      node.children = newChildren;

      return STEP_OVER;
    });
  };
};

export default rehypeProcTerm;
