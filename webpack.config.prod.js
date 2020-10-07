const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig,
  mode: 'production',
};
