import { toText } from "hast-util-to-text";
import { toSlug } from "./lib/to-slug";
import { STEP_OVER, visit } from "./util/visit";
import { estreeJsonParseOf } from "./util/estree-json-parse-of";
import { Toc, TocHeading } from "./types";
import type { ElementContent } from "hast";

type Root = import("hast").Root;

export type RehypeAddSlugPlugin = import("unified").Plugin<[], Root>;
const rehypeAddSlug: RehypeAddSlugPlugin = () => {
  return (tree) => {
    const toc: Toc = [];
    const tocStack = [{ arr: toc, lv: 0 }];
    const headerComponents: ElementContent[][] = [];

    let lastH1Slug: string | null = null;
    let lastH2Slug: string | null = null;
    let lastH3Slug: string | null = null;
    let lastH4Slug: string | null = null;
    let lastH5Slug: string | null = null;

    visit(tree, (node) => {
      if (node.type !== "element") return;
      if (
        !(
          node.tagName === "h1" ||
          node.tagName === "h2" ||
          node.tagName === "h3" ||
          node.tagName === "h4" ||
          node.tagName === "h5" ||
          node.tagName === "h6"
        )
      )
        return;
      const text = toText(node).trim();
      const slug = toSlug(text);

      // id 設定
      node.properties = {
        ...node.properties,
        slug,
        lastH1Slug,
        lastH2Slug,
        lastH3Slug,
        lastH4Slug,
        lastH5Slug,
      };

      let lv: number;
      switch (node.tagName) {
        case "h1":
          lv = 1;
          lastH1Slug = slug;
          lastH2Slug = null;
          lastH3Slug = null;
          lastH4Slug = null;
          lastH5Slug = null;
          break;
        case "h2":
          lv = 2;
          lastH2Slug = slug;
          lastH3Slug = null;
          lastH4Slug = null;
          lastH5Slug = null;
          break;
        case "h3":
          lv = 3;
          lastH3Slug = slug;
          lastH4Slug = null;
          lastH5Slug = null;
          break;
        case "h4":
          lv = 4;
          lastH4Slug = slug;
          lastH5Slug = null;
          break;
        case "h5":
          lv = 5;
          lastH5Slug = slug;
          break;
        case "h6":
          lv = 6;
          break;
      }

      while (tocStack[tocStack.length - 1].lv >= lv) {
        tocStack.pop();
      }
      const c: TocHeading = {
        tag: node.tagName,
        index: headerComponents.length,
        depth: tocStack.length,
        titleText: text,
        level: lv,
        slug,
        children: [],
      };
      headerComponents.push(node.children);
      tocStack[tocStack.length - 1].arr.push(c);
      tocStack.push({ arr: c.children, lv });

      return STEP_OVER;
    });

    tree.children.unshift({
      type: "mdxJsxFlowElement",
      children: headerComponents.map((e) => ({
        type: "mdxJsxTextElement",
        name: null,
        attributes: [],
        children: e,
      })),
      name: "LumaToc",
      attributes: [
        {
          name: "toc",
          type: "mdxJsxAttribute",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: "",
            data: {
              estree: estreeJsonParseOf(toc),
            },
          },
        },
      ],
    });
  };
};

export default rehypeAddSlug;
