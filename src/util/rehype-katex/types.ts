export type KatexDisplayMode = "inline" | "block-display" | "inline-display";

export type KatexRenderOptionDef = {
  readonly type: "def";
};
export type KatexRenderOptionReset = {
  readonly type: "reset";
};
export type KatexRenderOptionShow = {
  readonly type: "show";
  readonly options: string | null;
};
export type KatexRenderOption =
  | KatexRenderOptionDef
  | KatexRenderOptionReset
  | KatexRenderOptionShow;
