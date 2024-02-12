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
    { LumaMdxLayout } = _components;
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"---\\ntitle: foobar\\npublish: true\\nDefMapImp:\\n  逆元: 行列の逆元\\n---\\n\\nhey!\\n\\n# foobar\\n\\nis ongoing.\\n"}',
    ),
    meta: JSON.parse('{"publish":true,"DefMapImp":{"逆元":"行列の逆元"}}'),
    toc: JSON.parse(
      '[{"tag":"h1","index":0,"depth":1,"titleText":"foobar","level":1,"slug":"foobar","children":[]}]',
    ),
    headers: [
      _jsx(_Fragment, {
        children: "foobar",
      }),
    ],
    children: [
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsx(_components.p, {
        children: "hey!",
      }),
      "\n",
      _jsx(_components.h1, {
        slug: "foobar",
        children: "foobar",
      }),
      "\n",
      _jsx(_components.p, {
        children: "is ongoing.",
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
