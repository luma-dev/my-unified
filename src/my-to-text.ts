import { toText } from "hast-util-to-text";
import { REPLACE, STEP_OVER, visit } from "@luma-dev/unist-util-visit-fast";
import { lumaTermAttributes } from "./luma-term/constants.js";
import { getAttrByName } from "./util/util-mdast.js";
import { Text } from "hast";

export const myToText = (
  node: Parameters<typeof toText>[0],
  options?: Parameters<typeof toText>[1],
) => {
  const copied = structuredClone(node);
  visit(copied, (node) => {
    if (node.type === "mdxJsxFlowElement" && node.name === "LumaTerm") {
      const rawAttr = getAttrByName(node, lumaTermAttributes.rawTermRef);
      if (rawAttr?.type !== "mdxJsxAttribute") return STEP_OVER;
      if (typeof rawAttr.value !== "string") return STEP_OVER;
      return REPLACE(
        {
          type: "text",
          value: rawAttr.value,
        } satisfies Text,
        STEP_OVER,
      );
    }
  });
  return toText(copied, options);
};
