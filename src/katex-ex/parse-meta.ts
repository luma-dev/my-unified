type KatexLumaMetaDef = {
  readonly category: "def";
};
type KatexLumaMetaSave = {
  readonly category: "save";
  readonly saveName: string;
};
type KatexLumaMeta = KatexLumaMetaDef | KatexLumaMetaSave;

export const parseMeta = (meta: string) => {};
