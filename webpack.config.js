const path = require('path');
const glob = require('glob');

const projectRoot = path.resolve(__dirname);
const publicRoot = path.resolve(__dirname, 'public');
const jsSrcRoot = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  entry: async () => {
    const files = await new Promise((resolve, reject) => {
      glob(`${projectRoot}/src/*.tsx`, (err, matches) => {
        if (err) return reject(err);
        resolve(matches)
      });
    });

    const namePathPair = Object.fromEntries(files.map(file => {
      const filePath = path.parse(file);
      const entry = path.relative(jsSrcRoot, path.join(filePath.dir, filePath.name));
      return [entry, file];
    }));


    return namePathPair;
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/js/',
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