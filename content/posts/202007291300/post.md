---
type: 'post'
slug: '3mg3jup5tty6c'
date: 2020-07-29T13:00:00+0900
title: 'Docker と Docker Compose を Vagrant 環境に導入してみる'
description: 'Docker と Docker Compose を Vagrant 環境に導入してみる'
---

# 概要

言語化してアウトプットしたほうが理解もしやすいだろうということで。  
学習中のため、認識が間違っている箇所もあるかと思いますがご容赦ください。

# そもそも _Docker_ とはなんぞや

実行環境をラップしてくれる。複数の開発環境が PC に入っているとコマンドが衝突したりするのを防げる。  
個人ごと、または開発・本番の環境の差異を吸収したり、または共有を簡単にして同じ環境を容易に作れる。  
VM と違い、 _Docker_ はホスト OS の使えるところは使うので動作が軽い。

# じゃあ _Docker Compose_ ってなんぞや

バラバラのコンテナを一括管理できるツール。  
設定などを yaml ファイルで書くので可読性が高い。  
_Docker_ のコンテナを立てるにはコマンドを 1 行書く。  
1 行で済むと言っても、サーバーやらデータベースやらその他ライブラリやらあると煩わしい。  
そんな環境構築を一瞬で出来ますよ、的なヤツ。

# なんでわざわざ VM 上に置くのか

Docker Desktop は Hyper-V で動作するため Windows10 Home では使えない。  
Docker ToolBox というアプリケーションもあるらしいが、要するに VirtualBox と一緒にパッケージ化されたものらしいので、じゃあそれ使わないほうが本番環境に _Docker_ 導入する練習にもなるんじゃね、というプロセス。  
あと古めの情報では結構「Windows 上に置くな」って言われていたので、万が一現在でもそういったどうしようもなさそうな不具合があると学習意欲が削げるのでそれの回避。

# _Docker_ を導入する

**参考資料**  
これ理解すれば何とかなりそうな日本語ガイド: https://y-ohgi.com/introduction-docker/  
コピペすれば何とかなりそうな公式ドキュメント（英語）: https://docs.docker.com/engine/install/ubuntu/

`apt-get` は `apt` に既に置き換えてもいいらしいけど、とりあえずドキュメント通りに。

```
$ sudo apt-get update
```

更新して。

```
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

インストール。

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

_GPG Key_ とやらを追加して _Docker_ のパッケージを復号化する。

```
$ sudo apt-key fingerprint 0EBFCD88
```

これがよく分からんのだけど、public key と照らし合わせてるのかな？

```
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

レポジトリの登録

```
 $ sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

アップデートして、最終インストール。

```
$ apt-cache madison docker-ce
```

必要な時はバージョン確認して。

```
$ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io
```

バージョンを指定してインストール。（本来は常にやったほうがいいんだろうな）

開発環境では毎回 sudo で `docker` コマンドを使うのは面倒なので `docker` というグループに突っ込む。

```
$ sudo groupadd docker
```

多分初期からグループは存在しているけど、一応作成方法メモ。

```
$ sudo usermod -aG docker ここにユーザー名
```

グループに入れ終わったら、ログアウト → 再ログイン。
"Remember to log out and back in for this to take effect!" です。

インストール作業終了、ドキュメントが丁寧なおかげでチョロいですね。

# _Docker Compose_ 編

**参考**
公式ドキュメント（英語）：https://docs.docker.com/compose/install/

```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

curl でダウンロードしてきて。

```
sudo chmod +x /usr/local/bin/docker-compose
```

バイナリに実行権限付与。

```
docker-compose --version
```

インストール確認。

終わりです。爆速～。
