import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        diagnostics: { warnOnly: true },
      },
    },
    testEnvironment: 'node',
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/server/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/tests/configs/setupDbConnection.ts'],
    testMatch: ['**/tests/**/*.spec.[jt]s'],
  };
};
