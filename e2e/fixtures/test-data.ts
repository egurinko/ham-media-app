/**
 * テスト用のデータ定数
 */

// 管理者ユーザー（development seedで作成されるデータ）
export const ADMIN_USER = {
  email: 'admin@example.com',
  password: 'password',
  name: 'admin',
} as const;

// テスト用病院データ（development seedで作成される想定）
export const TEST_HOSPITAL = {
  name: 'テスト動物病院',
  prefecture: '東京都',
  city: '新宿区',
} as const;

// API エンドポイント
export const API_ENDPOINTS = {
  graphql: 'http://localhost:3000/graphql',
  health: 'http://localhost:3000/health',
} as const;

// ページURL
export const PAGES = {
  home: '/',
  hospitals: '/hospitals',
  adminLogin: '/admin/login',
  adminDashboard: '/admin',
  adminHospitals: '/admin/hospitals',
  adminProducts: '/admin/products',
  adminStock: '/admin/stock',
} as const;

// テストselectors
export const SELECTORS = {
  // ログインページ
  emailInput: '[data-testid="email-input"]',
  passwordInput: '[data-testid="password-input"]',
  loginButton: '[data-testid="login-button"]',

  // 病院検索
  searchInput: '[data-testid="hospital-search-input"]',
  searchButton: '[data-testid="hospital-search-button"]',
  hospitalList: '[data-testid="hospital-list"]',
  hospitalCard: '[data-testid="hospital-card"]',

  // 管理画面
  adminSidebar: '[data-testid="admin-sidebar"]',
  adminHeader: '[data-testid="admin-header"]',
  logoutButton: '[data-testid="logout-button"]',

  // 在庫管理
  stockTable: '[data-testid="stock-table"]',
  addStockButton: '[data-testid="add-stock-button"]',
  stockRequestForm: '[data-testid="stock-request-form"]',
} as const;
