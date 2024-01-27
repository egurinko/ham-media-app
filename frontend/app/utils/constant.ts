export const HOSPITAL_STATUSES = {
  YES: '○',
  NO: '×',
  UNKNOWN: '不明',
} as const;

export const SERVICE_NAME = 'Ham ω Media' as const;

export const ORIGIN_URL =
  process.env['NEXT_PUBLIC_ORIGIN'] || 'http://localhost:8080';

export const OG_DEFAULT_IMAGE =
  'https://user-images.githubusercontent.com/23233648/138548265-89dbff65-9737-42db-8d4e-591168374f88.jpeg';

export const LOCAL_STORAGE_HOSPITAL_SEARCH_KEY = 'hospitalsPage';

export const HAMEDIA_SESSION = 'hamediaSession';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const INTERNAL_API_URL = `${API_BASE_URL}/internal_api/graphql`;
export const PUBLIC_API_URL = `${API_BASE_URL}/public_api/graphql`;
