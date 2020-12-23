import ejs from 'ejs'
import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackDevConfig from '../config/webpack.dev.conf'
import { getPort } from 'portfinder'
import { getUserDevConfig, getCommonConfig, getPages } from '../common/utils'
import { CWD, PORT } from '../common/constants'

const { port = PORT } = getUserDevConfig()

const serve = function (): void {
  const compiler = webpack(webpackDevConfig)
  getPort({ port }, (err, port) => {
    if (err) throw err

    // 启动项目之前判断当前的路径是否存在入口
    const { multiple } = getCommonConfig()

    // 当开启多页应用的石化, 检查本地是否存在临时文件
    if (multiple) {
      const pageTempl = path.join(__dirname, '../../templates/page.ejs')
      const mainTempl = path.join(__dirname, '../../templates/main.ejs')
      // 创建page.ts文件
      const pages = getPages()
      const output = path.join(CWD, 'temp')
      ejs.renderFile(pageTempl, { pages }, {}, function (err, res) {
        if (err) throw err
        fs.writeFileSync(path.join(output, './page.ts'), res)
      })
      // 创建main.ts文件
      ejs.renderFile(mainTempl, {}, {}, function (err, res) {
        if (err) throw err
        fs.writeFileSync(path.join(output, './main.ts'), res)
      })
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
