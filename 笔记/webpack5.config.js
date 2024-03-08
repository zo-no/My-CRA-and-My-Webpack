/*
@Date		:2023/12/01 23:42:07
@Author		:zono
@Description:
1.图片处理
$ yarn add file-loader url-loader -D
图片大了，就用file-loader，小了就用url-loader，大了就不会转成base64，小了就会转成base64
file-loader：把图片拷贝到dist目录下
url-loader：把图片转换成base64格式，减少http请求，但是如果图片过大，会导致js文件过大，反而会增加http请求

路径问题：
1.在js中引入图片，要先基于ES6的模块化导入，这样webpack才能识别
2。要使用绝对地址，否则会找不到文件，解决办法如下：
2.1.在webpack.config.js中配置resolve
*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin"); //把css以外链式的方式引入到html中
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); //压缩css
const TerserPlugin = require("terser-webpack-plugin"); //压缩js

module.exports = {
  resolve: {
    // 设置解析器：配置别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        type: "javascript/auto", //webpack5要求,webpack5默认使用ES6模块化解析，而html-withimg-loader使用的是commonjs规范，所以会报错
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false, //关闭ES6模块化
              limit: 200 * 1024, //如果图片大于200kb，就以路径的方式引入，否则就以base64的方式引入
              outputPath: "images", //图片打包后存放的目录
              name: "[name].[hash:8].[ext]", //编译后没有被BASE64的图片打包后的名称
            },
          },
        ],
      },
    ],
  },
  // 设置打包的最大资源大小
  performance: {
    maxAssetSize: 100 * 1024 * 1024, //100M
    maxEntrypointSize: 100 * 1024 * 1024, //100M
  },
};
