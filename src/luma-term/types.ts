import type { Literal } from "mdast";

export interface LumaTermTerm extends Literal {
  type: "lumaTermTerm";
}
declare module "mdast" {
  interface BlockContentMap {
    lumaTermTerm: LumaTermTerm;
  }

  interface RootContentMap {
    lumaTermTerm: LumaTermTerm;
  }
}
declare module "mdast-util-mdx-jsx" {
  interface MdxJsxFlowElement {
    _luma_internal_load?: string;
    _luma_internal_counter?: string;
  }
  interface MdxJsxFlowElementHast {
    _luma_internal_load?: string;
    _luma_internal_counter?: string;
  }
}
