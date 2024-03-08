/*
@Date		:2023/12/01 23:42:07
@Author		:zono
@Description:
1.js处理()

ES6语法兼容：（把ES6转换为ES5）
$ yarn add babel-loader @babel/core @babel/preset-env @babel/polyfill -D

ES+内置API兼容：（把ES+内置API转换为ES5）
$ yarn add @babel/polyfill（生产环境也要使用）
直接再文件中导入就可以使用了import "@babel/polyfill";
这个文件不是把全部es6转换为es5，比如fetch等

2.压缩js、css
webpack5内置了压缩js的功能，但css是基于js的，所以还是需要安装js压缩插件
$ yarn add css-minimizer-webpack-plugin terser-webpack-plugin -D

*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin"); //把css以外链式的方式引入到html中
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); //压缩css
const TerserPlugin = require("terser-webpack-plugin"); //压缩js

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
  },
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "./dist"),
  },
  /*优化*/
  optimization: {
    // 设置压缩方式
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
  },
  /*使用插件*/
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true,
      chunkhash: true,
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/login.html",
      filename: "login.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      chunkhash: true,
      chunks: ["login"],
    }),
    new CleanWebpackPlugin(),
    new MinCssExtractPlugin({
      filename: "[name].[hash:8].css",
    }),
  ],
  /*使用DEV-SERVER*/
  devServer: {
    host: "127.0.0.1",
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      "/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  /*Loader加载器:
  处理顺序：下->上，右->左
  */
  module: {
    rules: [
      {
        test: /\.(css|less)$/, //正则匹配,哪些文件是需要处理的
        use: [
          {
            loader: MinCssExtractPlugin.loader, //把css以外链式的方式引入到html中
            options: {
              publicPath: "../", //css中的图片路径会以此为基准
            },
          },
          "css-loader", //处理特殊语法【@import/url】
          "postcss-loader", //两种写法：1.单独写成一个postcss.config.js文件 2.写在webpack.config.js中
          "less-loader", //把less转换成css
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"], //这里还是抽离出来一个babel.config.js文件
        // 优化处理
        include: path.resolve(__dirname, "src"), //只编译src目录下的文件
        exclude: /node_modules/, //排除node_modules目录下的文件
      },
    ],
  },
};
