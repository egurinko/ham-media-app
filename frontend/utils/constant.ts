export const HOSPITAL_STATUSES = {
  YES: '○',
  NO: '×',
  UNKNOWN: '不明',
} as const;

export const SERVICE_NAME = 'Ham ω Media' as const;

export const ORIGIN_URL =
  process.env['NEXT_PUBLIC_ORIGIN'] || 'http://localhost:8080';
