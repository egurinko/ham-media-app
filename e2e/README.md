# E2E テスト

Playwright を使用したエンドツーエンドテストです。

## セットアップ

1. **依存関係インストール**

```bash
pnpm install
pnpm e2e:install
```

2. **テスト用データベースセットアップ**

```bash
pnpm e2e:setup
```

## テスト実行

```bash
# 基本実行
pnpm e2e

# UI モードで実行
pnpm e2e:ui

# ヘッド付きブラウザで実行
pnpm e2e:headed

# デバッグモード
pnpm e2e:debug
```

## 環境設定

`.env.example` をコピーして `.env` を作成し、必要に応じて設定を調整してください。

## テスト構成

- `tests/` - テストケース
- `fixtures/` - テストデータ
- `utils/` - ヘルパー関数

## 注意事項

- テスト実行前にバックエンド・フロントエンドサーバーが自動起動します
- PostgreSQL が localhost:5432 で起動している必要があります
- テスト用データベース `ham_media_app_e2e` が作成されます
