---
type: 'post'
slug: 'x4w9x6kj5r2nj'
date: 2020-07-29T15:48:00+0900
title: 'Vagrantfileのよく使いそうな設定項目'
description: 'Vagrantfileのよく使いそうな設定項目'
---

# 概要

言語化してアウトプットしたほうが理解もしやすいだろうということで。  
学習中のため、認識が間違っている箇所もあるかと思いますがご容赦ください。

# 目的

初回学習時は手順のみで流して、中身まで理解していなかった Vagrantfile への理解。

# 学習環境

- Windows10 Home
- ubuntu18.04
- VirtualBox

# 参考

公式ドキュメント（英語）

- Vagrantfile Overview：https://www.vagrantup.com/docs/vagrantfile
- VirtualBox 用：https://www.vagrantup.com/docs/providers/virtualbox/configuration

# 作成

```
$ vagrant init
```

上記コマンドで作成される。

```
$ vagrant init bento/ubuntu-18.04
```

こちらは BOX 名の指定。

# 設定項目

```
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-18.04"
end
```

初期コメントを取り除いた状態。

以下、よく使いそう設定項目と詳細。

```
Vagrant.configure("2") do |config|

# BOX名
  config.vm.box = "bento/ubuntu-18.04"

# ネットワーク設定
# IPアドレスの固定
  config.vm.network :private_network, ip: "192.168.56.100"

# ローカルマシン host の 80 番ポートへのアクセスが guest の 8080 番ポートへ転送される。
# http://[ホストIPアドレス]:8080
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network :forwarded_port, guest: 22, host: 2222, id:"ssh"

# 共有フォルダの指定。こちらの例では Vagrantfile が存在するフォルダが /var/www/hoge 。
  config.vm.synced_folder "./", "/var/www/hoge"

# VirtualBox Guest Additionsの自動アップデート無効化
  config.vbguest.auto_update = false

# host名
  config.vm.hostname = "ubuntu1804"

# プロバイダの指定
  config.vm.provider "virtualbox" do |vb|
    # GUIの有無
    vb.gui = false
    # 仮想マシンの名前
    vb.name = "ubuntu1804"
    # 仮想マシンが使用するメモリ (MB)
    vb.memory = 2048
    # 仮想マシンが使用するCPU
    vb.cpus = 4
    vb.customize [
      "modifyvm", :id,
      "--cableconnected1", "on"
    ]
  end

end

```
