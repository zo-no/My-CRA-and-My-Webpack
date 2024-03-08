/*
@Date		:2023/12/02 00:39:23
@Author		:zono
@Description:关于postcss.config.js的配置
*/

module.exports = {
  //用commonjs的方式导出

  loader: "postcss-loader",
  options: {
    //如果没有options这个选项将会报错 No PostCSS Config found
    postcssOptions: {
      //postcss的一些相关配置，比如需要引入插件就在这里引入
      plugins: [require("autoprefixer")], //引入添加前缀的插件
    },
  },
}; //配合autoprefixer和browserslist给css3属性设置前缀【兼容】不同浏览器
