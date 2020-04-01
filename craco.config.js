const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const CracoAntDesignPlugin = require('craco-antd');
const CracoAlias = require('craco-alias');

module.exports = {
  babel: {
    plugins: ['lodash', '@loadable/babel-plugin'],
  },
  webpack: {
    alias: [],
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.ANALYZE === 'true'
        ? [new BundleAnalyzerPlugin({ openAnalyzer: true })]
        : []),
    ],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(__dirname, 'src/styles/theme.less'),
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
