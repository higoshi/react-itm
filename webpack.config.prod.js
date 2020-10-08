const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig,
  externals: {
    commonjs2: 'react',
  },
  devServer: {},
  mode: 'production',
};
