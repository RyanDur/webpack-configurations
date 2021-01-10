exports.loadJS = () => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: "pre",
        exclude: /node_modules/,
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
