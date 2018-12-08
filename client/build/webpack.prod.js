const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = merge(baseConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
        },
      },
    },
  },

  plugins: [
    new UglifyJSPlugin(),

    // new BundleAnalyzerPlugin(),
  ],
});

module.exports = config;
