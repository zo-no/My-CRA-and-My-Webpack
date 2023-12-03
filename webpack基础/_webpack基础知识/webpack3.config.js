/*
@Date		:2023/12/01 23:42:07
@Author		:zono
@Description:
1.CSS处理
$ yarn add css-loader style-loader less less-loader autoprefixer postcss-loader -D
css-loader ：解析@import这种语法
style-loader ：把css插入到head标签中
less ：用来解析less文件
less-loader ：把less转换成css
autoprefixer和postcss-loader：考虑css3兼容性问题，根据browserslist自动添加前缀

2. browserslist配置(https://github.com/browserslist/browserslist)
# "> 1%": 浏览器版本大于1%
# "last 2 versions": 最近2个版本
# "not ie <= 8": 排除ie8及以下版本
# "iOS >= 7": ios7以上版本
# "Android >= 4.0": android4.0以上版本
# "Firefox >= 20": firefox20以上版本
# "Firefox ESR": 最新ESR版本

3. postcss 配置移入postcss.config.js

4.build时，不再需要内嵌式的css，而是需要外链式的css，所以需要使用插件mini-css-extract-plugin
$ yarn add mini-css-extract-plugin -D
*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin");

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
      //抽离css
      filename: "[name].[hash:8].css", //抽离后的css文件名
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
        /*CSS处理步骤：
        1.把less编译为css
        2.给CSS3设置前置
        3.处理特殊语法【@import/url】
        4.实现css的合并打包【内嵌式、外链式】*/
        test: /\.(css|less)$/, //正则匹配,哪些文件是需要处理的
        use: [
          // "style-loader", //把css以内嵌式的方式插入到head标签中(开放时使用，生产时用MiniCssExtractPlugin代替)
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
    ],
  },
};
