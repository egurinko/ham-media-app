import { test, expect, devices } from '@playwright/test';
import {
  waitForPageLoad,
  loginAsAdmin,
  isMobileViewport,
} from '../utils/test-helpers';
import { PAGES } from '../fixtures/test-data';

test.describe('レスポンシブ・モバイル対応', () => {
  // モバイルデバイス設定
  const mobileViewport = { width: 375, height: 667 };
  const tabletViewport = { width: 768, height: 1024 };
  const desktopViewport = { width: 1200, height: 800 };

  test.describe('病院検索のモバイル対応', () => {
    test('iPhone - 病院検索機能', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await page.goto(PAGES.hospitals);
      await waitForPageLoad(page);

      // モバイルレイアウトの確認
      await expect(page.getByPlaceholder('エリア・駅から探す')).toBeVisible();
      await expect(
        page.getByRole('button', { name: /現在地から探す/ }),
      ).toBeVisible();

      // モバイルでの検索実行
      await page.getByPlaceholder('エリア・駅から探す').fill('新宿');
      await page
        .locator('button')
        .filter({
          has: page.locator('svg'),
        })
        .first()
        .click();

      await expect(page).toHaveURL(/\/hospitals\/result/);
      await waitForPageLoad(page);

      // モバイルでの結果表示確認
      await expect(page.locator('text=病院').first()).toBeVisible();
    });

    test('iPad - タブレット表示', async ({ page }) => {
      await page.setViewportSize(tabletViewport);
      await page.goto(PAGES.hospitals);
      await waitForPageLoad(page);

      // タブレットレイアウトの確認
      await expect(page.getByPlaceholder('エリア・駅から探す')).toBeVisible();
      await expect(
        page.getByRole('button', { name: /現在地から探す/ }),
      ).toBeVisible();

      // 検索実行
      await page.getByPlaceholder('エリア・駅から探す').fill('東京');
      await page
        .locator('button')
        .filter({
          has: page.locator('svg'),
        })
        .first()
        .click();

      await expect(page).toHaveURL(/\/hospitals\/result/);
      await waitForPageLoad(page);
    });

    test('モバイル - フィルタリング機能', async ({ page }) => {
      await page.setViewportSize(mobileViewport);

      // 検索結果ページに移動
      await page.goto('/hospitals/result');
      await waitForPageLoad(page);

      // モバイルでのフィルターボタン確認
      const filterButton = page
        .locator('button')
        .filter({
          has: page.locator('svg'),
        })
        .last();

      if ((await filterButton.count()) > 0) {
        await filterButton.click();

        // モバイルでのフィルターダイアログ表示確認
        await expect(
          page.locator('text=フィルタ').or(page.locator('text=検索条件')),
        ).toBeVisible();

        // フィルター操作
        const checkbox = page.locator('input[type="checkbox"]').first();
        if ((await checkbox.count()) > 0) {
          await checkbox.check();
        }

        // フィルター適用
        const applyButton = page.getByRole('button', { name: /検索|適用/ });
        if ((await applyButton.count()) > 0) {
          await applyButton.click();
          await waitForPageLoad(page);
        }
      }
    });

    test('モバイル - 病院詳細表示', async ({ page }) => {
      await page.setViewportSize(mobileViewport);

      // 検索結果から病院詳細に遷移
      await page.goto('/hospitals/result');
      await waitForPageLoad(page);

      const hospitalCard = page
        .locator('[class*="card"], [class*="Card"]')
        .filter({
          has: page.locator('text=病院'),
        })
        .first();

      if ((await hospitalCard.count()) > 0) {
        await hospitalCard.click();
        await expect(page).toHaveURL(/\/hospitals\/\d+/);
        await waitForPageLoad(page);

        // モバイルでの詳細表示確認
        await expect(
          page.locator('text=病院').or(page.locator('text=診療時間')),
        ).toBeVisible();
      }
    });
  });

  test.describe('管理画面のモバイル対応', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsAdmin(page);
    });

    test('モバイル - 管理画面ログイン', async ({ page }) => {
      await page.context().clearCookies();
      await page.setViewportSize(mobileViewport);

      await page.goto('/admin/login');
      await waitForPageLoad(page);

      // モバイルでのログインフォーム表示確認
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('#password')).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'ログイン' }),
      ).toBeVisible();

      // ログイン実行
      await page.locator('#email').fill('admin@example.com');
      await page.locator('#password').fill('password');
      await page.getByRole('button', { name: 'ログイン' }).click();

      await expect(page).toHaveURL('/admin/products');
      await waitForPageLoad(page);
    });

    test('モバイル - サイドバーナビゲーション', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await page.goto('/admin/products');
      await waitForPageLoad(page);

      // モバイルでのナビゲーション確認
      // ハンバーガーメニューまたはモバイル用ナビゲーションの確認
      const mobileNav = page
        .locator('[class*="mobile"], [class*="hamburger"], button')
        .filter({
          hasText: /menu|メニュー/i,
        });

      if ((await mobileNav.count()) > 0) {
        await mobileNav.first().click();
        await waitForPageLoad(page);
      }

      // ナビゲーションリンクの確認
      await expect(
        page.getByRole('link', { name: /商品|products/ }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /メーカー|makers/ }),
      ).toBeVisible();
    });

    test('モバイル - 商品一覧とフォーム', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await page.goto('/admin/products');
      await waitForPageLoad(page);

      // モバイルでの一覧表示確認
      await expect(
        page.locator('text=商品一覧').or(page.locator('h1')),
      ).toBeVisible();

      // 新規登録ボタンの確認
      const newButton = page.getByRole('link', { name: /新規登録|追加/ });
      await expect(newButton).toBeVisible();

      // 新規登録ページへの遷移
      await newButton.click();
      await waitForPageLoad(page);

      // モバイルでのフォーム表示確認
      await expect(page.locator('form')).toBeVisible();
    });

    test('タブレット - 管理画面レイアウト', async ({ page }) => {
      await page.setViewportSize(tabletViewport);
      await page.goto('/admin/products');
      await waitForPageLoad(page);

      // タブレットでのレイアウト確認
      await expect(
        page.locator('text=商品一覧').or(page.locator('h1')),
      ).toBeVisible();

      // サイドバーの確認
      await expect(
        page.getByRole('link', { name: /商品|products/ }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: /メーカー|makers/ }),
      ).toBeVisible();
    });
  });

  test.describe('クロスブラウザ・デバイステスト', () => {
    // 主要デバイスでのテスト
    const testDevices = [
      { name: 'iPhone 12', device: devices['iPhone 12'] },
      { name: 'iPad', device: devices['iPad'] },
      { name: 'Pixel 5', device: devices['Pixel 5'] },
    ];

    for (const { name, device } of testDevices) {
      test(`${name} - 基本機能テスト`, async ({ browser }) => {
        const context = await browser.newContext(device);
        const page = await context.newPage();

        // 病院検索ページテスト
        await page.goto(PAGES.hospitals);
        await waitForPageLoad(page);

        await expect(page.getByPlaceholder('エリア・駅から探す')).toBeVisible();

        // 検索実行
        await page.getByPlaceholder('エリア・駅から探す').fill('東京');
        await page
          .locator('button')
          .filter({
            has: page.locator('svg'),
          })
          .first()
          .click();

        await expect(page).toHaveURL(/\/hospitals\/result/);
        await waitForPageLoad(page);

        await context.close();
      });
    }
  });

  test.describe('タッチ操作とジェスチャー', () => {
    test('モバイル - タッチ操作', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await page.goto(PAGES.hospitals);
      await waitForPageLoad(page);

      // タッチ操作での検索フィールドフォーカス
      await page.locator('#email').tap(); // tap操作のテスト

      // 検索実行
      await page.getByPlaceholder('エリア・駅から探す').fill('渋谷');
      await page
        .locator('button')
        .filter({
          has: page.locator('svg'),
        })
        .first()
        .tap();

      await expect(page).toHaveURL(/\/hospitals\/result/);
      await waitForPageLoad(page);
    });

    test('モバイル - スクロール動作', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await page.goto('/hospitals/result');
      await waitForPageLoad(page);

      // ページのスクロールテスト
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });

      await page.waitForTimeout(1000);

      // スクロール後の要素確認
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('パフォーマンステスト', () => {
    test('モバイル - ページ読み込み時間', async ({ page }) => {
      await page.setViewportSize(mobileViewport);

      const startTime = Date.now();
      await page.goto(PAGES.hospitals);
      await waitForPageLoad(page);
      const loadTime = Date.now() - startTime;

      // 5秒以内での読み込み完了を確認（目安）
      expect(loadTime).toBeLessThan(5000);

      // 重要な要素が表示されることを確認
      await expect(page.getByPlaceholder('エリア・駅から探す')).toBeVisible();
    });

    test('モバイル - 管理画面パフォーマンス', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await loginAsAdmin(page);

      const startTime = Date.now();
      await page.goto('/admin/products');
      await waitForPageLoad(page);
      const loadTime = Date.now() - startTime;

      // 読み込み時間の確認
      expect(loadTime).toBeLessThan(5000);

      // 重要な要素が表示されることを確認
      await expect(
        page.locator('text=商品一覧').or(page.locator('h1')),
      ).toBeVisible();
    });
  });

  test.describe('アクセシビリティ', () => {
    test('モバイル - フォーカス管理', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await page.goto(PAGES.hospitals);
      await waitForPageLoad(page);

      // タブナビゲーションのテスト
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // フォーカスされた要素が見えることを確認
      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName,
      );
      expect(['INPUT', 'BUTTON', 'A']).toContain(focusedElement);
    });

    test('モバイル - ログインフォームのアクセシビリティ', async ({ page }) => {
      await page.setViewportSize(mobileViewport);
      await page.goto('/admin/login');
      await waitForPageLoad(page);

      // ラベルと入力フィールドの関連確認
      await expect(page.locator('label[for="email"]')).toBeVisible();
      await expect(page.locator('label[for="password"]')).toBeVisible();

      // 必須フィールドの確認
      await expect(page.locator('#email')).toHaveAttribute('required');
      await expect(page.locator('#password')).toHaveAttribute('required');
    });
  });
});
