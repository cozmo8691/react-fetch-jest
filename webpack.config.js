const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const htmlTemplate = path.join(__dirname, 'app/templates/index.html');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: [
    path.join(__dirname, 'app/style.scss'),
  ]
};

const commonConfig = merge([
  {
    entry: {
      app: ['babel-polyfill', PATHS.app],
      style: PATHS.style
    },
    output: {
      path: PATHS.build,
      filename: '[name].[hash].js',
      chunkFilename: '[chunkhash].js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  parts.indexTemplate({
    htmlTemplate,
    title: 'React-Seed',
    appMountId: 'app'
  }),
  parts.generateSourceMaps('source-map'),
  parts.lintJavaScript({ include: PATHS.app }),
  parts.loadJavaScript({ include: PATHS.app })
]);

const productionConfig = merge([
  parts.clean(PATHS.build),
  parts.minify(),
  {
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.extractSCSS({include: PATHS.style}),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[chunkhash].[ext]'
    },
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: 8080,
    poll: process.env.ENABLE_POLLING
  }),
  parts.loadSCSS({include: PATHS.style}),
  parts.loadImages(),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'development'
  ),
]);


module.exports = (env) => {
  if (env.target === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};