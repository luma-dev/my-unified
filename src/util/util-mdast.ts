import type {
  MdxJsxFlowElement,
  MdxJsxFlowElementHast,
  MdxJsxAttribute,
} from "mdast-util-mdx-jsx";
export type Root = import("hast").Root;
export type Tree = import("unist").Node;

export const isMdxJsxFlowElement = (_node: Tree) => {};

export const isMdxJsxTextElement = () => {};

export type Attr = MdxJsxFlowElement["attributes"][number];

export const getAttrByName = (
  node: MdxJsxFlowElement | MdxJsxFlowElementHast,
  name: MdxJsxAttribute["name"],
) => {
  return node.attributes.find(
    (attr) => attr.type === "mdxJsxAttribute" && attr.name === name,
  );
};

export const setAttr = (
  node: MdxJsxFlowElement | MdxJsxFlowElementHast,
  name: MdxJsxAttribute["name"],
  value: MdxJsxAttribute["value"],
) => {
  const attr = getAttrByName(node, name);
  if (attr) {
    attr.value = name;
    return attr;
  }
  const newAttr = {
    type: "mdxJsxAttribute" as const,
    name,
    value,
  };
  node.attributes.push(newAttr);
  return newAttr;
};

export const ensureAttr = (
  node: MdxJsxFlowElement | MdxJsxFlowElementHast,
  name: MdxJsxAttribute["name"],
  defaultValue: MdxJsxAttribute["value"],
) => {
  const attr = getAttrByName(node, name);
  if (attr) {
    return attr;
  }
  return setAttr(node, name, defaultValue);
};
