---
type: 'post'
slug: 'ytefxxm969rsj'
date: 2020-07-31T18:05:00+0900
title: 'Vagrant + VirtualBox 環境で vagrant up が "SSH auth method: private key" でタイムアウトする問題への対策'
description: 'Vagrant + VirtualBox 環境にて、vagrant up した時に default: SSH auth method: private key ここで処理が止まってしまうことがある。'
---

# はじめに

Vagrant + VirtualBox 環境にて、vagrant up した時に

```sh
default: SSH auth method: private key
```

ここで処理が止まってしまうことがある。

新旧情報含めて、解消手段がいくつかあるようなのでとりあえず全て確認してみる。

# Vagrantfile を見直す

```sh
$ vagrant reload
```

書き換えたらこのコマンドを実行すること。

まず、とりあえず最低限の記述にして、記述ミスがないことを確認する。

```sh
Vagrant.configure("2") do |config|
    # box名
    config.vm.box = "bento/ubuntu-18.04"
end
```

ネットワーク設定あたりは注意が必要。

```sh
# タイムアウト
  config.vm.boot_timeout = 300
```

タイムアウト時間に余裕をもたせる。あんまり関係ない。

```sh
  config.vm.provider "virtualbox" do |vb|
    vb.customize [
      "modifyvm", :id,
      "--cableconnected1", "on"
    ]
  end
```

この設定を追記する。  
VirtualBox のどこかのバージョンでここの設定がオフになっちゃう不具合があったらしい。  
なくても動くはずだが一応メモ。

# Vagrant 　や VirtualBox のバージョンを確認

**Vagrant**

```sh
$ vagrant --version
```

Vagrant のバージョン確認用コマンド

```sh
$ vagrant plugin update
```

Vagrant のバージョンアップ

**VirtualBox**
私の Windows 10 Home + Vagrant 2.2.9 + VirtualBox 6.1.12 + ubuntu 18.04 の環境だと止まったので  
VirtualBox を 6.0.24 へダウングレードして解決しました。  
~~むやみに最新にしないほうがいいかもしれません。~~  
→ VirtualBox Guest Additions 導入に際して、ホスト側の VirtualBox のバージョンが低いと怒られたので、6.1.12 に戻した。  
問題なく動作しているので、Vagrantfile の記述をしっかりしていれば問題なさそう。
