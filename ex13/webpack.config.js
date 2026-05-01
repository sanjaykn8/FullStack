import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: {
    login: "./src/login.js",
    form: "./src/form.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("./dist"),
    publicPath: "",
  },
  devServer: {
    static: "./src",
    open: ["login.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/login.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: "./src/form.html",
      chunks: ["form"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};