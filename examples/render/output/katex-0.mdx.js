import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { someDef } from "./someDef.txt";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const { LumaKatex, LumaMdxLayout, LumaToc } = props.components || {};
  if (!LumaKatex) _missingMdxReference("LumaKatex", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!LumaToc) _missingMdxReference("LumaToc", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"import { someDef } from \\"./someDef.txt\\";\\n\\n{\\n(() => {\\nlet x = 4;\\nreturn x;\\n})()\\n}\\n\\n<KatexDef _={someDef} />\\n<KatexDef _=\\"foo\\" />\\n<KatexDef _={\\"bar\\"} />\\n\\n```katex-def\\n\\\\def\\\\idmat{I}\\n\\\\gdef\\\\Tr#1{\\\\operatorname{Tr}\\\\left[{#1}\\\\right]}\\n```\\n\\n```katex\\n\\\\Tr \\\\idmat = 1\\n```\\n\\n```katex trans\\n1 + 1\\n= S(O) + S(O)\\n= S(O + S(O))\\n= S(S(O))\\n```\\n\\n<KatexReset />\\n\\n```katex {1,2,3} {1-2} lang=js\\n\\\\Tr \\\\idmat = 1\\n```\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse("[]"),
    children: [
      _jsx(LumaToc, {
        toc: JSON.parse("[]"),
      }),
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      "\n",
      (() => {
        let x = 4;
        return x;
      })(),
      "\n",
      void (globalThis[_rehypeKatexContext0] += someDef),
      "\n",
      void (globalThis[_rehypeKatexContext0] += "foo"),
      "\n",
      void (globalThis[_rehypeKatexContext0] += "bar"),
      "\n",
      void (globalThis[_rehypeKatexContext0] +=
        "\\def\\idmat{I} \\gdef\\Tr#1{\\operatorname{Tr}\\left[{#1}\\right]}"),
      "\n",
      _jsx(LumaKatex, {
        defContext: globalThis[_rehypeKatexContext0],
        content: "\\Tr \\idmat = 1",
        options: true,
      }),
      "\n",
      _jsx(LumaKatex, {
        defContext: globalThis[_rehypeKatexContext0],
        content: "1 + 1 = S(O) + S(O) = S(O + S(O)) = S(S(O))",
        options: "trans",
      }),
      "\n",
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsx(LumaKatex, {
        defContext: globalThis[_rehypeKatexContext0],
        content: "\\Tr \\idmat = 1",
        options: "{1,2,3} {1-2} lang=js",
      }),
      (() => {
        delete globalThis[_rehypeKatexContext0];
      })(),
    ],
  });
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout
    ? _jsx(MDXLayout, {
        ...props,
        children: _jsx(_createMdxContent, {
          ...props,
        }),
      })
    : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it.",
  );
}
