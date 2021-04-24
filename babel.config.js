module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@pages': './src/pages',
          '@assets': './src/assets',
          '@contexts': './src/contexts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
