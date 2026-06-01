/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.json', '.ts', '.tsx'],
        root: ['./src'],
      },
    ],
    'inline-dotenv',
    '@babel/plugin-transform-export-namespace-from',
    ['react-native-unistyles/plugin', { root: 'src' }],
    'react-native-worklets/plugin', // need to be the last plugin
  ],
  presets: ['module:@react-native/babel-preset'],
};
