const slsw = require('serverless-webpack');
const path = require('path');

const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  plugins: [
    new Dotenv(),
  ]
};
