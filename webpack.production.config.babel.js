import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import loaders from './webpack.loaders';
import cssloaders from './webpack.cssloaders';

loaders.push(cssloaders);
const env = process.env.NODE_ENV || 'production';
const plugins = env !== 'production' ? [] : [
  new webpack.optimize.UglifyJsPlugin(
    {
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
      },
    },
  ),
];
module.exports = [
  {
    entry: [
      './src/index.jsx',
    ],
    output: {
      publicPath: './',
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      loaders,
    },
    plugins,
  }, {
    entry: [
      './public/assets/css/style.scss',
    ],
    output: {
      path: path.join(__dirname, 'public/assets/css'),
      filename: 'style.css',
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: [
              'css-loader?minimize!sass-loader',
              'postcss-loader',
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
    ],
  },
];
