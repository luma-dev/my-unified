import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      p: "p",
      ...props.components,
    },
    { LumaKatex, LumaMdxLayout } = _components;
  if (!LumaKatex) _missingMdxReference("LumaKatex", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"\\n\\n\\n\\n\\n$ab\\\\}c$\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse("[]"),
    headers: [],
    children: [
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsx(_components.p, {
        children: _jsx(LumaKatex, {
          globalContext: JSON.parse('""'),
          defContext: globalThis[_rehypeKatexContext0],
          content: "ab\\}c",
          meta: JSON.parse(
            '{"category":"show","block":false,"display":false,"subCategory":"normal"}',
          ),
        }),
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
