module.exports = {
  build: {
    publicPath: '' // 通用路径
  },
  dev: {
    autoOpenBrowser: true, // 是否自动启动
    cssSourceMap: false, // cssSourceMap
    proxy: {}, // 代理
    publicPath: '', // 通用路径
    port: 'auto'
  }
}