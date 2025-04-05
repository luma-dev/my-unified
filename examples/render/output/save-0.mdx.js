import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      hr: "hr",
      p: "p",
      ...props.components,
    },
    { LumaKatex, LumaLoaded, LumaMdxLayout, Term } = _components;
  if (!LumaKatex) _missingMdxReference("LumaKatex", true);
  if (!LumaLoaded) _missingMdxReference("LumaLoaded", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!Term) _missingMdxReference("Term", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"<Save>\\n```math inline\\nA=B\\n```\\n</Save>\\n\\n定義は[$]となる。\\n\\n---\\n\\n<Save $bar>\\n```math inline\\nA=B\\n```\\n</Save>\\n\\n定義は[$bar]となる。\\n\\n---\\n\\n```math!save\\n  A=B\\n```\\n\\n定義は[$]となる。\\n\\n---\\n\\n```math!save $foo inline\\n  A=B\\n```\\n\\n定義は[$foo]となる。\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse("[]"),
    headers: [],
    children: [
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(Term, {
            text: "定義",
            reference: "定義",
            refIndex: JSON.parse("0"),
          }),
          "は",
          _jsx(LumaLoaded, {
            byName: JSON.parse('""'),
            found: JSON.parse("true"),
            children: _jsx(LumaKatex, {
              globalContext: JSON.parse('""'),
              defContext: globalThis[_rehypeKatexContext0],
              content: "A=B",
              options: "inline",
            }),
          }),
          "となる。",
        ],
      }),
      "\n",
      _jsx(_components.hr, {}),
      "\n",
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(Term, {
            text: "定義",
            reference: "定義",
            refIndex: JSON.parse("1"),
          }),
          "は",
          _jsx(LumaLoaded, {
            byName: JSON.parse('"bar"'),
            found: JSON.parse("true"),
            children: _jsx(LumaKatex, {
              globalContext: JSON.parse('""'),
              defContext: globalThis[_rehypeKatexContext0],
              content: "A=B",
              options: "inline",
            }),
          }),
          "となる。",
        ],
      }),
      "\n",
      _jsx(_components.hr, {}),
      "\n",
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(Term, {
            text: "定義",
            reference: "定義",
            refIndex: JSON.parse("2"),
          }),
          "は",
          _jsx(LumaLoaded, {
            byName: JSON.parse('""'),
            found: JSON.parse("true"),
            children: _jsx(LumaKatex, {
              globalContext: JSON.parse('""'),
              defContext: globalThis[_rehypeKatexContext0],
              content: "A=B",
              options: true,
            }),
          }),
          "となる。",
        ],
      }),
      "\n",
      _jsx(_components.hr, {}),
      "\n",
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(Term, {
            text: "定義",
            reference: "定義",
            refIndex: JSON.parse("3"),
          }),
          "は",
          _jsx(LumaLoaded, {
            byName: JSON.parse('"foo"'),
            found: JSON.parse("true"),
            children: _jsx(LumaKatex, {
              globalContext: JSON.parse('""'),
              defContext: globalThis[_rehypeKatexContext0],
              content: "A=B",
              options: "$foo inline",
            }),
          }),
          "となる。",
        ],
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
