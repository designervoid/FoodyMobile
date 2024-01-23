module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/imageMock.js',
  },
  setupFiles: ['<rootDir>/jest/setup.js', "@shopify/react-native-skia/jestSetup.js"],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native.*|@react-native.*|@?react-navigation.*|@shopify/react-native-skia)/)',
  ],
};
