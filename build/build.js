const webpack = require('webpack');
const chalk = require('chalk');

process.env.NODE_ENV = 'production';

const compiler = webpack(require('./webpack.prod'));

compiler.run((err, stats) => {
  if (err) throw err;

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n');
});
