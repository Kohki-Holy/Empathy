---
type: 'post'
slug: '7QERUH7M4Mmf8'
date: 2020-08-29T03:09:00+0900
title: '【Linux】自分用によく使うLinuxコマンドをまとめました。'
description: '自分用によく使うLinuxコマンドをまとめました。'
---

# 概要

自分用によく使う Linux コマンドをまとめました。気ままに追記していきます。

- [概要](#概要)
- [ファイル・ディレクトリ関連](#ファイルディレクトリ関連)
  - [pwd](#pwd)
  - [ls](#ls)
  - [tree](#tree)
  - [cd](#cd)
  - [mkdir](#mkdir)
  - [touch](#touch)
  - [mv](#mv)
  - [cp](#cp)
  - [rm](#rm)

# ファイル・ディレクトリ関連

## pwd

絶対パスを表示する。

```bash
$ pwd
/var/www/html
```

## ls

ファイルとディレクトリを表示する。
| オプション | 効果 |
| ---------- | ------------------------------------------------ |
| -a | 隠しファイルを表示する |
| -l | パーミッションやユーザーなどの詳細情報を表示する |

```bash
$ ls -al
total 15740
drwxr-xr-x   12 user user     4096 Aug 17 08:34 .
drwxr-xr-x    5 user user     4096 Aug 27 02:03 ..
drwxr-xr-x    8 user user     4096 Aug 28 01:36 .git
-rw-r--r--    1 user user      996 Aug 14 18:36 .gitignore
-rw-r--r--    1 user user     2594 Aug 13 06:40 package.json
```

## tree

ディレクトリツリーを表示してくれるやつ。

```bash
$ tree
.
|-- src
|   |-- js
|   |   `-- index.js
|   `-- css
|       `-- index.css
`-- index.html
```

## cd

カレントディレクトリの変更

```bash
$ cd /home/user
```

## mkdir

ディレクトリを作る

| オプション | 効果                         |
| ---------- | ---------------------------- |
| -p         | 多段階層のディレクトリを作る |

```bash
$ mkdir project
$ mkdir -p project/public
```

## touch

ファイルを作る。本来はファイルのタイムスタンプを変更するときに使うらしい。

| オプション | 効果                             |
| ---------- | -------------------------------- |
| -date      | タイムスタンプを任意の時刻にする |

```bash
$ touch index.php
$ touch --date  "20200101 00:00:00" index.php
```

## mv

ファイル・ディレクトリの移動・リネーム

| オプション | 効果                         |
| ---------- | ---------------------------- |
| -f         | 強制実行。確認がうざいときに |

```bash
$ mv js src/
$ mv ./css/index.css ./css/layout.css
```

## cp

ファイル・ディレクトリのコピー

| オプション | 効果                         |
| ---------- | ---------------------------- |
| -f         | 強制実行。確認がうざいときに |
| -r         | 再帰的に実行                 |
| -p         | パーミッションを保持         |

```bash
$ cp index.html index2.html
```

## rm

ファイル・ディレクトリの削除
| オプション | 効果 |
| ---------- | ---------------------------- |
| -f | 強制実行。確認がうざいときに |
| -r | 再帰的に実行 |

```bash
$ rm -rf css/
```
