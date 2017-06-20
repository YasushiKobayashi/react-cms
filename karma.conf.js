const loaders = require('./webpack.loaders');
const cssloaders = require('./webpack.cssloaders');

loaders.push(cssloaders);

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      '__tests__/karma/*.spec.js',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      '__tests__/karma/*.spec.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      module: {
        loaders,
      },
      externals: {
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true,
      },
    },
    webpackServer: {
      noInfo: true,
    },
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
    ],
    babelPreprocessor: {
      options: {
        presets: ['airbnb'],
      },
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
  });
};
