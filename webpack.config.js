const webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  watch: true,
  mode: "development",
  entry: {
    app: './src/start.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    hashFunction: "sha256"
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: ['/node_modules/'],
        use: [{ loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }]
      }
    ]
  }
}
