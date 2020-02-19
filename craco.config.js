const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require('craco-antd')

module.exports = {
  babel: {
    plugins: [
      "lodash",
      "@loadable/babel-plugin",
    ]
  },
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.ANALYZE === "true"
        ? [new BundleAnalyzerPlugin({ openAnalyzer: true })]
        : [])
    ]
  },
  plugins: [
    {plugin: CracoAntDesignPlugin}
  ]
};
