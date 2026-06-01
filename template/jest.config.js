module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.{ts,tsx}',
    '<rootDir>/src/entities/**/*.{ts,tsx}',
    '<rootDir>/src/screens/**/*.{ts,tsx}',
    '<rootDir>/src/shared/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.test.{ts,tsx}',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  preset: '@react-native/jest-preset',
  setupFiles: [
    'react-native-unistyles/mocks',
    '<rootDir>/src/shared/lib/theme/unistyles.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|ky|react-native-unistyles)',
  ],
};
