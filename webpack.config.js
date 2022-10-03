const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require("webpack");

require('dotenv').config();

module.exports = {
  mode: "development",
  entry: "./src/run-dev.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'index.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.svg$/,
        loader: "file-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack & React",
      template: "./src/index.html",
      favicon: "./public/favicon.ico"
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_PRISMIC_ACCESS_TOKEN": JSON.stringify(process.env.REACT_APP_PRISMIC_ACCESS_TOKEN)
    })
  ],
  devServer: {
    port: 3001,
    hot: true,
  },
};
