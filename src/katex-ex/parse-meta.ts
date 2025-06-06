export type KatexLumaMetaDef = {
  readonly category: "def";
};
export type KatexLumaMetaSave = {
  readonly category: "save";
  readonly saveName: string;
  readonly saved: KatexLumaMetaShow;
};
export type KatexLumaMetaShow = {
  readonly category: "show";
  readonly display: boolean;
  readonly block: boolean;
  readonly subCategory: "normal" | "transform1" | "transform2";
};
export type KatexLumaMeta =
  | KatexLumaMetaDef
  | KatexLumaMetaSave
  | KatexLumaMetaShow;

export const parseMeta = (meta: string): KatexLumaMeta => {
  const parts = meta.trim().split(/\s+/);

  let subCategory: "normal" | "transform1" | "transform2" = "normal";
  let saveName: string | null = null;
  let display = true;
  let block = true;

  for (const part of parts) {
    if (part === "inline") {
      display = false;
      block = false;
    } else if (part === "display") {
      display = true;
    } else if (part === "block") {
      block = true;
    } else if (part === "trans1" || part === "transform1") {
      subCategory = "transform1";
    } else if (part === "trans2" || part === "transform2") {
      subCategory = "transform2";
    } else if (part === "def") {
      return { category: "def" };
    } else if (part.startsWith("$")) {
      saveName = part.slice(1);
    }
  }

  const showMeta: KatexLumaMetaShow = {
    category: "show",
    display,
    block,
    subCategory,
  };

  if (saveName !== null) {
    return {
      category: "save",
      saveName,
      saved: showMeta,
    };
  }

  return showMeta;
};
