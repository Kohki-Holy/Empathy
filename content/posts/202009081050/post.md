---
type: 'post'
slug: 'QC3eJeVWM2iYN'
date: 2020-09-08T10:50:00+0900
title: '【React】React Hooks がめちゃんこ便利だという話 ライフサイクル編'
description: 'React Hooks あればもう class コンポーネントいらねーじゃん！（早計）'
---

# 概要

関数コンポーネントで _state_ やライフサイクルを扱えるようになる _React Hooks_ が鬼便利すぎたので共有しようと思います。
`useSate` の _state_ の話は[前回の記事](./N771JhnmafEBZ)で。

# state の管理を useState() で出来るのは分かったけど、ライフサイクルはどうするの

`useEffect` でライフサイクル的に扱うことが出来ます。

## class コンポーネントでは

class コンポーネントでは、3 つの関数を使ってライフサイクルを記述します。

```tsx
// 初回レンダー（マウント）された時に呼び出す処理
componentDidMount();

// 再レンダーされた時に呼び出す処理
componentDidUpdate();

// アンマウント時に呼び出す処理
componentWillUnmount();
```

例えば、下記のようにボタンクリックでカウントアップした数字を表示するような処理の場合

```tsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  //初回マウント時の処理
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  //更新時の処理
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  // 同じ処理を2回書いていてメンテナンス性に問題がある…

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

同じ処理、または似たような処理を二度書かなければいけない。  
あと`this`がキモい。

## Hooks を使うと

`useEffect` では**レンダー後**に呼び出される（マウント時・再レンダー時という区別がない）ため、処理をひとつにまとめることが出来る。  
これがライフサイクルを _Hooks_ で扱う最大のメリット。

```tsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // ひとつにまとめられる！
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

また、第 2 引数に配列と変数を渡すことで、その変数が変更されたときのみ実行するような処理を書くことも出来る。  
上記のカウントアップソリの例であれば、 `count` が変更されたときのみ実行されればいいので、無駄なタイミングで実行されることを防ぎ、バグの予防やパフォーマンス改善にもなる。

```tsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count が変更されたときのみ動く
```

第 2 引数に空の配列 `[]` を渡せば、変更を感知する値がないので、一度のみ実行するような処理を書くことも出来る。  
`componentDidMount` や `componentWillUnmount` 的な処理ができるということですね。
