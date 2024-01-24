export type TocHeading = {
  readonly tag: string;
  readonly level: number;
  readonly depth: number;
  readonly index: number;
  readonly slug: string;
  readonly titleText: string;
  readonly children: Toc;
};
export type Toc = Array<TocHeading>;
