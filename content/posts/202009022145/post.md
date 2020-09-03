---
type: 'post'
slug: 'N771JhnmafEBZ'
date: 2020-09-02T21:45:00+0900
title: '【React】React Hooks がめちゃんこ便利だという話'
description: 'React Hooks あればもう class コンポーネントいらねーじゃん！（早計）'
---

# 概要

関数コンポーネントで _state_ やライフサイクルを扱えるようになる _React Hooks_ が鬼便利すぎたので共有しようと思います。

# 超シンプルな ToDo 機能

_Next.js_ 環境で雑に作ったテキストボックスに入力してボタンを押したら p タグが増えるだけの ToDo アプリ的なもの。

## class コンポーネントで書くとこう

```tsx
import React from 'react';
// import { useState } from 'react'

class IndexPage extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      todos: ['todo 2', 'todo 1'],
      todo: '',
    };
  }

  setTodos = () => {
    this.setState({
      todos: [this.state.todo, ...this.state.todos],
    });
  };

  setTodo = (value) => {
    this.setState({
      todo: value,
    });
  };

  render() {
    return (
      <div>
        <input
          value={this.state.todo}
          type='text'
          onChange={(e) => this.setTodo(e.target.value)}
        />
        <button onClick={() => this.setTodos()}>Add</button>
        {this.state.todos.map((todo, index) => (
          <p key={todo + index}>{todo}</p>
        ))}
      </div>
    );
  }
}

export default IndexPage;
```

やってることは配列の state を作って、値を更新して再レンダーするだけのシンプル構成。

`constructor` って何とか、`super`って何とか。  
今回は実装してませんが、さらにここにライフサイクルなんかが入ってきた日には頭パンクしちゃいますね。

## これを Hooks を使って関数コンポーネントで書くとこう

```tsx
import { useState } from 'react';

const IndexPage = () => {
  const [todos, setTodos] = useState(['todo 1', 'todo 2']);
  const [todo, setTodo] = useState('');
  return (
    <div>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => setTodos([...todos, todo])}>Add</button>
      {todos.map((todo, index) => (
        <p key={todo + index}>{todo}</p>
      ))}
    </div>
  );
};

export default IndexPage;
```

超シンプル！！！すごい！！！

## 詳細

### state 名と初期値の設定

class コンポーネントの場合は `constructor` を使って実装します。

```tsx
  constructor(prop) {
    super(prop);
    this.state = {
      todos: ['todo 2', 'todo 1'],
      todo: '',
    };
  }

```

それが _Hooks_ と関数コンポーネントを使うと、`useState` で一発。  
ついでに _state_ 変更用の関数名まで一緒に定義できてしまう。

```tsx
const [todos, setTodos] = useState(['todo 1', 'todo 2']);
const [todo, setTodo] = useState('');
```

## state の値の変更

class コンポーネントの場合変更用の関数を定義して、 `setState` で変更用の処理を記述し、後でイベントハンドラで呼び出したりするのが一般的です。

```tsx
setTodos = () => {
  this.setState({
    todos: [this.state.todo, ...this.state.todos],
  });
};

setTodo = (value) => {
  this.setState({
    todo: value,
  });
};
```

_Hooks_ を使えば、 _state_ 名と一緒に定義した関数を呼び出すときに、引数として変更する値を記述するだけ！すごい！

```tsx
const [todos, setTodos] = useState(['todo 1', 'todo 2']);
const [todo, setTodo] = useState('');

/* 中略 */

<button onClick={() => setTodos([...todos, todo])}></button>;
```

# 短くかけるのは分かったけどそれだけ？

それだけではない。最大のメリットは、 _props_ のバケツリレーを抑制できるということ。  
要約すると以下の通り。

1. class コンポーネントは出来るだけ使わないようにしよう
2. なので _state_ やライフサイクルを管理する場合は、上位のコンポーネントに書き、子コンポーネントに _porps_ で渡そう
3. 実装が複雑になってくると、class コンポーネント → 子コンポーネント → さらに子コンポーネントという風に _props_ のバケツリレーが発生してしまい保守性が下がる。
4. _Hooks_ を使えばそれぞれのコンポーネントが互いに影響し合う範囲が少なくなり、保守性が上がる！

簡単に短く書ける上に、可読性も上がり、複雑化も防げて保守性も上がる。最高ですね。
