import { compile } from "@mdx-js/mdx";
import * as prettier from "prettier";
import * as fs from "node:fs/promises";
import * as path from "node:path";

import remarkFrontmatter from "remark-frontmatter";

import rehypeAddSlug from "../src/rehype-add-slug";
import rehypeReplaceText from "../src/rehype-replace-text";
import rehypeKatex from "../src/rehype-katex";
import rehypeWrap from "../src/rehype-wrap";
import rehypeCounter from "../src/rehype-counter";
import rehypeCleanInternal from "../src/rehype-clean-internal";
// import rehypeDebug from "../src/rehype-debug";
// import remarkDebug from "../src/remark-debug";
import remarkTerm from "../src/remark-term";
import remarkMeta from "../src/remark-meta";
import rehypeSave from "../src/rehype-save";
import remarkMath from "remark-math";

import * as prompt from "prompt";

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
