import { test, expect } from '@playwright/test';
import { waitForPageLoad, loginAsAdmin } from '../utils/test-helpers';
import { ADMIN_USER, PAGES } from '../fixtures/test-data';

test.describe('管理画面ログイン機能', () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前にクッキーをクリア（認証状態をリセット）
    await page.context().clearCookies();
  });

  test('未認証状態で管理画面にアクセスするとログインページにリダイレクトされる', async ({
    page,
  }) => {
    await page.goto('/admin/products');

    // ログインページにリダイレクトされることを確認
    await expect(page).toHaveURL('/admin/login');
    await waitForPageLoad(page);

    // ログインフォームが表示されることを確認
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();
  });

  test('ログインページが正常に表示される', async ({ page }) => {
    await page.goto('/admin/login');
    await waitForPageLoad(page);

    // ページタイトルの確認
    await expect(page).toHaveTitle(/ログイン|管理画面|ハムメディア/);

    // ハムメディアロゴの存在確認
    await expect(
      page
        .locator('img')
        .filter({ hasText: /ロゴ|logo/i })
        .or(page.locator('img[alt*="ハムメディア"]')),
    ).toBeVisible();

    // フォーム要素の存在確認
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();

    // フォームラベルの確認
    await expect(page.locator('text=メールアドレス')).toBeVisible();
    await expect(page.locator('text=パスワード')).toBeVisible();
  });

  test('有効な認証情報でログインできる', async ({ page }) => {
    await page.goto('/admin/login');
    await waitForPageLoad(page);

    // 認証情報を入力
    await page.locator('#email').fill(ADMIN_USER.email);
    await page.locator('#password').fill(ADMIN_USER.password);

    // ログインボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();

    // 管理画面にリダイレクトされることを確認
    await expect(page).toHaveURL('/admin/products');
    await waitForPageLoad(page);

    // ダッシュボードの要素が表示されることを確認
    await expect(
      page.locator('text=商品一覧').or(page.locator('text=ダッシュボード')),
    ).toBeVisible();

    // ユーザー情報が表示されることを確認
    await expect(
      page.locator('text=admin').or(page.locator(`text=${ADMIN_USER.name}`)),
    ).toBeVisible();
  });

  test('無効なメールアドレスでログインに失敗する', async ({ page }) => {
    await page.goto('/admin/login');
    await waitForPageLoad(page);

    // 無効な認証情報を入力
    await page.locator('#email').fill('invalid@example.com');
    await page.locator('#password').fill(ADMIN_USER.password);

    // ログインボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();

    // エラーメッセージが表示されることを確認
    await expect(page.locator('#login-error')).toBeVisible();
    await expect(page.locator('#login-error')).toContainText(
      /エラー|失敗|無効|認証/,
    );

    // ログインページに留まることを確認
    await expect(page).toHaveURL('/admin/login');
  });

  test('無効なパスワードでログインに失敗する', async ({ page }) => {
    await page.goto('/admin/login');
    await waitForPageLoad(page);

    // 無効な認証情報を入力
    await page.locator('#email').fill(ADMIN_USER.email);
    await page.locator('#password').fill('wrongpassword');

    // ログインボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();

    // エラーメッセージが表示されることを確認
    await expect(page.locator('#login-error')).toBeVisible();
    await expect(page.locator('#login-error')).toContainText(
      /エラー|失敗|無効|認証/,
    );

    // ログインページに留まることを確認
    await expect(page).toHaveURL('/admin/login');
  });

  test('空のフォームでログインに失敗する', async ({ page }) => {
    await page.goto('/admin/login');
    await waitForPageLoad(page);

    // 空のままログインボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();

    // HTML5バリデーションまたはエラーメッセージが表示される
    const emailInput = page.locator('#email');
    const passwordInput = page.locator('#password');

    // required属性による HTML5バリデーションをチェック
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('認証済み状態でログインページにアクセスすると管理画面にリダイレクトされる', async ({
    page,
  }) => {
    // まずログインする
    await page.goto('/admin/login');
    await waitForPageLoad(page);

    await page.locator('#email').fill(ADMIN_USER.email);
    await page.locator('#password').fill(ADMIN_USER.password);
    await page.getByRole('button', { name: 'ログイン' }).click();

    await expect(page).toHaveURL('/admin/products');
    await waitForPageLoad(page);

    // 再度ログインページにアクセス
    await page.goto('/admin/login');

    // 管理画面にリダイレクトされることを確認
    await expect(page).toHaveURL('/admin/internal_users');
    await waitForPageLoad(page);
  });

  test('フォーム入力時の動作確認', async ({ page }) => {
    await page.goto('/admin/login');
    await waitForPageLoad(page);

    const emailInput = page.locator('#email');
    const passwordInput = page.locator('#password');

    // email入力フィールドの属性確認
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('autoComplete', 'email');

    // password入力フィールドの属性確認
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute(
      'autoComplete',
      'current-password',
    );

    // 入力値の確認
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');

    await passwordInput.fill('testpassword');
    await expect(passwordInput).toHaveValue('testpassword');
  });
});

test.describe('管理画面ダッシュボード', () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前にログイン
    await loginAsAdmin(page);
  });

  test('ダッシュボードが正常に表示される', async ({ page }) => {
    // 商品一覧ページ（実質的なダッシュボード）に遷移
    await page.goto('/admin/products');
    await waitForPageLoad(page);

    // ページタイトルの確認
    await expect(page).toHaveTitle(/商品|管理画面|ハムメディア/);

    // メインコンテンツの確認
    await expect(
      page.locator('text=商品一覧').or(page.locator('h1')),
    ).toBeVisible();

    // 新規登録ボタンの確認
    await expect(
      page.getByRole('link', { name: /新規登録|追加/ }),
    ).toBeVisible();
  });

  test('サイドバーナビゲーションが正常に表示される', async ({ page }) => {
    await page.goto('/admin/products');
    await waitForPageLoad(page);

    // ユーザー情報の表示確認
    await expect(
      page.locator('text=admin').or(page.locator(`text=${ADMIN_USER.name}`)),
    ).toBeVisible();

    // ナビゲーションリンクの確認（在庫管理セクション）
    await expect(
      page.getByRole('link', { name: /メーカー|makers/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /商品|products/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /商品タグ|product.*tag/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /在庫リクエスト|stock.*request/ }),
    ).toBeVisible();

    // 管理者限定メニューの確認
    await expect(page.getByRole('link', { name: /ユーザ|user/ })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /病院|hospital/ }),
    ).toBeVisible();

    // ログアウトボタンの確認
    await expect(
      page.getByRole('button', { name: /ログアウト|logout/ }),
    ).toBeVisible();
  });

  test('ナビゲーションリンクが機能する', async ({ page }) => {
    await page.goto('/admin/products');
    await waitForPageLoad(page);

    // メーカー一覧ページへの遷移
    await page.getByRole('link', { name: /メーカー|makers/ }).click();
    await expect(page).toHaveURL('/admin/makers');
    await waitForPageLoad(page);

    // 商品タグページへの遷移
    await page.getByRole('link', { name: /商品タグ|product.*tag/ }).click();
    await expect(page).toHaveURL('/admin/product_tag_groups');
    await waitForPageLoad(page);

    // 在庫リクエストページへの遷移
    await page
      .getByRole('link', { name: /在庫リクエスト|stock.*request/ })
      .click();
    await expect(page).toHaveURL('/admin/stock_requests');
    await waitForPageLoad(page);
  });

  test('管理者限定メニューが表示される', async ({ page }) => {
    await page.goto('/admin/products');
    await waitForPageLoad(page);

    // ユーザー管理ページへの遷移
    await page.getByRole('link', { name: /ユーザ|user/ }).click();
    await expect(page).toHaveURL('/admin/internal_users');
    await waitForPageLoad(page);

    // 戻って病院管理ページへの遷移をテスト
    await page.goto('/admin/products');
    await waitForPageLoad(page);

    await page.getByRole('link', { name: /病院|hospital/ }).click();
    await expect(page).toHaveURL('/admin/hospitals');
    await waitForPageLoad(page);
  });

  test('ログアウト機能が動作する', async ({ page }) => {
    await page.goto('/admin/products');
    await waitForPageLoad(page);

    // ログアウトボタンをクリック
    await page.getByRole('button', { name: /ログアウト|logout/ }).click();

    // ログインページにリダイレクトされることを確認
    await expect(page).toHaveURL('/admin/login');
    await waitForPageLoad(page);

    // 管理画面に再アクセスしてもログインページにリダイレクトされることを確認
    await page.goto('/admin/products');
    await expect(page).toHaveURL('/admin/login');
  });

  test('ヘッダー要素が正常に表示される', async ({ page }) => {
    await page.goto('/admin/products');
    await waitForPageLoad(page);

    // ヘッダーロゴの確認
    await expect(
      page
        .locator('img')
        .filter({ hasText: /ロゴ|logo/i })
        .or(page.locator('img[alt*="ハムメディア"]')),
    ).toBeVisible();
  });
});
