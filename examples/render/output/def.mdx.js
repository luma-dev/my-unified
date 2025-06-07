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
      li: "li",
      p: "p",
      ul: "ul",
      ...props.components,
    },
    { Foo, LumaMdxLayout, Term } = _components;
  if (!Foo) _missingMdxReference("Foo", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!Term) _missingMdxReference("Term", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"これは用語を展開するテストです。\\n通常の行。\\n\\n- <>bullet内の用語</>\\n\\n用語の定義をするよ。\\n\\n## タイトル内の用語も置き換えるよ\\n\\n<Foo a={1} />\\n"}',
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
          _jsxs(_Fragment, {
            children: [
              "こ",
              "れ",
              "は",
              _jsx(Term, {
                text: "用語",
                reference: "用語",
                refIndex: JSON.parse("0"),
                termContainer: JSON.parse("null"),
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
            ],
          }),
          _jsx(_components.br, {}),
          "\n",
          "通常の行。",
        ],
      }),
      "\n",
      _jsxs(_components.ul, {
        children: [
          "\n",
          _jsxs(_components.li, {
            children: [
              "\n",
              _jsx(_Fragment, {
                children: _jsxs(_Fragment, {
                  children: [
                    "b",
                    "u",
                    "l",
                    "l",
                    "e",
                    "t",
                    "内",
                    "の",
                    _jsx(Term, {
                      text: "用語",
                      reference: "用語",
                      refIndex: JSON.parse("1"),
                      termContainer: JSON.parse("null"),
                    }),
                  ],
                }),
              }),
              "\n",
            ],
          }),
          "\n",
        ],
      }),
      "\n",
      _jsx(_components.p, {
        children: _jsxs(_Fragment, {
          children: [
            _jsx(Term, {
              text: "用語",
              reference: "用語",
              refIndex: JSON.parse("2"),
              termContainer: JSON.parse("null"),
            }),
            "の",
            _jsx(Term, {
              text: "定義",
              reference: "定義",
              refIndex: JSON.parse("0"),
              termContainer: JSON.parse("null"),
            }),
            "を",
            "す",
            "る",
            "よ",
            "。",
          ],
        }),
      }),
      "\n",
      _jsx(_components.h2, {
        slug: "タイトル内の用語も置き換えるよ",
        children: _jsxs(_Fragment, {
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
              refIndex: JSON.parse("3"),
              termContainer: JSON.parse('"h2"'),
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
