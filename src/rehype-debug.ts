import { visit, STEP_OVER } from "@luma-dev/unist-util-visit-fast";
import { inspect } from "node:util";

type Root = import("hast").Root;

export type RehypeDebugPlugin = import("unified").Plugin<[], Root>;
const rehypeDebug: RehypeDebugPlugin = () => {
  return (tree) => {
    visit(tree, (element: any) => {
      console.log(inspect(element, { depth: 12, colors: true }));
      return STEP_OVER;
    });
  };
};

export default rehypeDebug;
