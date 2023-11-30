/*
@Date		:2023/11/30 22:06:03
@Author		:zono
@Description:基础配置知识点
*/
const path = require("path");
module.exports = {
  /*获取环境变量process.env.NODE_ENV的值，如果没有设置则默认为production
   *production生产环境:压缩代码，运行时不输出警告，NODE_ENV=production
   *development开发环境:不压缩代码，运行时输出警告，NODE_ENV=development
   */
  mode: "production",
  // 入口文件
  entry: "./src/index.js",
  // 出口文件
  output: {
    /* 打包后的文件名
     * [name]表示取文件名
     * [hash:8]：为打包后的文件创建hash名，这样写表示取hash值的前8位
     * 有助于浏览器缓存，如果文件名不变，浏览器就会认为是同一个文件，就不会重新请求
     */
    filename: "bundle.js",
    // 打包后的路径，必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
  },
};
