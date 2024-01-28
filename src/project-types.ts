import "mdast-util-mdxjs-esm";
declare module "micromark-util-types" {
  interface TokenTypeMap {
    "luma:term": "luma:term";
    "luma:term:marker": "luma:term:marker";
    "luma:term:name": "luma:term:name";

    "luma:save:load": "luma:save:load";
    "luma:save:load:marker": "luma:save:load:marker";
    "luma:save:load:name": "luma:save:load:name";

    "luma:counter": "luma:counter";
    "luma:counter:marker": "luma:counter:marker";
    "luma:counter:name": "luma:counter:name";
  }
}

export {};
