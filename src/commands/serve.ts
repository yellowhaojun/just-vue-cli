import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackDevConfig from '../config/webpack.dev.conf'
import { getPort } from 'portfinder'

const serve = function (): void {
  const server = new WebpackDevServer(
    webpack(webpackDevConfig),
    webpackDevConfig.devServer
  )

  getPort({ port: 8080 }, (err, port) => {
    if (err) throw err
    server.listen(port, 'localhost', (err?: Error) => {
      if (err) throw err
    })
  })
}

export default serve
