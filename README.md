# luma-unified

> [!WARNING]
> このパッケージが提供するプラグインは私のユースケースに特化したものなので，直接使うのは推奨しません．  
> The plugins provided by this package are specific to my use case, so I do not recommend using them directly!

## ライセンス

MITとCC0でライセンスされています

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
  - `katex`, `katex-def` という言語で設定したコードブロック -`katex-save` という言語で設定したコードブロックを `<Save>` に変換する

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
