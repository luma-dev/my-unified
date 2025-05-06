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
import rehypeCodeMeta from "../src/rehype-code-meta.js";
import rehypeProcTerm, {
  RehypeProcTermPluginParams,
  TextPart,
} from "../src/rehype-proc-term.js";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
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
          rehypeCodeMeta,

          rehypeAddSlug,
          rehypeWrap,
          [
            rehypeProcTerm,
            {
              termProcessor: {
                processText: (text) => {
                  const ts: TextPart[] = [];
                  for (let i = 0; i < text.length; ) {
                    switch (text.slice(i, i + 2)) {
                      case "用語":
                        i += 2;
                        ts.push({
                          type: "term",
                          term: "用語",
                          text: "用語",
                        });
                        break;
                      case "定義":
                        i += 2;
                        ts.push({
                          type: "term",
                          term: "定義",
                          text: "定義",
                        });
                        break;
                      default:
                        ts.push({
                          type: "text",
                          text: text[i],
                        });
                        i += 1;
                        break;
                    }
                  }
                  if (ts.length === text.length) {
                    return [
                      {
                        type: "text",
                        text,
                      },
                    ];
                  }
                  return ts;
                },
              },
            } satisfies RehypeProcTermPluginParams,
          ],

          rehypeCleanInternal,
        ],
        remarkPlugins: [
          // remarkDebug,
          remarkBreaks,
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
