---
type: 'post'
slug: 'z3ey23caazkx3'
date: 2020-08-09T00:02:00+0900
title: '個人学習メモ：Gatsby で React 開発環境を構築してみようと思った'
description: 'TypeScript公式サイトもこれで作っているとウワサのGatsbyJSをお勉強してみた。その2'
---

# 目的

_React_ とりあえず触ってみようと思ったら環境構築の選択肢が複数あるっぽい

- _create-react-app_
- _Next.js_
- _GatsbyJS_

静的サイト作るなら _Gatsby_ がいいらしいので、ポートフォリオサイト作りがてら勉強してみましょうという流れ

# WSL2 の Ubuntu ディストリビューション上に立てる

はじめは _Docker_ で建てようと思って作業していたら、さすがにホットリロードしてくれなかったので _WSL2_ で構築する。

## 手順

作業手順とは言っても[公式ドキュメント（英語）](https://www.gatsbyjs.org/docs/gatsby-on-linux/#windows-subsystem-linux-wsl)の通りにやるだけなので別に難しいことはなかった。

いつも通りアップデートとアップグレード

```bash
$ sudo apt update
$ sudo apt -y upgrade
```

ビルドツールのインストール

```bash
$ sudo apt install -y build-essential
```

_nvm_ だと _WSL_ が重くなるらしいので、 _n_ をインストールして

```bash
$ curl -L https://git.io/n-install | bash
```

`n`コマンドで新し目の _node_ のインストール。`n`コマンドないよって言われるときは _bash_ を再起動。

```bash
$ n lts
```

旧 ver を消しときます。

```bash
$ sudo apt purge -y nodejs npm
$ exec $SHELL -l
```

インストールする。 _npm_ じゃなくて _yarn_ がいいよって人は事前インストールして、グローバルコマンドのパスが通ってないっぽいので通しときます。

```bash
$ npm install -g gatsby-cli
 # or
$ yarn global add gatsby-cli
```

確認できたら終わり。

```bash
$ gatsby --help
```

好きなテーマをインストールして、`localhost:8000`で確認。  
下記例だと Hello, World!が出てくるだけの超シンプル構成。

```bash
$ gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
$ cd hello-world
$ gatsby develop
```
