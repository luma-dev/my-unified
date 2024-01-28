import { visit, STEP_OVER } from "./visit.js";
import type { Node } from "unist";
import * as YAML from "yaml";

import { z } from "zod";

const zMeta = z
  .object({
    created: z.string().optional().catch(undefined),
    history: z.array(z.string()).optional().catch(undefined),
    publish: z.boolean().optional().catch(undefined),
    DefMapExp: z.record(z.string()).nullish().catch(undefined),
    DefMapImp: z.record(z.string()).nullish().catch(undefined),
  })
  .nullish()
  .catch(undefined);

const cacheKey = "cachedYaml" as const;

export const getMdastMeta = (tree: Node) => {
  let res: unknown = null;
  visit(tree, (element: any) => {
    if (element.type !== "yaml") return;
    if (cacheKey in element) res = element[cacheKey];
    if (!("value" in element)) return;
    if (typeof element.value !== "string") return;
    res = YAML.parse(element.value);
    element[cacheKey] = res;
    return STEP_OVER;
  });
  return zMeta.parse(res);
};
