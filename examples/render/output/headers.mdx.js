import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime";
const _rehypeKatexContext0 = Symbol();
function _createMdxContent(props) {
  const _components = {
      h1: "h1",
      h2: "h2",
      ...props.components,
    },
    { LumaMdxLayout } = _components;
  if (!LumaMdxLayout) _missingMdxReference("LumaMdxLayout", true);
  return _jsxs(LumaMdxLayout, {
    file: JSON.parse(
      '{"data":{},"history":[],"messages":[],"value":"# hello world\\n\\n## 1. getting started\\n\\n## 2. install\\n\\n## 3. uninstall\\n\\n# description\\n\\n## 1. something\\n\\n## 2. other\\n"}',
    ),
    meta: JSON.parse("null"),
    toc: JSON.parse(
      '[{"tag":"h1","index":0,"depth":1,"titleText":"hello world","level":1,"slug":"hello_world","children":[{"tag":"h2","index":1,"depth":2,"titleText":"1. getting started","level":2,"slug":"1.getting_started","children":[]},{"tag":"h2","index":2,"depth":2,"titleText":"2. install","level":2,"slug":"2.install","children":[]},{"tag":"h2","index":3,"depth":2,"titleText":"3. uninstall","level":2,"slug":"3.uninstall","children":[]}]},{"tag":"h1","index":4,"depth":1,"titleText":"description","level":1,"slug":"description","children":[{"tag":"h2","index":5,"depth":2,"titleText":"1. something","level":2,"slug":"1.something","children":[]},{"tag":"h2","index":6,"depth":2,"titleText":"2. other","level":2,"slug":"2.other","children":[]}]}]',
    ),
    headers: [
      _jsx(_Fragment, {
        children: "hello world",
      }),
      _jsx(_Fragment, {
        children: "1. getting started",
      }),
      _jsx(_Fragment, {
        children: "2. install",
      }),
      _jsx(_Fragment, {
        children: "3. uninstall",
      }),
      _jsx(_Fragment, {
        children: "description",
      }),
      _jsx(_Fragment, {
        children: "1. something",
      }),
      _jsx(_Fragment, {
        children: "2. other",
      }),
    ],
    children: [
      void (globalThis[_rehypeKatexContext0] = ""),
      "\n",
      _jsx(_components.h1, {
        slug: "hello_world",
        children: "hello world",
      }),
      "\n",
      _jsx(_components.h2, {
        slug: "1.getting_started",
        lastH1Slug: "hello_world",
        children: "1. getting started",
      }),
      "\n",
      _jsx(_components.h2, {
        slug: "2.install",
        lastH1Slug: "hello_world",
        lastH2Slug: "1.getting_started",
        children: "2. install",
      }),
      "\n",
      _jsx(_components.h2, {
        slug: "3.uninstall",
        lastH1Slug: "hello_world",
        lastH2Slug: "2.install",
        children: "3. uninstall",
      }),
      "\n",
      _jsx(_components.h1, {
        slug: "description",
        lastH1Slug: "hello_world",
        lastH2Slug: "3.uninstall",
        children: "description",
      }),
      "\n",
      _jsx(_components.h2, {
        slug: "1.something",
        lastH1Slug: "description",
        children: "1. something",
      }),
      "\n",
      _jsx(_components.h2, {
        slug: "2.other",
        lastH1Slug: "description",
        lastH2Slug: "1.something",
        children: "2. other",
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
