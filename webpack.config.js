const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./demo/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "demo/dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {

        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
};
