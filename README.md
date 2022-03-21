# ハムメディアアプリ

ハムメディアは 1 匹でも多くのハムスターをしあわせにすることを目指して活動する、国内で初めてのハムスター専門の支援団体です。このリポジトリではハムメディアの活動の一環として、いくつかのアプリを管理しています。

## ハムメディアについて

ハムメディアについて詳しく知りたい場合は、[公式 HP](https://ham-media.net) を参照してください。

## 機能

ハムメディアのアプリには大きく分けて以下の 3 つの機能があります。

1. [病院検索](https://ham-media-app.net/hospitals)
2. [LINEBot (公式アカウント)](https://ham-media.net/haminfo/line/)
3. 管理画面

### 病院検索

ハムメディアが独自に管理しているハムスター受付可能病院を検索するウェブアプリです。地名や GPS を用いた検索をベースに様々な絞り込みを行うことができます。

<img src="https://user-images.githubusercontent.com/23233648/138564376-d2d00fa3-5597-4a19-a45f-ef82d060898b.png" height="200">

<img src="https://user-images.githubusercontent.com/23233648/138564400-f8f039cb-f25e-424e-9f71-b3a0a404ea5e.png" height="200">

<img src="https://user-images.githubusercontent.com/23233648/138564569-4a974951-5f7b-44e1-90fd-04665d406785.png" height="200">

### LINEBot (公式アカウント)

上記の病院検索を LINE 上で行うことを可能にしています。また、LINE 上からハムメディアが保護し、現在里親募集中のハムスターを確認することができます。

<img src="https://user-images.githubusercontent.com/23233648/138564642-489747da-1b7b-4c37-abf3-e91bebe13a50.jpg" height="200">

<img src="https://user-images.githubusercontent.com/23233648/138565123-479e0640-3c70-4bd4-a0aa-a5c25eb73df4.png" height="200">

<img src="https://user-images.githubusercontent.com/23233648/138564726-0f1adc99-1dd2-4e06-9349-1095cb5a4df7.jpg" height="200">

### 管理画面

上記の病院管理を始めとした様々な管理を効率化したアプリケーションです。

## 技術スタック

全体構成はフロントエンドを Next.js、バックエンドを fastify が担い、その間を GraphQL で通信しています。細かくは以下です。

- フロントエンド
  - [Next.js](https://nextjs.org/)
  - [Chakra UI](https://chakra-ui.com/)
  - [Apollo Client](https://www.apollographql.com/docs/react)
  - [GraphQL Code Generator](https://graphql-code-generator.com/)
  - CloudFront/S3/lambda@edge
- バックエンド
  - [fastify](https://www.fastify.io/)
  - [Prisma](prisma.io)
  - [GraphQL Nexus](https://nexusjs.org/)
  - [heroku](https://www.heroku.com/home)
- モノレポ管理
  - [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- CI
  - [GitHub Actions](https://github.co.jp/features/actions)

## セットアップ

1. クローン

```
$ git clone git@github.com:egurinko/ham-media-app.git
```

2. package インストール

```
$ cd ham-media-app
$ yarn
```

### バックエンドセットアップ

1. backend/.env.template を元に .env を作成
   - DATABASE_URL は `mysql://<username>:<password>@localhost:<port>/<database_name>`

```sh
$ cd backend # repository root から
$ touch .env
```

2. db の migrate

```sh
$ yarn db:push
```

3. prisma の初期セットアップ

```sh
$ yarn db:reflect
```

4. seed 投入

```sh
$ yarn db:seed:dev
```

5. dev server 起動

```sh
$ yarn dev # port 3000 で立ち上がる
```

### フロントエンドセットアップ

1. .env.template を元に .env を作成

```sh
$ cd frontend # repository root から
$ touch .env
```

2. dev server 起動

```sh
$ yarn dev # port 8080 で立ち上がる
```

3. localhost:8080/hospitals などで確認

## リンク

- [ハムメディア公式](https://ham-media.net)
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Apollo Client](https://www.apollographql.com/docs/react)
- [GraphQL Code Generator](https://graphql-code-generator.com/)
- [fastify](https://www.fastify.io/)
- [Prisma](prisma.io)
- [GraphQL Nexus](https://nexusjs.org/)
- [heroku](https://www.heroku.com/home)
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [GitHub Actions](https://github.co.jp/features/actions)
