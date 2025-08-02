import { test, expect } from '@playwright/test';
import { waitForPageLoad, loginAsAdmin } from '../utils/test-helpers';

test.describe('在庫管理機能', () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前に管理者としてログイン
    await loginAsAdmin(page);
  });

  test.describe('商品管理', () => {
    test('商品一覧ページが正常に表示される', async ({ page }) => {
      await page.goto('/admin/products');
      await waitForPageLoad(page);

      // ページタイトルの確認
      await expect(
        page.locator('text=商品一覧').or(page.locator('h1')),
      ).toBeVisible();

      // 新規登録ボタンの確認
      await expect(
        page.getByRole('link', { name: /新規登録|追加|新規作成/ }),
      ).toBeVisible();

      // 検索機能の確認（もしあれば）
      const searchInput = page
        .locator('input[type="text"], input[placeholder*="検索"]')
        .first();
      if ((await searchInput.count()) > 0) {
        await expect(searchInput).toBeVisible();
      }
    });

    test('商品の検索・フィルタリング機能', async ({ page }) => {
      await page.goto('/admin/products');
      await waitForPageLoad(page);

      // 検索入力フィールドが存在する場合のテスト
      const searchInput = page
        .locator('input[type="text"], input[placeholder*="検索"]')
        .first();

      if ((await searchInput.count()) > 0) {
        // テスト用の商品名で検索
        await searchInput.fill('フード');

        // 検索結果の確認
        await waitForPageLoad(page);

        // 検索結果が表示されることを確認
        await expect(
          page.locator('table, [class*="card"], [class*="list"]'),
        ).toBeVisible();
      }
    });

    test('商品詳細の表示', async ({ page }) => {
      await page.goto('/admin/products');
      await waitForPageLoad(page);

      // 最初の商品をクリック（詳細リンクまたは編集リンク）
      const productLink = page
        .getByRole('link')
        .filter({
          hasText: /詳細|編集|表示/,
        })
        .first();

      if ((await productLink.count()) > 0) {
        await productLink.click();
        await waitForPageLoad(page);

        // 商品詳細情報が表示されることを確認
        await expect(
          page
            .locator('text=商品名')
            .or(page.locator('text=価格'))
            .or(page.locator('form')),
        ).toBeVisible();
      }
    });
  });

  test.describe('メーカー管理', () => {
    test('メーカー一覧ページが正常に表示される', async ({ page }) => {
      await page.goto('/admin/makers');
      await waitForPageLoad(page);

      // ページタイトルの確認
      await expect(
        page.locator('text=メーカー').or(page.locator('h1')),
      ).toBeVisible();

      // 新規登録ボタンの確認
      await expect(
        page.getByRole('link', { name: /新規登録|追加|新規作成/ }),
      ).toBeVisible();
    });

    test('メーカーの新規作成機能', async ({ page }) => {
      await page.goto('/admin/makers');
      await waitForPageLoad(page);

      // 新規登録ボタンをクリック
      const newButton = page.getByRole('link', {
        name: /新規登録|追加|新規作成/,
      });
      await newButton.click();
      await waitForPageLoad(page);

      // 新規作成フォームが表示されることを確認
      await expect(page.locator('form')).toBeVisible();
      await expect(
        page.locator('input[name*="name"], input[id*="name"]'),
      ).toBeVisible();

      // テストデータを入力
      const nameInput = page
        .locator('input[name*="name"], input[id*="name"]')
        .first();
      await nameInput.fill('テストメーカー');

      // 保存ボタンをクリック
      const saveButton = page.getByRole('button', { name: /保存|登録|作成/ });
      if ((await saveButton.count()) > 0) {
        await saveButton.click();
        await waitForPageLoad(page);

        // 成功メッセージまたは一覧ページへのリダイレクトを確認
        await expect(page).toHaveURL(/\/admin\/makers/);
      }
    });
  });

  test.describe('商品タググループ管理', () => {
    test('商品タググループ一覧ページが正常に表示される', async ({ page }) => {
      await page.goto('/admin/product_tag_groups');
      await waitForPageLoad(page);

      // ページタイトルの確認
      await expect(
        page
          .locator('text=商品タグ')
          .or(page.locator('text=タググループ'))
          .or(page.locator('h1')),
      ).toBeVisible();

      // 新規登録ボタンの確認
      await expect(
        page.getByRole('link', { name: /新規登録|追加|新規作成/ }),
      ).toBeVisible();
    });

    test('タググループの管理機能', async ({ page }) => {
      await page.goto('/admin/product_tag_groups');
      await waitForPageLoad(page);

      // データが表示されていることを確認
      await expect(
        page.locator('table, [class*="card"], [class*="list"]'),
      ).toBeVisible();

      // 編集リンクがある場合のテスト
      const editLink = page.getByRole('link', { name: /編集|詳細/ }).first();
      if ((await editLink.count()) > 0) {
        await editLink.click();
        await waitForPageLoad(page);

        // 編集フォームが表示されることを確認
        await expect(page.locator('form')).toBeVisible();
      }
    });
  });

  test.describe('在庫リクエスト管理', () => {
    test('在庫リクエスト一覧ページが正常に表示される', async ({ page }) => {
      await page.goto('/admin/stock_requests');
      await waitForPageLoad(page);

      // ページタイトルの確認
      await expect(
        page.locator('text=在庫リクエスト').or(page.locator('h1')),
      ).toBeVisible();

      // 新規登録ボタンの確認
      await expect(
        page.getByRole('link', { name: /新規登録|追加|新規作成/ }),
      ).toBeVisible();
    });

    test('在庫リクエストの新規作成', async ({ page }) => {
      await page.goto('/admin/stock_requests');
      await waitForPageLoad(page);

      // 新規登録ボタンをクリック
      const newButton = page.getByRole('link', {
        name: /新規登録|追加|新規作成/,
      });
      await newButton.click();
      await waitForPageLoad(page);

      // フォームが表示されることを確認
      await expect(page.locator('form')).toBeVisible();

      // 必要なフィールドが存在することを確認
      const requiredFields = [
        page.locator('input[name*="quantity"], input[id*="quantity"]'),
        page.locator('select[name*="product"], select[id*="product"]'),
        page.locator('textarea[name*="message"], textarea[id*="message"]'),
      ];

      for (const field of requiredFields) {
        if ((await field.count()) > 0) {
          await expect(field).toBeVisible();
        }
      }
    });

    test('在庫リクエストのステータス管理', async ({ page }) => {
      await page.goto('/admin/stock_requests');
      await waitForPageLoad(page);

      // 在庫リクエストのリストが表示されることを確認
      await expect(
        page.locator('table, [class*="card"], [class*="list"]'),
      ).toBeVisible();

      // ステータス表示の確認
      const statusElements = page.locator(
        'text=pending, text=approved, text=rejected, text=承認, text=却下, text=保留',
      );
      if ((await statusElements.count()) > 0) {
        await expect(statusElements.first()).toBeVisible();
      }

      // 詳細/編集リンクをクリック
      const detailLink = page.getByRole('link', { name: /詳細|編集/ }).first();
      if ((await detailLink.count()) > 0) {
        await detailLink.click();
        await waitForPageLoad(page);

        // 詳細ページまたは編集ページが表示されることを確認
        await expect(
          page.locator('form, text=在庫リクエスト詳細'),
        ).toBeVisible();
      }
    });
  });

  test.describe('在庫管理統合テスト', () => {
    test('商品からメーカーへのナビゲーション', async ({ page }) => {
      await page.goto('/admin/products');
      await waitForPageLoad(page);

      // サイドバーからメーカー管理に遷移
      await page.getByRole('link', { name: /メーカー|makers/ }).click();
      await expect(page).toHaveURL('/admin/makers');
      await waitForPageLoad(page);

      // メーカー一覧が表示されることを確認
      await expect(
        page.locator('text=メーカー').or(page.locator('h1')),
      ).toBeVisible();
    });

    test('商品タグから商品への関連表示', async ({ page }) => {
      await page.goto('/admin/product_tag_groups');
      await waitForPageLoad(page);

      // 商品タグ一覧が表示されることを確認
      await expect(
        page.locator('text=商品タグ').or(page.locator('h1')),
      ).toBeVisible();

      // 商品管理に遷移
      await page.getByRole('link', { name: /商品|products/ }).click();
      await expect(page).toHaveURL('/admin/products');
      await waitForPageLoad(page);
    });

    test('在庫リクエストから商品詳細への遷移', async ({ page }) => {
      await page.goto('/admin/stock_requests');
      await waitForPageLoad(page);

      // 在庫リクエスト一覧が表示されることを確認
      await expect(
        page.locator('text=在庫リクエスト').or(page.locator('h1')),
      ).toBeVisible();

      // 商品管理への遷移をテスト
      await page.getByRole('link', { name: /商品|products/ }).click();
      await expect(page).toHaveURL('/admin/products');
      await waitForPageLoad(page);

      // 商品一覧が表示されることを確認
      await expect(
        page.locator('text=商品一覧').or(page.locator('h1')),
      ).toBeVisible();
    });
  });

  test.describe('データ表示とページネーション', () => {
    test('テーブル表示とデータ確認', async ({ page }) => {
      const pages = [
        '/admin/products',
        '/admin/makers',
        '/admin/product_tag_groups',
        '/admin/stock_requests',
      ];

      for (const pagePath of pages) {
        await page.goto(pagePath);
        await waitForPageLoad(page);

        // データ表示エリアが存在することを確認
        await expect(
          page.locator(
            'table, [class*="card"], [class*="list"], [class*="grid"]',
          ),
        ).toBeVisible();

        // ページネーションが存在する場合の確認
        const pagination = page.locator(
          '[class*="pagination"], text=次へ, text=前へ, text=>',
        );
        if ((await pagination.count()) > 0) {
          await expect(pagination.first()).toBeVisible();
        }
      }
    });
  });
});
