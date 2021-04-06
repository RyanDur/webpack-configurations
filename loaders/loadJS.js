exports.loadJS = (options = {exclude: /node_modules/, include: undefined}) => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: "pre",
        exclude: options.exclude,
        include: options.include,
        use: ["source-map-loader", {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.jsx', '.js']
  },
});
