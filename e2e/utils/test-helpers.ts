import { expect, Page } from '@playwright/test';

/**
 * ページの読み込み完了を待機
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

/**
 * 管理画面にログイン
 */
export async function loginAsAdmin(page: Page) {
  await page.goto('/admin/login');
  await waitForPageLoad(page);
  await page.locator('#email').fill('admin@example.com');
  await page.locator('#password').fill('password');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.waitForURL('/admin/**');
  await waitForPageLoad(page);
}

/**
 * データベースの状態をリセット（必要に応じて）
 */
export async function resetDatabase() {
  // 実装は後で追加（必要に応じて）
  // バックエンドAPIを叩いてDBリセットなど
}

/**
 * スクリーンショット付きエラーハンドリング
 */
export async function takeScreenshotOnError(page: Page, testName: string) {
  const screenshot = await page.screenshot({ fullPage: true });
  console.log(`Screenshot taken for failed test: ${testName}`);
  return screenshot;
}

/**
 * モバイルビューポートかどうかを判定
 */
export function isMobileViewport(page: Page): boolean {
  const viewport = page.viewportSize();
  return viewport ? viewport.width < 768 : false;
}

/**
 * 要素が表示されるまで待機
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout = 10000,
) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * テキストが含まれる要素を待機
 */
export async function waitForText(page: Page, text: string, timeout = 10000) {
  await page.waitForFunction(
    (searchText) => document.body.innerText.includes(searchText),
    text,
    { timeout },
  );
}
