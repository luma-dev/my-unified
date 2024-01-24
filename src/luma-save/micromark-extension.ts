import type { Extension, Construct, State } from "micromark-util-types";

const lumaSaveConstruct: Construct = {
  name: "luma:save",
  tokenize(effects, ok, nok) {
    const start: State = (code) => {
      effects.enter("luma:save:load");
      effects.enter("luma:save:load:marker");
      effects.consume(code);
      return waitMarker;
    };
    const waitMarker: State = (code) => {
      if (code !== /* '$' */ 36) {
        return nok(code);
      }
      effects.consume(code);
      effects.exit("luma:save:load:marker");
      effects.enter("luma:save:load:name");
      return inside0;
    };
    const inside0: State = (code) => {
      if (code === /* ']' */ 93) {
        effects.exit("luma:save:load:name");
        effects.enter("luma:save:load:marker");
        effects.consume(code);
        effects.exit("luma:save:load:marker");
        effects.exit("luma:save:load");
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
        effects.exit("luma:save:load:name");
        effects.enter("luma:save:load:marker");
        effects.consume(code);
        effects.exit("luma:save:load:marker");
        effects.exit("luma:save:load");
        return ok;
      }
      effects.consume(code);
      return inside;
    };
    return start;
  },
};

export const lumaSave: Extension = {
  text: {
    /* '[' */ 91: lumaSaveConstruct,
  },
};
