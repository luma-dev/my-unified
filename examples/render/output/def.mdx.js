import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      br: "br",
      h2: "h2",
      p: "p",
      ...props.components,
    },
    { Foo, LumaMdxLayout, Term } = _components;
  if (!Foo) _missingMdxReference("Foo", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!Term) _missingMdxReference("Term", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"これは用語を展開するテストです。\\n通常の行。\\n\\n用語の定義をするよ。\\n\\n## タイトル内の用語も置き換えるよ\\n\\n<Foo a={1} />\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse(
      '[{"tag":"h2","index":0,"depth":1,"titleText":"タイトル内の用語も置き換えるよ","level":2,"slug":"タイトル内の用語も置き換えるよ","children":[]}]',
    ),
    headers: [
      _jsx(_Fragment, {
        children: "タイトル内の用語も置き換えるよ",
      }),
    ],
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
            refIndex: JSON.parse("0"),
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
          _jsx(_components.br, {}),
          "\n",
          "通常の行。",
        ],
      }),
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(Term, {
            text: "用語",
            reference: "用語",
            refIndex: JSON.parse("1"),
          }),
          "の",
          _jsx(Term, {
            text: "定義",
            reference: "定義",
            refIndex: JSON.parse("0"),
          }),
          "を",
          "す",
          "る",
          "よ",
          "。",
        ],
      }),
      "\n",
      _jsxs(_components.h2, {
        slug: "タイトル内の用語も置き換えるよ",
        children: [
          "タ",
          "イ",
          "ト",
          "ル",
          "内",
          "の",
          _jsx(Term, {
            text: "用語",
            reference: "用語",
            refIndex: JSON.parse("2"),
          }),
          "も",
          "置",
          "き",
          "換",
          "え",
          "る",
          "よ",
        ],
      }),
      "\n",
      _jsx(Foo, {
        a: 1,
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
