const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
const webpack = require('webpack');

const config = merge(baseConfig, {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../node_modules/.cache/rephic/public'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js',
  },


  devtool: 'cheap-module-source-map',

  module: {
    rules: [
    ],
  },

  plugins: [
  ],
});

module.exports = config;
