export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue', 'node'],

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
        diagnostics: false,
      },
    ],
  },

  transformIgnorePatterns: ['node_modules/(?!(uuid)/)'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^uuid$': '<rootDir>/src/lib/toast/__tests__/mocks/uuidMock.ts',
  },

  collectCoverageFrom: ['src/lib/toast/**/*.{ts,tsx,vue}', '!src/lib/toast/**/*.d.ts', '!src/lib/toast/__tests__/**'],
};
