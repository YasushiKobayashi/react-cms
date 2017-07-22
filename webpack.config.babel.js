import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FlowStatusWebpackPlugin from 'flow-status-webpack-plugin';

import loaders from './webpack.loaders';
import cssloaders from './webpack.cssloaders';

loaders.push(cssloaders);

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '7000';

module.exports = [
  {
    entry: [
      'react-hot-loader/patch',
      './src/index.jsx',
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      loaders,
    },
    devServer: {
      contentBase: './public',
      noInfo: true,
      hot: true,
      inline: true,
      historyApiFallback: true,
      port: PORT,
      host: HOST,
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin(),
      new FlowStatusWebpackPlugin({
        binaryPath: './node_modules/.bin/flow',
        failOnError: true,
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        files: {
          js: ['bundle.js'],
        },
      }),
    ],
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
              'css-loader?sourceMap!sass-loader',
              'postcss-loader',
            ],
          }),
        },
      ],
    },
    devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin('style.css'),
    ],
  },
];
