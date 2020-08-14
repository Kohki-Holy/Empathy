---
type: 'post'
slug: 'iyenzjxfmra43'
date: 2020-08-07T21:45:00+0900
title: 'Docker Compose で Laravel （ LEMP ）環境を作った'
description: 'Docker + Docker Compose で Laravel の開発環境を作った際の手順メモ。'
---

_Docker_ + _Docker Compose_ で _Laravel_ の開発環境を作った際の手順メモ。

目次

- [1. 学習目的](#1-学習目的)
- [2. _Docker_ + _Docker Compose_ の導入](#2-docker--docker-compose-の導入)
- [3. Web サーバー（ _Nginx_ ）をたてる](#3-webサーバー-nginx-をたてる)
  - [3.1. 何故 _Apache_ ではなく _Nginx_ なのか](#31-何故-apache-ではなく-nginx-なのか)
  - [3.2. 実際にコンテタをたてる](#32-実際にコンテタをたてる)
- [4. _Nginx_ 上で PHP を動かす](#4-nginx-上でphpを動かす)
- [5. DB サーバー（ _MySQL_ ）をたてる](#5-dbサーバー-mysql-をたてる)
- [6. _Laravel_ を導入する](#6-laravel-を導入する)

# 1. 学習目的

1. _Docker_ + _Docker Compose_ での環境構築の理解
2. PHP 環境の構築の理解
3. _Homestead_ 等のパッケージを使用せずに _Laravel_ 環境を作ってみる

# 2. _Docker_ + _Docker Compose_ の導入

Vagrant 環境なら以下コマンドで両方終わる。

```bash
vagrant plugin install vagrant-docker-compose
```

→ [正式な手順は以前の記事](https://holy1994.qrunch.io/entries/WzWCCrBUx9GpwfGR)

# 3. Web サーバー（ _Nginx_ ）をたてる

何にしろ Web サーバーをたてんことには始まらないので、 _Nginx_ コンテナを用意して HTML ファイルを表示させてみる。

## 3.1. 何故 _Apache_ ではなく _Nginx_ なのか

特に論理的な理由はないが、 _Nginx_ の方が最近は主流らしいことと、 _Apache_ は触ったことがあるので学習のために。  
突き詰めればお互い得意分野が違うだろうから、開発・運用するサービスによって選ぶべきなんだろうがそこまでの知識はまだない。

## 3.2. 実際にコンテタをたてる

作業ディレクトリに下記構成でファイル・ディレクトリを用意。

```bash
.
├── docker
│   ├── web
│   │   └── default.conf # Nginx設定用のファイル
│   └── php
├── docker-compose.yml   # Docker Compose設定用のYAMLファイル
└── index.html           # テスト表示用のHTMLファイル
```

一応、ディレクトリとファイルの作成コマンドはこう。

```bash
$ mkdir ディレクトリ名
$ touch ファイル名
```

_docker-compose.yml_ の編集。  
今回はひとつのみだが、 _Nginx_ コンテナを複数設置してリバースプロキシでの分散処理も出来るっぽい。 _Docker_ 便利すぎて草。

```yaml
version: '3'
services:
  web:
    image: nginx:stable
    ports:
      - '80:80'
    volumes:
      - ./docker/web/default.conf:/etc/nginx/conf.d/default.conf
      - .:/var/www/html
```

- **_version_** _docker-compose.yml_ のバージョン宣言。
- **_services_** こっからコンテナの定義していきますよ的な。
  - **_web_** コンテナの名前。この下階層が _web_ コンテナの定義になる。**しかも名前解決できる**。いやマジ _Docker_ 便利すぎて草。
    - **_image_** 作成時に使用する _Docker_ イメージを指定 `:stable` の部分はバージョンの指定、安定版を取得。この記述では _Docker Hub_ から取ってきている。
    - **_ports_** ポートフォワードの指定。`ホスト:コンテナ`。今回では仮想マシン上に乗っていて、そちらでホスト：8000、ゲスト：80 を指定しているので、この記述で http://localhost:8000 にブラウザでアクセスすれば表示されるはず。
    - **_volumes_** ホストとコンテナ間のファイル共有の設定。コンテナを止めると変更したファイルは消えてしまうので、ホスト側で保持する。

_default.conf_ の編集

```
server {
    listen 80;
    root  /var/www/html;
    index index.php index.html index.htm;
    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log;
}
```

- **_listen_** リクエストを受け付ける IP アドレス・ポート番号の指定。IP アドレスは省略。
- **_root_**, **_index_** ドキュメントルートディレクトリとファイルの設定。 `index` は右から優先される。
- **_access_log_**, **_error_log_** そのまま各ログの出力先の設定。

_index.html_ の編集

```html
<h1>Hello, World on Docker!</h1>
```

コマンドを実行してコンテナを起動

```bash
$ docker-compose up -d
```

- `-d` オプションでバックグラウンドで実行する。とりあえずつけとけ。

http://localhost:8000 にアクセスして _index.html_ が表示されるのを確認。

# 4. _Nginx_ 上で PHP を動かす

_docker-compose.yml_ に _PHP-FPM_ コンテナ定義を追加。追加したところハイライトしたい……。

```yaml
version: '3'
services:
  web:
    image: nginx:stable
    ports:
      - '80:80'
    depends_on:
      - app
    volumes:
      - ./docker/web/default.conf:/etc/nginx/conf.d/default.conf
      - .:/var/www/html
  app:
    image: php:7.2-fpm
    volumes:
      - .:/var/www/html
```

- **_web_** 下記を追加。
  - **_depends_on_** 依存関係を示す。ざっくり言うとコンテナの起動順。こいつが起動したら起動しますよ、的な記述。"Depends on you."で「あなた次第よ」なんて言ったりしますね。 ~~浜崎あゆみ。~~
- **_app_** PHP 用コンテナの名前。
  - **_image_**, **_volumes_** web と同じ。

_default.conf_ に PHP 実行用の記述を追加。

```
server {
    listen 80;

    root /var/www/html;
    index index.php index.html index.htm;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass app:9000;
        fastcgi_index index.php;

        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```

- **_location_** URL でどのファイルを返すかの設定。ここはよく分からんかったので別記事を参考に。 `location` の後のプレフィックスによって一致の仕方が変わる。 ※
  - **_try_files_** ファイルの存在確認。この記述ではリクエストのあったファイルやディレクトリが存在しない場合は、`index.php` を返す となってます。`$is_args$args` は GET パラメータのこと。
- **_location_** ~.php で終わるファイルに対しての処理
  - **_fastcgi_split_path_info_** 正規表現で `$fastcgi_script_name`（1 つ目） と `$fastcgi_path_info`（2 つ目） の値を定義している。
  - **_fastcgi_pass_** プロキシ設定。PHP を処理するために投げている。本来 `IPアドレス:ポート番号` で指定するところを、`app` で名前解決している。
  - **_fastcgi_index_** スラッシュで終わる URL に追加するファイル名。 `$fastcgi_script_name` の値になる。
  - **_include_** 設定ファイルのインクルード。
  - **_fastcgi_param_** FastGGI にわたすパラメータの設定。

| プレフィックス | 説明                                               |
| -------------- | -------------------------------------------------- |
| なし           | 前方一致                                           |
| ^~             | 前方一致。一致したら、正規表現の条件を評価しない。 |
| =              | 完全一致。パスが等しい場合。                       |
| ~              | 正規表現（大文字・小文字を区別する）               |
| ~\*            | 正規表現（大文字・小文字を区別しない）             |

※参考記事：[nginx 連載 5 回目: nginx の設定、その 3 - location ディレクティブ](https://heartbeats.jp/hbblog/2012/04/nginx05.html)

index.php を用意して。

```php
<?php phpinfo();?>
```

コンテナを再起動してから。

```bash
$ docker-compose down
$ docker-compose up -d
```

表示を確認。  
http://localhost:8000

# 5. DB サーバー（ _MySQL_ ）をたてる

いつもの。

```yaml
version: '3'
services:
  web:
    image: nginx:stable
    ports:
      - '80:80'
    depends_on:
      - app
    volumes:
      - ./docker/web/default.conf:/etc/nginx/conf.d/default.conf
      - .:/var/www/html
  app:
    image: php:7.2-fpm
    volumes:
      - .:/var/www/html
    depends_on:
      - mysql
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: sample
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: password
    ports:
      - '3306:3306'
    volumes:
      - mysql-data:/var/lib/mysql
volumes:
  mysql-data:
```

- **_app_** 下記追加。
  - **_depends_on_** 名前解決。
- **_mysql_** _MySQL_ 用コンテナ定義。
  - **_image_**, **_ports_**, **_volumes_** いつもの。
  - **_environment_** ログイン設定。
    - **_MYSQL_DATABASE_**, **_MYSQL_USER_**, **_MYSQL_PASSWORD_**, **_MYSQL_ROOT_PASSWORD_** 詳細
- **_volumes_** トップレベルに書くことで他コンテナからも `mysql-data` を参照できるように。

コンテナを再起動して、 _MySQL_ コンテナに入る。  
ちなみに _VScode_ （ _Remote Development_ + _Docker_ プラグイン導入済み）なら、再起動後、 _MySQL_ コンテナを右クリックして `Attach Shell` でもログイン可能。便利だね _VScode_ 。

```bash
$ docker-compose down
$ docker-compose up -d
$ docker-compose exec mysql bash
```

MySQL にログイン。パスワード入力しろって出ます。

```bash
mysql -h localhost -u user -p
```

データベース一覧を確認。

```mysql
show databases;
```

下記のように表示されれば ok。

```mysql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| sample             |
+--------------------+
```

# 6. _Laravel_ を導入する

`docker/php` に Dockerfile を作成。  
このファイルでやっていることはコメントに記述。

```dockerfile
FROM php:7.2-fpm

# composerのインストール
RUN cd /usr/bin && curl -s http://getcomposer.org/installer | php && ln -s /usr/bin/composer.phar /usr/bin/composer
# git, zip, unzip, vimのインストール
RUN apt-get update \
&& apt-get install -y \
git \
zip \
unzip \
vim

# PDOのインストール
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql

# 作業ディレクトリの指定
WORKDIR /var/www/html
```

_Dockerfile_ から _app_ コンテナを立ち上げるようにする。

```yaml
version: '3'
services:
  web:
    image: nginx:stable
    ports:
      - '80:80'
    depends_on:
      - app
    volumes:
      - ./docker/web/default.conf:/etc/nginx/conf.d/default.conf
      - .:/var/www/html

  app:
    build: ./docker/php
    volumes:
      - .:/var/www/html
    depends_on:
      - mysql

  mysql:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: sample
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: password
    ports:
      - '3306:3306'
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

- **_app_** 下記追加。
  - **_build_** `image` を置き換え。Dockerfile があるディレクトリを参照する。

コンテナを再起動。PHP に入って、 _Dockerfile_ からインストールした _Composer_ を使って _Laravel_ プロジェクトを作成。

```bash
composer create-project --prefer-dist laravel/laravel プロジェクト名
```

結構時間がかかりますが _docker-compose.yml_ と同じディレクトリに 上で指定したプロジェクト名と同じディレクトリが出来て、その中に _Laravel_ のファイル群が展開されています。

プロジェクトディレクトリの中の _.env_ を編集して、 _MySQL_ と接続。

```.env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=sample
DB_USERNAME=user
DB_PASSWORD=password
```

コンテナ再起動、php ログインして、マイグレートをかける。

```
php artisan migrate
```

_default.conf_ の `root` も _Laravel_ のために変更しておきましょう。

```
root /var/www/html/my-laravel-app/public;
```

はい、これでコンテナ再起動して、いざ http://localhost:8000 へ！
_Laravel_ のトップページが表示されてたら OK。

Git にあげる場合は _.env_ 等をトラッキングから外すのを忘れないこと。

以上。
