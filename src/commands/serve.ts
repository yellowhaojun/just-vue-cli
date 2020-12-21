import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackDevConfig from '../config/webpack.dev.conf'
import { getPort } from 'portfinder'
import { getUserDevConfig } from '../common/utils'
import { PORT } from '../common/constants'
import chalk from 'chalk'

const { port = PORT } = getUserDevConfig()

const serve = function (): void {
  const compiler = webpack(webpackDevConfig)
  getPort({ port }, (err, port) => {
    if (err) throw err
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
