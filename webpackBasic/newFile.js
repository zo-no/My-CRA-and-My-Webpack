/*关于Babel-Loader配置
 Babel（或Babel编译器）：
 Babel是整个工具的名称，它作为核心引擎提供了转换代码的基本功能。通过Babel，你可以使用插件和预设来配置转换过程。

Babel插件（Plugins）：Babel插件是一组单独的转换规则，用于将高版本的JavaScript语法和功能转换为低版本的代码。每个插件通常只处理一种或少数几种特定的转换规则。

Babel预设（Preset）：Babel预设是一组预定义的插件集合，它们按照特定的规则和转换策略进行组合。预设使得配置更加方便，可以一次性加载多个相关的插件，而不需要手动一个个添加。@babel/preset-env是Babel官方提供的一个预设，它根据目标环境的配置自动确定需要的转换规则。
@babel/preset-env是Babel中最常用的预设之一，它可以根据目标环境的配置自动确定需要的转换规则。*/
module.exports = {
  presets: ["@babel/preset-env"],
};
