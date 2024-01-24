import type { Extension, Construct, State } from "micromark-util-types";

const lumaCounterConstruct: Construct = {
  name: "luma:counter",
  tokenize(effects, ok, nok) {
    const start: State = (code) => {
      effects.enter("luma:counter");
      effects.enter("luma:counter:marker");
      effects.consume(code);
      return waitMarker;
    };
    const waitMarker: State = (code) => {
      if (code !== /* '#' */ 35) {
        return nok(code);
      }
      effects.consume(code);
      effects.exit("luma:counter:marker");
      effects.enter("luma:counter:name");
      return inside0;
    };
    const inside0: State = (code) => {
      if (code === /* ']' */ 93) {
        effects.exit("luma:counter:name");
        effects.enter("luma:counter:marker");
        effects.consume(code);
        effects.exit("luma:counter:marker");
        effects.exit("luma:counter");
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
        effects.exit("luma:counter:name");
        effects.enter("luma:counter:marker");
        effects.consume(code);
        effects.exit("luma:counter:marker");
        effects.exit("luma:counter");
        return ok;
      }
      effects.consume(code);
      return inside;
    };
    return start;
  },
};

export const lumaCounter: Extension = {
  text: {
    /* '[' */ 91: lumaCounterConstruct,
  },
};
