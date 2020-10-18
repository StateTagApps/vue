const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  pages: {
    'x-html': {
      entry: 'src/main.js',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  chainWebpack: config => {
    config.optimization.delete("splitChunks");
  }
};
