import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      a: "a",
      blockquote: "blockquote",
      code: "code",
      h1: "h1",
      h2: "h2",
      h3: "h3",
      p: "p",
      pre: "pre",
      ...props.components,
    },
    { Bar, Foo, LumaKatex, LumaMdxLayout, LumaTerm } = _components;
  if (!Bar) _missingMdxReference("Bar", true);
  if (!Foo) _missingMdxReference("Foo", true);
  if (!LumaKatex) _missingMdxReference("LumaKatex", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!LumaTerm) _missingMdxReference("LumaTerm", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"# これはh1だよ\\n\\n## これはh2だよ\\n\\n文章がここにくるよ1．\\n文章がここにくるよ2．\\n\\n```ts {2}\\n// これはコードブロックだよ．\\ndeclare const name: string;\\nconsole.log(name);\\n```\\n\\n[これはリンクだよ，ほんとに．](https://example.com)\\n\\n> これは引用だよ．\\n> これは引用だよ．\\n\\n<Foo>\\n  <Bar>baz</Bar>\\n</Foo>\\n\\n### これは[@重要な]h3だよ\\n\\n文章がここにくるよ3．\\n\\n$a+b$ は $b+a$ と等しい．\\n\\n$$\\n\\\\begin{aligned}\\n  a + b &= b + a \\\\\\\\\\n  a \\\\times b &= b \\\\times a\\n\\\\end{aligned}\\n$$\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse(
      '[{"tag":"h1","index":0,"depth":1,"titleText":"これはh1だよ","level":1,"slug":"これはh1だよ","children":[{"tag":"h2","index":1,"depth":2,"titleText":"これはh2だよ","level":2,"slug":"これはh2だよ","children":[{"tag":"h3","index":2,"depth":3,"titleText":"これは重要なh3だよ","level":3,"slug":"これは重要なh3だよ","children":[]}]}]}]',
    ),
    headers: [
      _jsx(_Fragment, {
        children: "これはh1だよ",
      }),
      _jsx(_Fragment, {
        children: "これはh2だよ",
      }),
      _jsxs(_Fragment, {
        children: [
          "これは",
          _jsx(LumaTerm, {
            rawTermRef: "重要な",
            termRef: "重要な",
            gotBy: "raw",
            indexInPage: JSON.parse("0"),
            totalInPage: JSON.parse("1"),
            "luma:isInsideToc": JSON.parse("true"),
          }),
          "h3だよ",
        ],
      }),
    ],
    children: [
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsx(_components.h1, {
        slug: "これはh1だよ",
        children: "これはh1だよ",
      }),
      "\n",
      _jsx(_components.h2, {
        slug: "これはh2だよ",
        lastH1Slug: "これはh1だよ",
        children: "これはh2だよ",
      }),
      "\n",
      _jsx(_components.p, {
        children: "文章がここにくるよ1。\n文章がここにくるよ2。",
      }),
      "\n",
      _jsx(_components.pre, {
        children: _jsx(_components.code, {
          className: "language-ts",
          meta: "{2}",
          children:
            "// これはコードブロックだよ．\ndeclare const name: string;\nconsole.log(name);\n",
        }),
      }),
      "\n",
      _jsx(_components.p, {
        children: _jsx(_components.a, {
          href: "https://example.com",
          children: "これはリンクだよ，ほんとに．",
        }),
      }),
      "\n",
      _jsxs(_components.blockquote, {
        children: [
          "\n",
          _jsx(_components.p, {
            children: "これは引用だよ．\nこれは引用だよ．",
          }),
          "\n",
        ],
      }),
      "\n",
      _jsx(Foo, {
        children: _jsx(Bar, {
          children: "baz",
        }),
      }),
      "\n",
      _jsxs(_components.h3, {
        slug: "これは重要なh3だよ",
        lastH1Slug: "これはh1だよ",
        lastH2Slug: "これはh2だよ",
        children: [
          "これは",
          _jsx(LumaTerm, {
            rawTermRef: "重要な",
            termRef: "重要な",
            gotBy: "raw",
            indexInPage: JSON.parse("0"),
            totalInPage: JSON.parse("1"),
          }),
          "h3だよ",
        ],
      }),
      "\n",
      _jsx(_components.p, {
        children: "文章がここにくるよ3。",
      }),
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(LumaKatex, {
            globalContext: JSON.parse('""'),
            defContext: globalThis[_rehypeKatexContext0],
            content: "a+b",
            options: "math inline",
          }),
          " は ",
          _jsx(LumaKatex, {
            globalContext: JSON.parse('""'),
            defContext: globalThis[_rehypeKatexContext0],
            content: "b+a",
            options: "math inline",
          }),
          " と等しい。",
        ],
      }),
      "\n",
      _jsx(LumaKatex, {
        globalContext: JSON.parse('""'),
        defContext: globalThis[_rehypeKatexContext0],
        content:
          "\\begin{aligned} a + b &= b + a \\\\ a \\times b &= b \\times a \\end{aligned}",
        options: true,
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
