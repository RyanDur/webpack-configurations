exports.loadTS = (options= {exclude: /node_modules/, include: undefined}) => ({
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: options.exclude,
      include: options.include
    }]
  },
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js']
  },
});