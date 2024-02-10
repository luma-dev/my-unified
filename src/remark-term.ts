import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

import { lumaTerm } from "./luma-term/micromark-extension.js";
import { lumaTermFromMarkdown } from "./luma-term/from-markdown-extension.js";
import { getMdastMeta } from "./util/util-mdast-meta.js";
import { mapIntersection } from "./lib/map-util.js";
import { setAttr, getAttrByName } from "./util/util-mdast.js";
import { lumaTermAttributes } from "./luma-term/constants.js";
import { STEP_OVER, visit } from "@luma-dev/unist-util-visit-fast";
import { estreeJsonParseOf } from "./util/estree-json-parse-of.js";

type Root = import("mdast").Root;

export type RemarkTermPlugin = import("unified").Plugin<[], Root>;
const remarkTerm: RemarkTermPlugin = function () {
  const data: any = this.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  // const toMarkdownExtensions =
  //   data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  micromarkExtensions.push(lumaTerm);
  fromMarkdownExtensions.push(lumaTermFromMarkdown);
  // toMarkdownExtensions.push(...)

  return (tree, file) => {
    const meta = getMdastMeta(tree);
    const defMapImpFlow = new Map<string, string>(
      Object.entries(meta?.DefMapImp ?? {}),
    );
    const defMapExpFlow = new Map<string, string>(
      Object.entries(meta?.DefMapExp ?? {}),
    );
    const dupKeys = mapIntersection(defMapImpFlow, defMapExpFlow);
    if (dupKeys.size > 0) {
      console.warn(
        `DefMapImp and DefMapExp have same keys: ${[...dupKeys.keys()].toString()}`,
      );
    }
    const nodes = new Map<string, MdxJsxFlowElement[]>();
    visit(tree, (node) => {
      if (!(node.type === "mdxJsxFlowElement")) return;
      switch (node.name) {
        case "LumaTerm": {
          const rawAttr = getAttrByName(node, lumaTermAttributes.rawTermRef);
          if (
            rawAttr == null ||
            rawAttr.type !== "mdxJsxAttribute" ||
            typeof rawAttr.value !== "string"
          ) {
            file.message(
              `Attribute ${lumaTermAttributes.rawTermRef} is required`,
              node,
            );
            return STEP_OVER;
          }
          const rawAttrValue = rawAttr.value;
          const imp = defMapImpFlow.get(rawAttrValue);
          const exp = defMapExpFlow.get(rawAttrValue);
          let resolved: string;
          if (imp != null) {
            resolved = imp;
            setAttr(node, lumaTermAttributes.termRef, imp);
            setAttr(node, lumaTermAttributes.gotBy, "imp");
          } else if (exp != null) {
            resolved = exp;
            setAttr(node, lumaTermAttributes.termRef, exp);
            setAttr(node, lumaTermAttributes.gotBy, "exp");
          } else {
            resolved = rawAttrValue;
            setAttr(node, lumaTermAttributes.termRef, rawAttrValue);
            setAttr(node, lumaTermAttributes.gotBy, "raw");
          }
          let arr = nodes.get(resolved);
          if (arr == null) {
            arr = [];
            nodes.set(resolved, arr);
          }
          arr.push(node);
          break;
        }
        case "DefMapImp": {
          for (const attr of node.attributes) {
            if (attr.type !== "mdxJsxAttribute") {
              file.message(
                `DefMapImp: unsupported attribute type: ${attr.type}`,
                node,
              );
              continue;
            }
            if (typeof attr.value !== "string") {
              file.message(
                `DefMapImp: unsupported attribute value type: name=${attr.name}`,
                node,
              );
              continue;
            }
            defMapImpFlow.set(attr.name, attr.value);
            defMapExpFlow.delete(attr.name);
          }
          break;
        }
        case "DefMapExp": {
          for (const attr of node.attributes) {
            if (attr.type !== "mdxJsxAttribute") {
              file.message(
                `DefMapExp: unsupported attribute type: ${attr.type}`,
                node,
              );
              continue;
            }
            if (typeof attr.value !== "string") {
              file.message(
                `DefMapExp: unsupported attribute value type: name=${attr.name}`,
                node,
              );
              continue;
            }
            defMapExpFlow.set(attr.name, attr.value);
            defMapImpFlow.delete(attr.name);
          }
          break;
        }
      }
    });
    for (const arr of nodes.values()) {
      for (let i = 0; i < arr.length; i++) {
        const node = arr[i];
        setAttr(node, lumaTermAttributes.indexInPage, {
          type: "mdxJsxAttributeValueExpression",
          value: "",
          data: {
            estree: estreeJsonParseOf(i),
          },
        });
        setAttr(node, lumaTermAttributes.totalInPage, {
          type: "mdxJsxAttributeValueExpression",
          value: "",
          data: {
            estree: estreeJsonParseOf(arr.length),
          },
        });
      }
    }
  };
};

export default remarkTerm;
