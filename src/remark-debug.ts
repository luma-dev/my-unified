import { visit, STEP_OVER } from "./util/visit.js";
import { inspect } from "node:util";

type Root = import("mdast").Root;

export type RemarkDebugPlugin = import("unified").Plugin<[], Root>;
const remarkDebug: RemarkDebugPlugin = () => {
  return (tree) => {
    visit(tree, (element: any) => {
      console.log(inspect(element, { depth: 12, colors: true }));
      return STEP_OVER;
    });
  };
};

export default remarkDebug;
