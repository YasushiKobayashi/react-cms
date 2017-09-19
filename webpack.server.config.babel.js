import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import nodeExternals from 'webpack-node-externals';

import loaders from './webpack.loaders';

loaders.push(
  {
    test: /\.(scss)$/,
    loaders: [
      'isomorphic-style-loader',
      'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'sass-loader',
      'postcss-loader',
    ],
  },
);

module.exports = {
  entry: path.resolve(__dirname, 'src/server.jsx'),
  output: {
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: nodeExternals(),
  module: {
    loaders,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
