export type MathTransformStep = {
  readonly formula: string;
  readonly prefix: string;
  readonly description?: string;
  readonly descIsText?: boolean;
};

export type MathTransform = {
  readonly first: string;
  readonly steps: readonly MathTransformStep[];
};

export const parseMathTransform = (v: string): MathTransform => {
  const lines = v.split("\n");
  const spaces = Math.min(
    ...lines
      .filter((e) => !e.match(/^\s*$/))
      .map((e) => e.match(/^ */)![0].length)
  );
  const [first, ...rest] = lines
    .map((e) => e.slice(spaces))
    .join("\n")
    .split(/\n(?=[=~?\-<>$])/);

  const steps: MathTransformStep[] = [];

  for (const r of rest) {
    if (r.startsWith("=")) {
      const formula = r.slice(1).trim();
      steps.push({
        formula,
        prefix: "= ",
      });
    } else if (r.startsWith("~")) {
      const formula = r.slice(1).trim();
      steps.push({
        formula,
        prefix: "\\sim ",
      });
    } else if (r.startsWith("-")) {
      const formula = r.slice(1).trim();
      steps.push({
        formula,
        prefix: "\\iff ",
      });
    } else if (r.startsWith("<")) {
      const formula = r.slice(1).trim();
      steps.push({
        formula,
        prefix: "~~\\Longleftarrow ",
      });
    } else if (r.startsWith(">")) {
      const formula = r.slice(1).trim();
      steps.push({
        formula,
        prefix: "~~\\Longrightarrow ",
      });
    } else if (r.startsWith("$")) {
      const description = r.slice(1).trim();
      steps[steps.length - 1] = {
        ...steps[steps.length - 1],
        description,
      };
    } else if (r.startsWith("?")) {
      const description = r.slice(1).trim();
      steps[steps.length - 1] = {
        ...steps[steps.length - 1],
        description,
        descIsText: true,
      };
    }
  }

  return {
    first,
    steps,
  };
};

export const makeMathTransform2Column = (trans: MathTransform): string => {
  const main = Object.entries(trans.steps).map(
    ([i, { prefix, formula, description, descIsText }]) => {
      const d = description
        ? `\\left(${descIsText ? "\\text" : ""}{${description}}\\right)`
        : "";
      if (i === "0") {
        return `&${trans.first}&&${prefix}&&${formula}&&${d}\\\\`;
      }
      return `&&&${prefix}&&${formula}&&${d}\\\\`;
    }
  );

  const lines = ["\\begin{aligned}", ...main, "\\end{aligned}"];
  return lines.join("\n");
};
export const makeMathTransform1Column = (trans: MathTransform): string => {
  const main = Object.entries(trans.steps).map(
    ([_i, { prefix, formula, description, descIsText }]) => {
      const d = description
        ? `\\left(${descIsText ? "\\text" : ""}{${description}}\\right)`
        : "";
      return `&${prefix}&&${formula}&&${d}\\\\`;
    }
  );

  const lines = [
    "\\begin{aligned}",
    `&&&${trans.first}&&\\\\`,
    ...main,
    "\\end{aligned}",
  ];
  return lines.join("\n");
};
