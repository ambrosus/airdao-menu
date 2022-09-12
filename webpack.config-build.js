const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'index.js',
    libraryTarget: "commonjs2"
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
  externals: {
    react: "react"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack & React",
      template: "./src/index.html",
      favicon: "./public/favicon.ico"
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    port: 3001,
    hot: true,
  },
};
