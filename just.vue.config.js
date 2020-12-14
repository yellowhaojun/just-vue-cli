const path = require('path')

module.exports = {
  // 编译时候的配置
  build: {
    publicPath: '', // 通用路径
    cssSourceMap: false, // cssSourceMap
    devtool: 'none' // sourceMap
  },
  // 开发时使用的配置
  dev: {
    autoOpenBrowser: true, // 是否自动启动
    cssSourceMap: false, // cssSourceMap
    proxy: {}, // 代理
    publicPath: '', // 通用路径
    port: 8006, // 端口号
    devtool: 'cheap-module-source-map' // sourceMap
  },
  // 通用的配置
  common: {
    // alias配置
    alias: {
      '@': path.join(__dirname, './demo/src')
    }
  }
}