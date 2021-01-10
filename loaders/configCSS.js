const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin');
const mqpacker = require('mqpacker');
const cssnano = require('cssnano');

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
        {
          loader: 'css-loader', options: {
            modules: true,
            sourceMap,
            importLoaders: 1,
            minimize: false,
            localIdentName: '[name]_[local]_[sha512:hash:base64:3]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap,
            plugins: (loader) => [
              require('postcss-import')({root: loader.resourcePath}),
              require('postcss-smart-asset'),
              require('postcss-autoreset')(),
              require('postcss-initial')(),
              require('postcss-preset-env')({
                stage: 3,
                features: {
                  'nesting-rules': true
                }
              }),
              cssnano,
              require('postcss-property-lookup'),
              require('postcss-advanced-variables')({
                disable: '@if, @else, @for, @each'
              }),
              require("postcss-modules-extend-rule/pre")
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
    }),
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      log: true,
      plugins: [
        mqpacker,
        cssnano,
        require("postcss-modules-extend-rule/post")
      ],
    }),
  ]
});