import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      h1: "h1",
      p: "p",
      ...props.components,
    },
    { LumaCounter, LumaMdxLayout, LumaToc } = _components;
  if (!LumaCounter) _missingMdxReference("LumaCounter", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!LumaToc) _missingMdxReference("LumaToc", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"<C $foo template=\\"%1(/%n): \\" />\\n\\n# [#foo]用意する\\n\\n...\\n\\n# [#foo]調理する\\n\\n...\\n\\n# [#foo]食べる\\n\\n<C template=\\"%0.\\" />\\n\\n[#]フォークを持つ\\n[#]ナイフを持つ\\n[#]切る\\n\\n<C template=\\"[重要] %0.\\" keep />\\n\\n[#]フォークで刺す\\n[#]ほおばる\\n\\n<C template=\\"%0.\\" />\\n\\n片付け編:\\n\\n[#]洗う\\n[#]乾かす\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse(
      '[{"tag":"h1","index":0,"depth":1,"titleText":"用意する","level":1,"slug":"用意する","children":[]},{"tag":"h1","index":1,"depth":1,"titleText":"調理する","level":1,"slug":"調理する","children":[]},{"tag":"h1","index":2,"depth":1,"titleText":"食べる","level":1,"slug":"食べる","children":[]}]',
    ),
    children: [
      _jsxs(LumaToc, {
        toc: JSON.parse(
          '[{"tag":"h1","index":0,"depth":1,"titleText":"用意する","level":1,"slug":"用意する","children":[]},{"tag":"h1","index":1,"depth":1,"titleText":"調理する","level":1,"slug":"調理する","children":[]},{"tag":"h1","index":2,"depth":1,"titleText":"食べる","level":1,"slug":"食べる","children":[]}]',
        ),
        children: [
          _jsxs(_Fragment, {
            children: [
              _jsx(LumaCounter, {
                $foo: true,
                template: "%1(/%n): ",
                index: JSON.parse("0"),
                total: JSON.parse("3"),
              }),
              "用意する",
            ],
          }),
          _jsxs(_Fragment, {
            children: [
              _jsx(LumaCounter, {
                $foo: true,
                template: "%1(/%n): ",
                index: JSON.parse("1"),
                total: JSON.parse("3"),
              }),
              "調理する",
            ],
          }),
          _jsxs(_Fragment, {
            children: [
              _jsx(LumaCounter, {
                $foo: true,
                template: "%1(/%n): ",
                index: JSON.parse("2"),
                total: JSON.parse("3"),
              }),
              "食べる",
            ],
          }),
        ],
      }),
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      "\n",
      _jsxs(_components.h1, {
        slug: "用意する",
        children: [
          _jsx(LumaCounter, {
            $foo: true,
            template: "%1(/%n): ",
            index: JSON.parse("0"),
            total: JSON.parse("3"),
          }),
          "用意する",
        ],
      }),
      "\n",
      _jsx(_components.p, {
        children: "...",
      }),
      "\n",
      _jsxs(_components.h1, {
        slug: "調理する",
        lastH1Slug: "用意する",
        children: [
          _jsx(LumaCounter, {
            $foo: true,
            template: "%1(/%n): ",
            index: JSON.parse("1"),
            total: JSON.parse("3"),
          }),
          "調理する",
        ],
      }),
      "\n",
      _jsx(_components.p, {
        children: "...",
      }),
      "\n",
      _jsxs(_components.h1, {
        slug: "食べる",
        lastH1Slug: "調理する",
        children: [
          _jsx(LumaCounter, {
            $foo: true,
            template: "%1(/%n): ",
            index: JSON.parse("2"),
            total: JSON.parse("3"),
          }),
          "食べる",
        ],
      }),
      "\n",
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(LumaCounter, {
            template: "%0.",
            index: JSON.parse("0"),
            total: JSON.parse("5"),
          }),
          "フォークを持つ\n",
          _jsx(LumaCounter, {
            template: "%0.",
            index: JSON.parse("1"),
            total: JSON.parse("5"),
          }),
          "ナイフを持つ\n",
          _jsx(LumaCounter, {
            template: "%0.",
            index: JSON.parse("2"),
            total: JSON.parse("5"),
          }),
          "切る",
        ],
      }),
      "\n",
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(LumaCounter, {
            template: "[重要] %0.",
            keep: true,
            index: JSON.parse("3"),
            total: JSON.parse("5"),
          }),
          "フォークで刺す\n",
          _jsx(LumaCounter, {
            template: "[重要] %0.",
            keep: true,
            index: JSON.parse("4"),
            total: JSON.parse("5"),
          }),
          "ほおばる",
        ],
      }),
      "\n",
      "\n",
      _jsx(_components.p, {
        children: "片付け編:",
      }),
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(LumaCounter, {
            template: "%0.",
            index: JSON.parse("0"),
            total: JSON.parse("2"),
          }),
          "洗う\n",
          _jsx(LumaCounter, {
            template: "%0.",
            index: JSON.parse("1"),
            total: JSON.parse("2"),
          }),
          "乾かす",
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
