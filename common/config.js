const devConfig = {
  API_PREFIX: 'http://localhost:3000/api',
};

const prodConfig = {
  API_PREFIX: 'http://blog.pspgbhu.me/api',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

module.exports = config;
