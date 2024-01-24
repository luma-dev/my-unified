import * as acorn from "acorn";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const projectRoot = path.resolve(__dirname, "..");
const exampleDir = path.resolve(projectRoot, "examples/es/input");
const exampleOutDir = path.resolve(projectRoot, "examples/es/output");

const main = async () => {
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
      const outputJsonPath = path.resolve(
        exampleOutDir,
        path.basename(file) + ".json",
      );
      const content = await fs.readFile(inputPath, {
        encoding: "utf-8",
      });
      const ast = acorn.parse(content, {
        ecmaVersion: 2020,
        sourceType: "module",
      });
      await fs.mkdir(exampleOutDir, { recursive: true });
      await fs.writeFile(outputJsonPath, JSON.stringify(ast, null, 2));
    }),
  );
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
