---
type: 'post'
slug: '94g7i4pkg9jwi'
date: 2020-08-14T20:33:00+0900
title: '【React】GatsbyJSをやるためにReactの基本だけを触ってみる'
description: 'TypeScript公式サイトもこれで作っているとウワサのGatsbyJSをお勉強してみた。その2'
---

# 概要

GatsbyJS という静的サイトジェネレーターを使って個人ブログを立ち上げました。  
その過程で、内部ソースの TypeScript 化で詰まった箇所と、React も初めて触ったので基本的な部分のおさらいも含めて書きます。

今回は React 編ということで。

# やったこと

1. GatsbyJS で環境構築
2. React.js の基礎を理解する（JSX、レンダー、コンポーネントの作成と再利用）← ここ
3. TypeScript に触れて、実際に書き換える

ちなみに、GatsbyJS と React の基本を学ぶつもりの場合は、[公式ドキュメントのチュートリアル](https://www.gatsbyjs.com/tutorial/)が鬼丁寧なので、そちらを Google 翻訳でもしながら見るほうがこのメモ書きを見るより有意義です。

- [概要](#概要)
- [やったこと](#やったこと)
- [React.js の基礎を理解する](#reactjsの基礎を理解する)
  - [JSX について](#jsxについて)
  - [React 要素とレンダー](#react要素とレンダー)
  - [コンポーネント](#コンポーネント)
- [まとめ](#まとめ)

# React.js の基礎を理解する

## JSX について

JSX は要するに JavaScript のソースの中に HTML を書いてるやつのことです。

```jsx
const world = 'world!';
const h1 = <h1>Hello, { world }</h1>;
const article = (
  <article>
    <p>Hello, { world }</p>
  </article>
};
```

普通の JavaScript からすると大分キモいですが、`document.getElementById('hoge')`とか書くよりは直感的で分かりやすいですね。  
**こういう HTML 要素を出力する式**として捉えるのが多分いいカンジだと思います。

JavaScript の中で JSX を書く場合は特に何も必要ありませんが、JSX の中に JavaScript を書く場合は`{ }`で囲う必要があります。  
また、JSX が複数行にまたがる場合は、`( )`で囲むのが良さげです。

素敵要素として、JSX 内のテキストはエスケープされて出力されるみたいです。XSS 対策もバッチリ。

## React 要素とレンダー

JSX を要素として実際に書き出すには`ReactDOM.render( )`を使います。これがレンダー。

```jsx
<div id='root'></div>;

// ~~~ HTML と JSX の壁~~~~

const h1 = <h1>Hello, world</h1>;
ReactDOM.render(h1, document.getElementById('root'));
```

こいつのすごいところは、2 回目以降のレンダーの際、差分だけを更新してくれるところ。  
通常の DOM 操作であれば、指定した要素まるごと全部書き換えますからね。React が SPA 開発に強いと言われる点の一つでしょうか。

## コンポーネント

React での開発では、機能や画面上のパーツをコンポーネント（部品）に細分化していきながら、最終的にそれを組み合わせる形で進めます。

例として、h1 タグのコンポーネント`H1Component.jsx`を下記のように作ります。

```jsx
import React from 'react';
import styled from 'styled-components';

const Style = styled.h1`
  border-bottom: 1px solid #fff;
  border-left: 3px solid #fff;
`;

const H1Render = () => {
  return <Style>Title, Hello world!</Style>;
};

export default H1ReactDom;
```

こうすることで、Web サイト・アプリケーション全体で h1 タグの部品を使いまわせて、修正が入ったとしても複数ファイルを横断したりせず、一つの記述を変えるだけでいいのでメンテナンス性も担保されるというワケです。

WordPress でも`header.php`とかでパーツの共有化をしたりしますが、あれの強化版みたいなカンジですね。

上記のように、関数の形で作るコンポーネントを Function Component と言うみたいです。
また下記のように、クラスの形で作るコンポーネントを Class Component と言います。

```jsx
class H1Render extend React.Component {
  render(){
    <Style>Title, Hello world!</Style>
  }
}
```

基本的には関数型でコンポーネントは作成すべきで、クラス型の方が多機能なため、必要に応じてクラス型を使うのがベターみたい。クラス型コンポーネントについては今回の範囲では触ってないので詳細はまた別記事で。

なお、コンポーネントを呼び出すときはこう。(呼び出しているのは関数型の例)  
タグみたいにして呼びます。

```jsx
import React from 'react';
import H1ReactDom from './H1Component';

const h1 = (
  <header>
    <H1ReactDom hoge='hoge' />
  </header>
);
ReactDOM.render(h1, document.getElementById('root'));
```

上記の`<H1ReactDom hoge='hoge' />`のように、コンポーネントに属性を指定することで引数を持たせられます。  
タグ内のテキストを場所によって変えたいみたいな時に使えますね。

コンポーネント名は、DOM と区別するために常に大文字から初めなくてはいけません。

# まとめ

React.js の基礎中の基礎をやりました。  
静的サイトを作るだけならこれくらい分かってれば問題ないですね、逆に React を使う意味もそんなにないレベルですが。

特にクラス型コンポーネントのステートなどはアプリケーション開発においては必須の前提知識だと思うので、実際に React アプリを使う段階でまた改めてドキュメント読みながら理解したいと思います。
