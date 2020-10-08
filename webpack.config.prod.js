const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig,
  externals: [
    {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
      },
    },
  ],
  devServer: {},
  mode: 'production',
};
