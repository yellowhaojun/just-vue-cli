import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackDevConfig from '../config/webpack.dev.conf'
import { getPort } from 'portfinder'
import { getUserDevConfig } from '../common/utils'
import { PORT } from '../common/constants'

const { port = PORT } = getUserDevConfig()

const serve = function (): void {
  const server = new WebpackDevServer(
    webpack(webpackDevConfig),
    webpackDevConfig.devServer
  )

  getPort({ port }, (err, port) => {
    if (err) throw err
    // TODO 获取当前的IP地址
    server.listen(port, 'localhost', (err?: Error) => {
      if (err) throw err
    })
  })
}

export default serve
