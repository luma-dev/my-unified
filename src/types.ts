import type { ReactNode } from "react";

export type TocHeading = {
  readonly tag: string;
  readonly level: number;
  readonly depth: number;
  readonly index: number;
  readonly slug: string;
  readonly titleText: string;
  readonly children: Toc;
};
export type Toc = ReadonlyArray<TocHeading>;
export interface LumaMdxLayoutPropsFile {
  data: unknown;
  history: string[];
  messages: unknown[];
  path?: string;
  value: string;
}
export interface LumaMdxLayoutProps {
  toc: Toc;
  file: LumaMdxLayoutPropsFile;
  meta: unknown;
  /** First element is LumaToc */
  children: [ReactNode, ...ReactNode[]];
}
export interface LumaTocProps {
  toc: Toc;
  children: ReactNode[];
}
export interface LumaKatexProps {
  content: string;
  options: string;
  defContext: string;
}
export interface LumaCounterProps {
  index: number;
  total: number;
}
export interface LumaLoadedProps {
  byName: string;
  found: boolean;
  children?: ReactNode;
}
export interface LumaTermProps {
  rawTermRef: string;
  termRef: string;
  gotBy: "imp" | "exp" | "raw";
  indexInPage: number;
  totalInPage: number;
}
