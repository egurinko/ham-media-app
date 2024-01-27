import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/server/$1',
      '@tests/(.*)': '<rootDir>/tests/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/tests/configs/setupDbConnection.ts'],
    testMatch: ['**/tests/**/*.spec.[jt]s'],
    transform: {
      '^.+\\.ts?$': [
        'ts-jest',
        {
          diagnostics: { warnOnly: true },
        },
      ],
    },
  };
};
