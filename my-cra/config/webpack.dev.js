/**
 * @Date        2024/01/14 10:00:28
 * @Author      zono
 * @Description react脚手架开发模式
 *
 * webpack基于Nodejs于是采用commonjs
 * */

const path = require("path");

module.exports = {
  //入口
  entry: "./src/main.js",
  //输出位置
  output: {
    // path: path.resolve(__dirname, "dist"),
    path: undefined, //文件输出目录
    filename: "static/js/[name].js", //输出文件名
    chunkFilename: "static/",
  },
  //loader
  module: {
    rules: [
      {
        //样式加载器
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  //插件
  plugins: [],
  //模式
  mode: "developement", //开发模式
};
