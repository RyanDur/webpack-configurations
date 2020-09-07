const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.configCSS = ({sourceMap, devMode: production}) => ({
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !production,
            reloadAll: true,
            sourceMap
          }
        },
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
      include: /src/
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  ]
});