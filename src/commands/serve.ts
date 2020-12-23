import chalk from 'chalk'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackDevConfig from '../config/webpack.dev.conf'
import { getPort } from 'portfinder'
import { getUserDevConfig, getCommonConfig } from '../common/utils'
import { PORT } from '../common/constants'
import { createTemp } from '../helper/multiple'

const { port = PORT } = getUserDevConfig()

const serve = function (): void {
  const compiler = webpack(webpackDevConfig)
  getPort({ port }, (err, port) => {
    if (err) throw err

    // 启动项目之前判断当前的路径是否存在入口
    const { multiple } = getCommonConfig()

    // 当开启多页应用的石化, 检查本地是否存在临时文件
    if (multiple) {
      createTemp()
    }

    const server = new WebpackDevServer(
      compiler,
      webpackDevConfig.devServer
    )

    // TODO 获取当前的IP地址
    server.listen(port, 'localhost', (err?: Error) => {
      if (err) throw err
    })
    let isFirstCompile = true
    compiler.hooks.done.tap('just-vue-cli serve', stats => {
      if (stats.hasErrors()) return
      if (isFirstCompile) {
        console.log('  App running at:')
        console.log(`  - Local:   ${chalk.cyan('http://localhost:')}${port}`)
        console.log('  ')
        isFirstCompile = false
      }
    })
  })
}

export default serve
