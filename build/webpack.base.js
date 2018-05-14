const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');

const rootPath = path.resolve(__dirname, '../');

console.log(chalk.yellow('NODE_ENV:', process.env.NODE_ENV));

const config = {
  entry: {
    app: path.resolve(rootPath, 'client/index.jsx'),
  },

  output: {
    path: path.resolve(rootPath, 'server/public'),
    filename: 'js/[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', 'less', 'css'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        // include: path.resolve(rootPath, 'client'),
        loader: require.resolve('babel-loader'),
        options: {

          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

module.exports = config;
