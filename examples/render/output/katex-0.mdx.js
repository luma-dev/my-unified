import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { someDef } from "./someDef.txt";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const { LumaKatex, LumaMdxLayout } = props.components || {};
  if (!LumaKatex) _missingMdxReference("LumaKatex", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"import { someDef } from \\"./someDef.txt\\";\\n\\n{\\n(() => {\\nlet x = 4;\\nreturn x;\\n})()\\n}\\n\\n<KatexDef _={someDef} />\\n<KatexDef _=\\"foo\\" />\\n<KatexDef _={\\"bar\\"} />\\n\\n```math def\\n\\\\def\\\\idmat{I}\\n\\\\gdef\\\\Tr#1{\\\\operatorname{Tr}\\\\left[{#1}\\\\right]}\\n```\\n\\n```math\\n\\\\Tr \\\\idmat = 1\\n```\\n\\n```math trans1\\n1 + 1\\n= S(O) + S(O)\\n= S(O + S(O))\\n= S(S(O))\\n```\\n\\n<KatexReset />\\n\\n```math\\n\\\\Tr \\\\idmat = 1\\n```\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse("[]"),
    headers: [],
    children: [
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
        "\\def\\idmat{I}\n\\gdef\\Tr#1{\\operatorname{Tr}\\left[{#1}\\right]}\n"),
      "\n",
      _jsx(LumaKatex, {
        globalContext: JSON.parse('""'),
        defContext: globalThis[_rehypeKatexContext0],
        content: "\\Tr \\idmat = 1\n",
        meta: JSON.parse(
          '{"category":"show","mode":"display","subCategory":"normal"}',
        ),
      }),
      "\n",
      _jsx(LumaKatex, {
        globalContext: JSON.parse('""'),
        defContext: globalThis[_rehypeKatexContext0],
        content: "1 + 1\n= S(O) + S(O)\n= S(O + S(O))\n= S(S(O))\n",
        meta: JSON.parse(
          '{"category":"show","mode":"display","subCategory":"transform1"}',
        ),
      }),
      "\n",
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsx(LumaKatex, {
        globalContext: JSON.parse('""'),
        defContext: globalThis[_rehypeKatexContext0],
        content: "\\Tr \\idmat = 1\n",
        meta: JSON.parse(
          '{"category":"show","mode":"display","subCategory":"normal"}',
        ),
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
