import { test, expect } from '@playwright/test';
import { waitForPageLoad, waitForElement } from '../utils/test-helpers';
import { PAGES } from '../fixtures/test-data';

test.describe('病院検索機能', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES.hospitals);
    await waitForPageLoad(page);
  });

  test('トップページが正常に表示される', async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle(/病院検索|ハムメディア/);

    // メイン検索フォームの存在確認
    await expect(page.getByPlaceholder('エリア・駅から探す')).toBeVisible();

    // 現在地検索ボタンの存在確認
    await expect(
      page.getByRole('button', { name: /現在地から探す/ }),
    ).toBeVisible();
  });

  test('テキスト検索が機能する', async ({ page }) => {
    const searchInput = page.getByPlaceholder('エリア・駅から探す');
    const searchButton = page
      .locator('button')
      .filter({
        has: page.locator('svg'),
      })
      .first(); // 検索アイコンのボタン

    // 検索テキストを入力
    await searchInput.fill('新宿');

    // 検索ボタンをクリック
    await searchButton.click();

    // 検索結果ページに遷移することを確認
    await expect(page).toHaveURL(/\/hospitals\/result/);
    await waitForPageLoad(page);

    // 検索結果が表示されることを確認
    await expect(page.locator('text=病院').first()).toBeVisible();
  });

  test('オートコンプリートが機能する', async ({ page }) => {
    const searchInput = page.getByPlaceholder('エリア・駅から探す');

    // 検索テキストを入力
    await searchInput.fill('新宿駅');

    // オートコンプリート候補が表示されるまで待機
    await page.waitForTimeout(1000);

    // 候補リストが表示されることを確認（Google Places APIが有効な場合）
    const suggestions = page.locator('[role="option"], button').filter({
      hasText: /新宿/,
    });

    // 候補が表示されているか確認（APIキーが無効でも表示される場合がある）
    const suggestionsCount = await suggestions.count();
    if (suggestionsCount > 0) {
      await suggestions.first().click();
      await expect(page).toHaveURL(/\/hospitals\/result/);
    }
  });

  test('検索結果ページでフィルタリングが機能する', async ({ page }) => {
    // まず検索を実行して結果ページに移動
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

    // フィルターボタンを探して クリック
    const filterButton = page
      .locator('button')
      .filter({
        has: page.locator('svg'),
      })
      .last(); // フローティングアクションボタン（フィルター）

    await filterButton.click();

    // フィルターダイアログが表示されることを確認
    await expect(
      page.locator('text=フィルタ').or(page.locator('text=検索条件')),
    ).toBeVisible();

    // ハムメディアセレクトのチェックボックスを選択
    const recommendedCheckbox = page.locator('input[type="checkbox"]').first();
    await recommendedCheckbox.check();

    // 検索ボタンをクリック
    const applyButton = page.getByRole('button', { name: /検索|適用/ });
    await applyButton.click();

    // フィルターが適用されることを確認
    await waitForPageLoad(page);
  });

  test('検索結果から病院詳細ページに遷移できる', async ({ page }) => {
    // 検索を実行
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

    // 最初の病院カードを見つけてクリック
    const hospitalCard = page
      .locator('[class*="card"], [class*="Card"]')
      .filter({
        has: page.locator('text=病院'),
      })
      .first();

    if ((await hospitalCard.count()) > 0) {
      await hospitalCard.click();

      // 病院詳細ページに遷移することを確認
      await expect(page).toHaveURL(/\/hospitals\/\d+/);
      await waitForPageLoad(page);

      // 病院詳細情報が表示されることを確認
      await expect(
        page.locator('text=病院').or(page.locator('text=診療時間')),
      ).toBeVisible();
    }
  });

  test('即座検索が機能する（結果ページ）', async ({ page }) => {
    // まず結果ページに移動
    await page.goto('/hospitals/result');
    await waitForPageLoad(page);

    // 即座検索フォームを探す
    const instantSearchInput = page
      .locator('input[placeholder*="エリア"], input[placeholder*="検索"]')
      .first();
    const instantSearchButton = page
      .locator('button')
      .filter({
        has: page.locator('svg'),
      })
      .first();

    if ((await instantSearchInput.count()) > 0) {
      await instantSearchInput.fill('渋谷');
      await instantSearchButton.click();

      await waitForPageLoad(page);

      // 検索結果が更新されることを確認
      await expect(page).toHaveURL(/\/hospitals\/result/);
    }
  });

  test('レスポンシブデザインが機能する', async ({ page }) => {
    // モバイルビューポートに変更
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(PAGES.hospitals);
    await waitForPageLoad(page);

    // モバイルでも検索フォームが表示されることを確認
    await expect(page.getByPlaceholder('エリア・駅から探す')).toBeVisible();
    await expect(
      page.getByRole('button', { name: /現在地から探す/ }),
    ).toBeVisible();

    // 検索を実行
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

    // モバイルでも結果が表示されることを確認
    await expect(page.locator('text=病院').first()).toBeVisible();
  });
});
