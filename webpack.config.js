const path = require('path');

const publicRoot = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modeules/,
        use: [
          'ts-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    hot: true,
    hotOnly: true,
    contentBase: publicRoot,
    publicPath: '/js/',
    host: '0.0.0.0',
    port: '9080',
    public: '0.0.0.0:9080',
  },
}