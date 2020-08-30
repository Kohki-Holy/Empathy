---
type: 'post'
slug: 'AnS5gHHajLzhG'
date: 2020-08-30T20:14:00+0900
title: '【Terraform】構成管理ツールでAWC EC2インスタンスをデプロイする'
description: 'EC2無料枠で立てられるインスタンスをTerraformで自動的にたててみたというだけの記事です。'
---

# 概要

EC2 無料枠で立てられるインスタンスを Terraform で自動的にたててみたというだけの記事です。

# Infrastructure as Code とは

そのまま直訳すると「インフラをコード化する」みたいな感じだと思います。  
クラウドサービスの場合、画面をポチポチしてインフラ環境を構築しますが、実際の業務では一つの操作で終わりなんてことはまずないため、ヒューマンエラーが起こりえます。

そこで IaC を用いて「構築の自動化」「構成の管理」をするのが最近のトレンドだとかなんとか。  
単純な工数の低減はもちろん、人為的なミスや、無駄なドキュメントの更新なども減らせますね。

デメリットとしては学習コストが上がることくらいでしょうか。

# Terraform とは

Terraform は私もお世話になっている Vagrant の開発元である HashiCorp によって制作されています。

更新頻度が凄まじいらしいです。
インフラ構成の立ち上げを Terraform で、OS 内部の構成を Ansible や CHEF でやるのがいい感じですかね？多分。

AWS では CloudFormation というサービスがこれと同じ役割を担っているみたいです。  
CGP や Azure など他のクラウドサービスを業務で使用しているようであれば、こちらで同じフォーマットで管理したほうがいいよねみたいなことですね。

# インストール

zip ファイルを取って来て解凍してパスを通して終わりです。

```bash
$ wget https://releases.hashicorp.com/terraform/0.9.0/terraform_0.9.0_linux_amd64.zip
$ unzip terraform_0.9.0_linux_amd64.zip
$ mv terraform /usr/bin/

$ terraform -v
```

公式ドキュメント読む感じだと AWS-CLI をインストールする必要があります。  
IAM で Terraform 用のユーザーを登録しといてアクセスキーを設定しときましょう。

```bash
$ aws configure
```

# tf ファイルの編集

テンプレートは HCL (HashiCorp Configuration Language)という HashiCorp 製の独自言語で記述します。  
Vagrantfile と同じですね。

ファイル作成。

```bash
$ touch example.tf
```

中身を編集。  
東京リージョンの EC2 に ubuntu のインスタンスを建てる記述です。無料枠内の設定みたいです。

```vagrantfile
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "ap-northeast-1"
}

resource "aws_instance" "example" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"
}

```

# 実行

ディレクトリを初期化するコマンドです。

```bash
$ terraform init
```

成形とバリデーション用のコマンドもあるみたいです。

```bash
$ terraform fmt

$ terraform validate
```

検証用のドライランコマンド。一定バージョン以下の Terraform では`apply`前に`plan`する必要があるみたいです。

```bash
$ terraform plan
```

これが本実行。ドキュメント読む感じでは一定バージョン以上だと`apply`前に自動で`plan`されるっぽいですね。

```bash
$ terraform apply
```

途中で`yes`入力を求められたりして、EC2 インスタンスが立ちました。
