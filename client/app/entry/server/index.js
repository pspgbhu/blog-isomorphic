require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: '8',
      },
    }],
    'react',
    'stage-2',
  ],
  plugins: [
    'dynamic-import-node',
    [
      'transform-runtime',
      {
        polyfill: false,
        regenerator: true,
      },
    ],
    [
      'babel-plugin-transform-require-ignore', {
        extensions: ['.css', '.less', '.sass', '.scss'],
      },
    ],
  ],
  extensions: ['.jsx', '.js'],
});

module.exports = {
  renderToString: require('./renderToString').default,
  reducer: require('../../store/reducers').default,
  utils: require('../../common/utils'),
};
