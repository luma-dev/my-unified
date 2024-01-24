/*通常のリンクでは先頭の@をエスケープする必要がある*/
/*以下のようにすると途中で定義を変えられる*/
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      a: "a",
      p: "p",
      ...props.components,
    },
    { DefMapImp, LumaMdxLayout, LumaTerm, LumaToc } = _components;
  if (!DefMapImp) _missingMdxReference("DefMapImp", true);
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  if (!LumaTerm) _missingMdxReference("LumaTerm", true);
  if (!LumaToc) _missingMdxReference("LumaToc", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"---\\ncreated: 2023-01-01\\nhistory:\\n  - 2023-01-02: 誤りを修正\\npublish: false\\nDefMapExp:\\nDefMapImp:\\n  逆元: 行列の逆元\\n---\\n\\n[@逆元]を考える．\\n[@行列の逆元]を考える．\\n[@逆操作]をする．\\n\\n[@]\\n\\n[これはリンク](https://example.com)だよ．\\n{/* 通常のリンクでは先頭の@をエスケープする必要がある */}\\n[\\\\@これもリンク](https://example.com)だよ．\\n区間 [ 1 , 2 ] を考える．\\n\\n{/* 以下のようにすると途中で定義を変えられる */}\\n\\n<DefMapImp 逆元=\\"群の逆元\\" />\\n\\n今度は[@群]について考える．\\n[@逆元]を考える．\\n"}',
    ),
    meta: JSON.parse(
      '{"created":"2023-01-01","publish":false,"DefMapExp":null,"DefMapImp":{"逆元":"行列の逆元"}}',
    ),
    toc: JSON.parse("[]"),
    children: [
      _jsx(LumaToc, {
        toc: JSON.parse("[]"),
      }),
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(LumaTerm, {
            rawTermRef: "逆元",
            termRef: "行列の逆元",
            gotBy: "imp",
            indexInPage: JSON.parse("0"),
            totalInPage: JSON.parse("2"),
          }),
          "を考える。\n",
          _jsx(LumaTerm, {
            rawTermRef: "行列の逆元",
            termRef: "行列の逆元",
            gotBy: "raw",
            indexInPage: JSON.parse("1"),
            totalInPage: JSON.parse("2"),
          }),
          "を考える。\n",
          _jsx(LumaTerm, {
            rawTermRef: "逆操作",
            termRef: "逆操作",
            gotBy: "raw",
            indexInPage: JSON.parse("0"),
            totalInPage: JSON.parse("1"),
          }),
          "をする。",
        ],
      }),
      "\n",
      _jsx(_components.p, {
        children: _jsx(LumaTerm, {
          rawTermRef: "",
          termRef: "",
          gotBy: "raw",
          indexInPage: JSON.parse("0"),
          totalInPage: JSON.parse("1"),
        }),
      }),
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(_components.a, {
            href: "https://example.com",
            children: "これはリンク",
          }),
          "だよ。",
        ],
      }),
      "\n",
      "\n",
      _jsxs(_components.p, {
        children: [
          _jsx(_components.a, {
            href: "https://example.com",
            children: "@これもリンク",
          }),
          "だよ。\n区間 [ 1 , 2 ] を考える。",
        ],
      }),
      "\n",
      "\n",
      _jsx(DefMapImp, {
        逆元: "群の逆元",
      }),
      "\n",
      _jsxs(_components.p, {
        children: [
          "今度は",
          _jsx(LumaTerm, {
            rawTermRef: "群",
            termRef: "群",
            gotBy: "raw",
            indexInPage: JSON.parse("0"),
            totalInPage: JSON.parse("1"),
          }),
          "について考える。\n",
          _jsx(LumaTerm, {
            rawTermRef: "逆元",
            termRef: "群の逆元",
            gotBy: "imp",
            indexInPage: JSON.parse("0"),
            totalInPage: JSON.parse("1"),
          }),
          "を考える。",
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
