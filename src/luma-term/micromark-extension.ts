import type { Extension, Construct, State } from "micromark-util-types";

const lumaTermConstruct: Construct = {
  name: "luma:term",
  tokenize(effects, ok, nok) {
    const start: State = (code) => {
      effects.enter("luma:term");
      effects.enter("luma:term:marker");
      effects.consume(code);
      return waitMarker;
    };
    const waitMarker: State = (code) => {
      if (code !== /* '@' */ 64) {
        return nok(code);
      }
      effects.consume(code);
      effects.exit("luma:term:marker");
      effects.enter("luma:term:name");
      return inside0;
    };
    const inside0: State = (code) => {
      if (code === /* ']' */ 93) {
        effects.exit("luma:term:name");
        effects.enter("luma:term:marker");
        effects.consume(code);
        effects.exit("luma:term:marker");
        effects.exit("luma:term");
        return ok(code);
      }
      effects.enter("chunkString", { contentType: "string" });
      return inside(code);
    };
    const inside: State = (code) => {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        return nok(code);
      }
      if (code === /* ']' */ 93) {
        effects.exit("chunkString");
        effects.exit("luma:term:name");
        effects.enter("luma:term:marker");
        effects.consume(code);
        effects.exit("luma:term:marker");
        effects.exit("luma:term");
        return ok;
      }
      effects.consume(code);
      return inside;
    };
    return start;
  },
};

export const lumaTerm: Extension = {
  text: {
    /* '[' */ 91: lumaTermConstruct,
  },
};
