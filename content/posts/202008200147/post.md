---
type: 'post'
slug: 'g8jsazhrkrj54'
date: 2020-08-20T01:47:00+0900
title: '【TypeScript】GatsbyJSをTypeScript化してみる'
description: '公式サイトもこれで作っているとウワサのGatsbyJSをお勉強してみた。その3'
---

# 概要

GatsbyJS という静的サイトジェネレーターを使って個人ブログを立ち上げました。  
その過程で、内部ソースの TypeScript 化で詰まった箇所と、React も初めて触ったので基本的な部分のおさらいも含めて書きます。

今回は TypeScript 編です。

# やったこと

1. GatsbyJS で環境構築
2. React.js の基礎を理解する（JSX、レンダー、コンポーネントの作成と再利用）
3. TypeScript に触れて、実際に書き換える ← ここ

ちなみに、GatsbyJS と React の基本を学ぶつもりの場合は、[公式ドキュメントのチュートリアル](https://www.gatsbyjs.com/tutorial/)が鬼丁寧なので、そちらを Google 翻訳でもしながら見るほうがこのメモ書きを見るより有意義です。

- [概要](#概要)
- [やったこと](#やったこと)
- [書き換えしてみる](#書き換えしてみる)
  - [変数の型定義](#変数の型定義)
  - [React Functionでのpropsの型定義](#react-functionでのpropsの型定義)

# 書き換えしてみる

要素をいくつか抑えてコンポーネントを書き換えるだけです。  
VSCodeのバリデーションが優秀なので身を任せましょう。

## 変数の型定義

プリミティブ型で使うのはこの3つ。`変数名: 型のアノテーション`で定義します。  
```ts
const number: number;
const string: string;
const boolean?: boolean;
```

`: number || string`のように複数指定することも出来ます。  
`const boolean?: boolean;`のように`?`を付けると`const boolean: boolean || undefined;`と同義になり、値が入って無くても通るようになります。

## React Functionでのpropsの型定義

*Type Alias*と*interface*の2種類あるみたいです。  
*Type Alias*の方が「上書きできないのでいい」という意見が多かったので今回はそちらを採用しました。

```ts
import React from 'react';

type Props = {
  number: number;
  string: string;
}

interface Props {
  number: number;
  string: string;
}

const Component:React.FC<Props> = (props) => {
  // 処理
}

export default Component;
```

`type Props` か `interface Props`で型オブジェクトを定義して、`const Component:React.FC<Props>`で関数に渡します。
