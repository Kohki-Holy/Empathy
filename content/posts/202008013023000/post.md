---
type: 'post'
slug: '7a8u9ezf8fy23'
date: 2020-08-13 02:30:00
title: 'VSCode + ESLint + Prettier の設定を完全に理解した【公式の英語ドキュメントに結論書いてた】'
description: 'VSCode + ESLint + Prettier の設定を完全に理解した【公式の英語ドキュメントに結論書いてた】'
---

# 概要

_ESLint_ と _Prettier_ の設定に関して検索するとマジで情報が錯綜しすぎてどれが正解か分からないので、諦めて式ドキュメントを読みに行ったところ、普通に結論が書いてたので共有します。

叶えたいこと。

- _Prettier_ には整形をやらせる。 (ソースの統一性を保つ。 `eslint --fix` は使わない)
- _ESLint_ にはコード品質チェック (バグチェック) をやらせる。

他の記事と書いてあることが逆なこともあります。

# 結論

- _eslint-config-prettier_ ( _ESLint_ の整形設定周りを全部オフにする) を入れて _ESLint_ に整形させない。
- _eslint-plugin-prettier_ ( _ESLint_ から _Prettier_ を動かす) は入れるな。
- つまり _Prettier_ は CLI でコマンドを叩くか、VSCode から実行する。
  - `editor.formatOnSave` を `true` にしてフォーマッタを _Prettier_ に変更する。
  - 設定ファイル ( `.prettierrc.json` ) を VSCode に読み取らせる。

以上です。
お疲れ様でした。

# 解説

というわけにもいかないので、公式ドキュメントを引用していきながら書きます。

## 前提

- 拡張機能 _ESLint_ と _Prettier_ を VSCode にインストールする。
- _ESLint_ と _Prettier_ を開発環境にインストールする。

## _eslint-config-prettier_ を入れて _ESLint_ に整形させない

_eslint-config-prettier_ は _ESLint_ の整形設定 ( _Prettier_ と競合する設定 ) を全てオフにしてくれます。  
_npm_ や _yarn_ でインストールした後、 _ESLint_ の設定ファイルに追記します。

インストールします。

```bash
$ yarn add -D eslint-config-prettier
```

`.eslintrc.js` の `extends` 末尾に以下を追記。  
`prettier` 以外は必要に応じて抜き差ししてください。

```js
module.exports = {
  extends: [
    'prettier', // 最低限必要
    'prettier/@typescript-eslint',
    'prettier/react'
    'prettier/vue',
    'prettier/babel',
    'prettier/flowtype',
    'prettier/standard',
    'prettier/unicorn',
  ],
};
```

`extends` は別の設定ファイルを呼び出している記述です。  
つまり、 `prettier*` に _ESLint_ の設定を上書きしてもらわねければないので、他の `extends` を記述している場合はその後ろに追記するようにしてください。

_ESLint_ 側の設定は終わりです。

`eslint:recommended` など、他のコード品質ルール等に関しては都度設定してください。

また、`extends` が何の設定をしているか見たい場合は、 `node_modules/eslint-*` のディレクトリの中身を参照してください。多分大体 `index.js` に書いてます。

## _eslint-plugin-prettier_ は入れるな

要約すると「 ** _Pretter_ はエディタで大体対応してるからわざわざ _ESLint_ から呼んでると、下線増えてウザいし重くなるからやめとけ** 」て感じです。

_Prettier_ 公式ドキュメントより参考：

> When searching for both Prettier and your linter on the Internet you’ll probably find more related projects. These are generally not recommended, but can be useful in certain circumstances.
>
> First, we have plugins that let you run Prettier as if it was a linter rule:
>
> - eslint-plugin-prettier
> - tslint-plugin-prettier
> - stylelint-prettier
>
> These plugins were especially useful when Prettier was new. By running Prettier inside your linters, you didn’t have to set up any new infrastructure and you could re-use your editor integrations for the linters. But these days you can run prettier --check . and most editors have Prettier support.
>
> The downsides of those plugins are:
>
> - You end up with a lot of red squiggly lines in your editor, which gets annoying. Prettier is supposed to make you forget about formatting – and not be in your face about it!
> - They are slower than running Prettier directly.
> - They’re yet one layer of indirection where things may break.

Integrating with Linters: https://prettier.io/docs/en/integrating-with-linters.html

じゃあ整形はどうするのかというと次項。

## _Prettier_ は CLI でコマンドを叩くか、VSCode から実行する

### CLI から実行する場合

```bash
$ yarn run prettier --write .
```

### VSCode から実行する場合

`setting.json` に以下を追記します。

```json
{
  "editor.formatOnSave": true, // 保存時に自動整形
  "editor.codeActionsOnSave": {
    // 保存時のアクション設定
    "source.fixAll.eslint": true // ESLintが走るようにする。ESLintの設定をちゃんとしてれば整形はされない。
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode", // フォーマッタにPrettierを指定
  "prettier.configPath": ".prettierrc.json" // Prettierの設定ファイルを読み込む
}
```

ショートカットキーを設定する方法もありますが、わざわざ無駄なショートカットキーを登録するのもアホらしいので、全ファイル横断したい場合は CLI から叩くほうがいいでしょう。  
_npm scripts_ に登録しとけば長いコマンド入力しなくても済みますね。

一括でフォーマッターの設定をするのが嫌な場合は言語ごとにも指定できます。

```json
  "editor.formatOnSave": false,
  "[javascript]": {
    "editor.formatOnSave": true,
  },
```

`prettier.configPath` はフォーマット時の VSCode 側の拡張機能設定を上書きするために設定します。  
コマンドを実行しない場合は、VSCode 側で設定して `setting.json` を共有してもいいと思います。  
`.prettierrc*` はプロジェクトに合わせて[公式ドキュメントのオプション一覧](https://prettier.io/docs/en/options.html)を見ながら書けばいいと思います。

#### 設定の優先度について

1.  _Prettier_ 設定ファイル ( `.prettierrc*` )
2.  `.editorconfig` (これよくわからん)
3.  VSCode の設定 ( `setting.json` )

なお _Prettier_ 設定ファイルが存在する場合、VSCode の設定は使用 **されない** 。  
まあ中途半端に設定混在されても困りますからね。

_Prettier_ 公式 Github README より参考：

> ## Visual Studio Code Settings
>
> You can use VS Code settings to configure prettier. Settings will be read from (listed by priority):
>
> 1.  Prettier configuration file
> 2.  .editorconfig
> 3.  Visual Studio Code Settings (Ignored if any other configuration is present)
>
> NOTE: If any local configuration file is present (i.e. .prettierrc) the VS Code settings will **NOT** be used.

Prettier Formatter for Visual Studio Code: https://github.com/prettier/prettier-vscode#user-content-visual-studio-code-settings

# 最後にもう一回やることをおさらい

1. 拡張機能 _ESLint_ と _Prettier_ を VSCode にインストールする。
2. _ESLint_ と _Prettier_ を開発環境にインストールする。
3. _eslint-config-prettier_ をインストールする。

```bash
$ yarn add -D eslint-config-prettier
```

4. `.eslintrc.js` の `extends` 末尾に以下を必要に応じて追記。

```js
module.exports = {
  extends: [
    'prettier', // 最低限必要
    'prettier/@typescript-eslint',
    'prettier/react'
    'prettier/vue',
    'prettier/babel',
    'prettier/flowtype',
    'prettier/standard',
    'prettier/unicorn',
  ],
};
```

5. _eslint-plugin-prettier_ は入れるな。
6. VSCode を使う場合、`setting.json` に以下を追記します。

```json
{
  "editor.formatOnSave": true, // 保存時に自動整形
  "editor.codeActionsOnSave": {
    // 保存時のアクション設定
    "source.fixAll.eslint": true // ESLintが走るようにする。ESLintの設定をちゃんとしてれば整形はされない。
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode", // フォーマッタにPrettierを指定
  "prettier.configPath": ".prettierrc.json" // Prettierの設定ファイルを読み込む
}
```

はい、今度こそお疲れ様でした。  
これで当初のミッションは果たせたと思います。

> 叶えたいこと。
>
> - _Prettier_ には整形をやらせる。 (ソースの統一性を保つ。 `eslint --fix` は使わない)
> - _ESLint_ にはコード品質チェック (バグチェック) をやらせる。

この記事が役に立ったと思ったら拡散して、みんなに教えてあげてください。  
英語はブロンズなので「ここは間違ってる」や「分かりにくい」と思ったらご指摘ください。
