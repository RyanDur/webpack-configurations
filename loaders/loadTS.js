exports.loadTS = () => ({
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
});