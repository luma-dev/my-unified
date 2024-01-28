import { compile } from "@mdx-js/mdx";
import * as prettier from "prettier";
import * as fs from "node:fs/promises";
import * as path from "node:path";

import remarkFrontmatter from "remark-frontmatter";

import rehypeAddSlug from "../src/rehype-add-slug.js";
import rehypeReplaceText from "../src/rehype-replace-text.js";
import rehypeKatex from "../src/rehype-katex.js";
import rehypeWrap from "../src/rehype-wrap.js";
import rehypeCounter from "../src/rehype-counter.js";
import rehypeCleanInternal from "../src/rehype-clean-internal.js";
// import rehypeDebug from "../src/rehype-debug";
// import remarkDebug from "../src/remark-debug";
import remarkTerm from "../src/remark-term.js";
import remarkMeta from "../src/remark-meta.js";
import rehypeSave from "../src/rehype-save.js";
import remarkMath from "remark-math";

import prompt from "prompt";

const projectRoot = path.resolve(__dirname, "..");
const exampleDir = path.resolve(projectRoot, "examples/render/input");
const exampleOutDir = path.resolve(projectRoot, "examples/render/output");

const main = async () => {
  if (process.env.INSPECT === "true") {
    prompt.start();
    await prompt.get(["continue?"]);
  }
  const pat = process.argv[2];
  const patMatch = (f: string) => {
    if (!pat) return true;
    return f.includes(pat);
  };
  const files = await fs.readdir(exampleDir);
  await Promise.all(
    files.map(async (file) => {
      if (!patMatch(file)) {
        console.log(`Skip ${file}`);
        return;
      }
      const inputPath = path.resolve(exampleDir, file);
      if (path.extname(file) !== ".mdx") return;
      const outputJsPath = path.resolve(
        exampleOutDir,
        path.basename(file) + ".js",
      );
      const mdxContent = await fs.readFile(inputPath, {
        encoding: "utf-8",
      });
      const compiled = await compile(mdxContent, {
        rehypePlugins: [
          // rehypeDebug,
          rehypeReplaceText,
          [rehypeKatex, { dynamicSuffix: () => "0" }],
          rehypeSave,
          rehypeCounter,

          rehypeAddSlug,
          rehypeWrap,

          rehypeCleanInternal,
        ],
        remarkPlugins: [
          // remarkDebug,
          remarkFrontmatter,
          remarkMath,
          remarkTerm,
          remarkMeta,
        ],
      });
      if (typeof compiled.value !== "string")
        throw new Error("Unexpected value");
      const formatted = await prettier.format(compiled.value, {
        parser: "babel",
      });
      await fs.mkdir(exampleOutDir, { recursive: true });
      await fs.writeFile(outputJsPath, formatted);
    }),
  );
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
