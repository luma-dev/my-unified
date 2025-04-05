import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      p: "p",
      ...props.components,
    },
    { LumaMdxLayout, Term } = _components;
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!Term) _missingMdxReference("Term", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"これは用語を展開するテストです。\\n通常の行。\\n\\n用語の定義をするよ。\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse("[]"),
    headers: [],
    children: [
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsxs(_components.p, {
        children: [
          "こ",
          "れ",
          "は",
          _jsx(Term, {
            text: "用語",
            reference: "用語",
          }),
          "を",
          "展",
          "開",
          "す",
          "る",
          "テ",
          "ス",
          "ト",
          "で",
          "す",
          "。",
          "\n",
          "通",
          "常",
          "の",
          "行",
          "。",
        ],
      }),
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(Term, {
            text: "用語",
            reference: "用語",
          }),
          "の",
          _jsx(Term, {
            text: "定義",
            reference: "定義",
          }),
          "を",
          "す",
          "る",
          "よ",
          "。",
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
