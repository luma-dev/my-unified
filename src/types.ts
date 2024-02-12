import type { PropsWithChildren, ReactNode } from "react";

export type PropsWithLumaMdx<T = unknown> = T & {
  readonly "luma:isInsideToc"?: boolean;
};
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
export interface LumaMdxLayoutPropsFile extends PropsWithLumaMdx {
  data: unknown;
  history: string[];
  messages: unknown[];
  path?: string;
  value: string;
}
export interface LumaMdxLayoutProps
  extends PropsWithChildren,
    PropsWithLumaMdx {
  toc: Toc;
  headers: ReactNode[];
  file: LumaMdxLayoutPropsFile;
  meta: unknown;
}
export interface LumaKatexProps extends PropsWithLumaMdx {
  content: string;
  options: string;
  defContext: string;
}
export interface LumaCounterProps extends PropsWithLumaMdx {
  index: number;
  total: number;
}
export interface LumaLoadedProps extends PropsWithChildren, PropsWithLumaMdx {
  byName: string;
  found: boolean;
}
export interface LumaTermProps extends PropsWithLumaMdx {
  rawTermRef: string;
  termRef: string;
  gotBy: "imp" | "exp" | "raw";
  indexInPage: number;
  totalInPage: number;
}
