---
type: 'post'
slug: 'TUQGudP5E8BmB'
date: 2020-08-28T01:32:00+0900
title: '【AWS】EC2にWebサーバーをインストールしてサイトを表示してみよう'
description: 'AWS EC2にインスタンスをたてて、Webページを表示するまでの流れ'
---

# 概要

AWS の EC2 にインスタンスをたてて、Web ページを表示するまでの流れ。

- [概要](#概要)
- [AWS アカウントを作る](#awsアカウントを作る)
  - [セキュリティ設定](#セキュリティ設定)
- [EC2 の無料枠を使う](#ec2の無料枠を使う)
  - [インスタンスを作る](#インスタンスを作る)
  - [SSH ログインしてみる](#sshログインしてみる)
- [他やっといたほうがよさげな設定](#他やっといたほうがよさげな設定)
  - [日本語環境に変える](#日本語環境に変える)
- [この後](#この後)

# AWS アカウントを作る

メールアドレスとクレジットカードを登録して画面に言われるままにやります。

## セキュリティ設定

やったこと。

- ルートアカウントの保護（MFA による二段階認証）
- IAM ユーザーの作成（ルートアカウントを使わない）
  - ユーザー作成
  - グループ作成と権限付与
- パスワードポリシーの設定
- IAM ダッシュボードのセキュリティステータスを確認（全部緑に）

下記記事を参考にして作業する。  
[AWS アカウントを取得したら速攻でやっておくべき初期設定まとめ](https://qiita.com/tmknom/items/303db2d1d928db720888)

# EC2 の無料枠を使う

アカウント作成から 1 年は月 750 時間までの稼働なら無料で使える。つまり 1 台のインスタンスだけならフルで起動しても問題ない。

## インスタンスを作る

インスタンスを下記の通り作ってみる。

- リージョン：東京
- AMI：Ubuntu Server 18.04 LTS
- インスタンスタイプ：t2.micro

無料枠で作るのでそのまま画面の指示通りに作るだけです。  
私は使い慣れてるので Ubuntu にしてますが、基本は思考停止で Amazon Linux でいいと思います。

`***.pem`のようなファイルを作成してダウンロードしますが、こちらはあとで OpenSSH で接続する際に使用します。

## SSH ログインしてみる

コマンドラインツールから、作業ディレクトリにキーペアファイルをコピーするか、ファイルがあるディレクトリに移動します。

インスタンス一覧画面で接続するインスタンスを選択 > 接続 > スタンドアロン SSH クライアント の下記に表示されている 例 のコマンドを叩いてください。

```bash
$ ssh -i "aws_lesson.pem" ubuntu@ec2-***-***-***-***.ap-northeast-1.compute.amazonaws.com
```

Permission エラーが出る場合は鍵ファイルのパーミッションを変更します。

```bash
$ chmod 600 aws_lesson.pem
```

AWS インスタンスの中に入れたら成功！

```bash
$ ssh -i "aws_lesson.pem" ubuntu@ec2-***-***-***-***.ap-northeast-1.compute.amazonaws.com
Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 5.3.0-1032-aws x86_64)

~~~ 中略 ~~~

*** System restart required ***
Last login: Wed Aug 26 18:48:06 2020 from 126.220.96.81
ubuntu@******:~$
```

いつものやつをやります。

```bash
$ sudo apt update
```

雑に Apache をインストールしてみる。

```bash
$ sudo apt install apache2
```

ポートが閉じられているので、ユーザーグループからポート番号 80 を開放し、**パブリック IP アドレス**や**パブリック DNS**をブラウザに入力し接続します。

Apache の index ページが表示されたら OK。

# 他やっといたほうがよさげな設定

## 日本語環境に変える

日本語パッケージをダウンロード。

```bash
$ sudo apt install language-pack-ja-base language-pack-ja ibus-mozc
```

日本語設定に変更。

```bash
$ sudo localectl set-locale LANG=ja_JP.UTF-8 LANGUAGE="ja_JP:ja"
```

確認してみる。

```bash
$ echo $LANG
ja_JP.UTF-8
```

日本語表記の時間になっている。（タイムゾーンは UTC のまま）

```bash
$ date
2020年  8月 27日 木曜日 07:12:59 UTC
```

`.bashrc`に下記を追記。

```.bashrc
case $TERM in
    linux) LANG=en_US.UTF-8;;
    *)     LANG=ja_JP.UTF-8;;
esac
```

`アジア > 東京`を選択

```bash
$ sudo dpkg-reconfigure tzdata
```

JST に変わっていることを確認

```bash
$ date
2020年  8月 27日 木曜日 16:14:15 JST
```

# この後

今後やっといたほうがよさげなこと。

- Terraform でここまでの流れを自動化する。
- Elastic IP を設定して IP アドレスを固定する。
- ロードバランサーを設定して https アクセスできるようにする。（有料）
