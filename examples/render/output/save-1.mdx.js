import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      p: "p",
      ...props.components,
    },
    { LumaLoaded, LumaMdxLayout, LumaToc } = _components;
  if (!LumaLoaded) _missingMdxReference("LumaLoaded", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!LumaToc) _missingMdxReference("LumaToc", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse('{"data":{},"history":[],"messages":[],"value":"[$]\\n"}'),
    meta: JSON.parse("null"),
    toc: JSON.parse("[]"),
    children: [
      _jsx(LumaToc, {
        toc: JSON.parse("[]"),
      }),
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsx(_components.p, {
        children: _jsx(LumaLoaded, {
          byName: JSON.parse('""'),
          found: JSON.parse("false"),
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
