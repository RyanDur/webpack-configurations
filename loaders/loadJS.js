exports.loadJS = (exclude = /node_modules/) => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: "pre",
        exclude,
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
