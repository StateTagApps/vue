const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  transpileDependencies: [],
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
