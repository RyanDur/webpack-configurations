exports.loadTS = (exclude = /node_modules/) => ({
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: exclude
    }]
  },
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js']
  },
});