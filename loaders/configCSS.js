const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.configCSS = ({sourceMap, devMode: production}) => ({
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        production ? MiniCssExtractPlugin.loader : 'style-loader',
        {loader: 'css-loader', options: {importLoaders: 1, sourceMap}},
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap,
            plugins: (loader) => [
              require('postcss-import')({root: loader.resourcePath}),
              require('postcss-url')({
                url: 'rebase'
              }),
              require('postcss-autoreset')(),
              require('postcss-initial')(),
              require('postcss-preset-env')({
                stage: 3,
                features: {
                  'nesting-rules': true
                }
              }),
              require('cssnano')()
            ]
          }
        }
      ],
      exclude: /node_modules/,
      include: /src/,
      sideEffects: true
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  ]
});