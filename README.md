# @luma-dev/my-unified

> [!WARNING]
> このパッケージが提供するプラグインは私のユースケースに特化したものなので，直接使うのは推奨しません．  
> The plugins provided by this package are specific to my use case, so I do not recommend using them directly!

下記の通りCC0でライセンスしていますので，コピペしてご利用することをおすすめします．

## ライセンス

[MIT](?tab=MIT-2-ov-file)と[CC0](?tab=CC0-1.0-1-ov-file)でライセンスされています

## インストール

```bash
npm i @luma-dev/my-unified
```

## Next.jsでの設定例

ESM (package.jsonのtype=module) 前提での設定例．プラグインの指定順は結果に影響を与えるため注意．

```js
// next.config.js
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter';
import remarkMath from 'remark-math';

import createMDX from '@next/mdx'

import rehypeKatex from '@luma-dev/my-unified/rehype-katex';
import remarkTerm from '@luma-dev/my-unified/remark-term';
import remarkMeta from '@luma-dev/my-unified/remark-meta';
import rehypeReplaceText from '@luma-dev/my-unified/rehype-replace-text';
import rehypeSave from '@luma-dev/my-unified/rehype-save';
import rehypeCounter from '@luma-dev/my-unified/rehype-counter';
import rehypeAddSlug from '@luma-dev/my-unified/rehype-add-slug';
import rehypeWrap from '@luma-dev/my-unified/rehype-wrap';
import rehypeCleanInternal from '@luma-dev/my-unified/rehype-clean-internal';


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
        rehypePlugins: [
          remarkGfm,
          rehypeReplaceText,
          rehypeKatex,
          rehypeSave,
          rehypeCounter,

          rehypeAddSlug,
          rehypeWrap,

          rehypeCleanInternal,
        ],
        remarkPlugins: [
          remarkFrontmatter,
          remarkMath,
          remarkTerm,
          remarkMeta,
        ],
  },
})

export default withMDX(nextConfig)
```

```tsx
// mdx-components.tsx
import type {
  LumaMdxLayoutProps,
  LumaTocProps,
  LumaKatexProps,
  LumaCounterProps,
  LumaLoadedProps,
  LumaTermProps,
} from '@luma-type/my-unified/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    LumaMdxLayout: (props: LumaMdxLayoutProps) => (
      /* Replace with your component */
      <div>
        <div>LumaMdxLayout</div>
        {props.children}
      </div>
    ),
    LumaToc: (props: LumaTocProps) => (
      /* Replace with your component */
      <div>
        <div>LumaToc</div>
        {props.children}
      </div>
    ),
    LumaKatex: (props: LumaKatexProps) => (
      /* Replace with your component */
      <div>
        <div>LumaKatex</div>
        {props.children}
      </div>
    ),
    LumaCounter: (props: LumaCounterProps) => (
      /* Replace with your component */
      <div>
        <div>LumaCounter</div>
        {props.children}
      </div>
    ),
    LumaLoaded: (props: LumaLoadedProps) => (
      /* Replace with your component */
      <div>
        <div>LumaCounter</div>
        {props.children}
      </div>
    ),
    LumaTerm: (props: LumaTermProps) => (
      /* Replace with your component */
      <div>
        <div>LumaTerm</div>
        {props.children}
      </div>
    ),
  };
}
```

## rehype-add-slug

各ヘディングに対し，slug化したそのテキストを属性として渡し，それより上位のヘディングのslugも属性に付与するプラグイン

```ts
import rehypeAddSlug from "@luma-dev/my-unified/rehype-add-slug";
```

例: 以下の入力に対し，

```md
# hello world

## 1. getting started

## 2. install

## 3. uninstall

# description

## 1. something

## 2. other
```

以下のように変換される

```js
<h1 slug="hello_world">hello world</h1>
<h2 lastH1Slug="hello_world" slug="1.getting_started">1. getting started</h1>
<h2 lastH1Slug="hello_world" slug="2.install">2. install</h1>
...
```

## rehype-replace-text

句点読点を統一する．「，」「．」を「、」「。」に置き換えるプラグイン．

```ts
import rehypeReplaceText from "@luma-dev/my-unified/rehype-replace-text";
```

例: 以下の入力に対し，

```md
こんにちは，ねこだよ．
```

以下のように変換される

```md
こんにちは、ねこだよ。
```

## remark-term

用語を参照する記法を追加します．mdx前提です．

```ts
import remarkTerm from "@luma-dev/my-unified/remark-term";
```

例: 以下の入力に対し，

```mdx
[@逆元]を考える．

{/* 以下のようにすると途中で定義を変えられる */}

<DefMapImp 逆元="群の逆元" />

[@逆元]を考える．

{/* 通常のリンクでは先頭の@をエスケープする必要がある */}
[\@これもリンク](https://example.com)だよ．
```

以下のように変換される

```mdx
<LumaTerm
  rawTermRef="逆元"
  termRef="逆元"
  gotBy="raw"
  indexInPage={0}
  totalInPage={1}
/>
を考える．

<LumaTerm
  rawTermRef="逆元"
  termRef="群の逆元"
  gotBy="imp"
  indexInPage={0}
  totalInPage={1}
/>
を考える．
```

`indexInPage` は `termRef` が何個目に出るか， `totalInPage` は `termRef` が全体で何個あるか，をページ内で集計したもの．

`DefMapImp` (implicit) の他に `DefMapExp` (explicit) でも書き換えられる．
それらの振る舞いの違いは利用側に委ねられている．
[remark-frontmatter](https://github.com/remarkjs/remark-frontmatter)を入れた状態でfrontmatterのYAMLで `DefMapExp` か `DefMapImp` を使うと同様に初期化できる

```mdx
---
DefMapExp:
DefMapImp:
  逆元: 行列の逆元
---
```

## rehype-katex

- 下記に対する検出をして共通の定義を差し込むなどを行う
  - `<Katex>`, `<KatexDef>` で囲まれたテキスト
  - `katex`, `katex-def` という言語で設定したコードブロック
  - `katex-save` という言語で設定したコードブロックを `<Save>` で囲って変換する

```ts
import rehypeKatex from "@luma-dev/my-unified/rehype-katex";
```

## rehype-wrap

`<LumaMdxLayout>` で囲ってメタ情報を属性として入れるプラグイン．

```ts
import rehypeKatex from "@luma-dev/my-unified/rehype-wrap";
```

例: 以下の入力に対し，

```mdx
---
foo: bar
---

hello
```

以下のように変換される

```mdx
<LumaMdxLayout meta={{ foo: 'bar' }} file={...} toc={...}>
hello
</LumaMdxLayout>
```

- `file` はmdxファイル自体の情報
- `toc` はヘッダをまとめた情報
  - `[{ tag: 'h1', level: 1, titleComponent: ..., titleText: '...', slug: '...', children: [...] }, ...]` という形式になる

## remark-save

`<Save $name>` で囲ってページローカル保存（コンパイル時）， `[$name]` で呼び出しができるプラグイン．

```ts
import remarkSave from "@luma-dev/my-unified/remark-save";
```

例: 以下の入力に対し，

```mdx
<Save $who>world</Save>
hello [$who]
```

以下のように変換される

```mdx
hello world
```

## rehype-meta

`<_luma_internal_meta>` というタグのコンポーネントと一緒にメタデータを入れておくプラグイン．
rehype-wrapでメタデータを入れるために必要．

```ts
import rehypeSave from "@luma-dev/my-unified/rehype-meta";
```

## rehype-clean-internal

`<_luma_internal_*>` などを消すプラグイン．

```ts
import rehypeCleanInternal from "@luma-dev/my-unified/rehype-clean-internal";
```

## rehype-counter

`[#name]` という記法で，その名前ごとに登場回数をカウントして `<LumaCounter index={0} total={3} />` のように置き換える． `<C $name anyAttr="something" />` のように書くことでそれ以降のその名前のカウンタに属性を一律で付与できる．

```ts
import rehypeCounter from "@luma-dev/my-unified/rehype-counter";
```

例: 以下の入力に対し，

```mdx
<C template="%0." />

[#]フォークを持つ
[#]ナイフを持つ
[#]切る
```

以下のように変換される

```mdx
<LumaCounter index={0} total={3} template="%0." />フォークを持つ
<LumaCounter index={1} total={3} template="%0." />ナイフを持つ
<LumaCounter index={2} total={3} template="%0." />切る
```

`template` をどう扱うか，などは `LumaCounter` を実装することで意味を与えることになる．
