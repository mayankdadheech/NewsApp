module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@navigators': './src/navigators',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@store': './src/store',
          '@slices': './src/store/slices',
          '@assets': './assets',
          '@constants': './src/constants',
          '@api': './src/api',
        },
      },
    ],
  ],
};
