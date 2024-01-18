module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '@hooks': './src/hooks/index',
          '@screens': './src/screens/index',
          '@types': './src/types/index',
        },
      },
    ],
  ],
};
