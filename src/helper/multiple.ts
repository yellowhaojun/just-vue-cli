import ejs from 'ejs'
import fs from 'fs'
import path from 'path'
import { CWD } from '../common/constants'
import { getPages, getFileExists } from '../common/utils'
const pages = getPages()

/**
 * 创建临时文件
 */
export const createTemp = function (): void {
  const pageTempl = path.join(__dirname, '../../templates/page.ejs')
  const mainTempl = path.join(__dirname, '../../templates/main.ejs')

  // 创建page.ts文件
  const output = path.join(CWD, '.temp')

  if (!getFileExists(output)) {
    fs.mkdirSync(output)
  }

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

/**
 * 路由
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const router = function (app: any): void {
  const renderDefaultHtml = (pageId: string) => {
    return `
        <div id="app">
          <div id="scriptArea" data-page-id="${pageId}"></div>
          <script src="/app.js"></script>
        </body>
        </html>
      `
  }

  const lisStyle = 'margin-bottom: 15px;list-style-type: none;color: #808080;'
  const ulStyle = 'margin: 10px 0; padding: 10px;'
  const aStyle = 'font-size: 14px;color: #808080;text-decoration: none;'

  const htmlHead = `<!DOCTYPE html><html><head>
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="screen-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="browsermode" content="application">
    <meta name="x5-orientation" content="portrait">
    <meta name="x5-fullscreen" content="true">
    <meta name="x5-page-mode" content="app">
    <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <title>导航</title>
  </head>
  <body>`

  const indexHtml = [htmlHead, `<ul style="${ulStyle}">`]
  app.get('/', function (req, res) {
    indexHtml.push('</ul></body></html>')
    res.set('Content-Type', 'text/html')
    res.send(indexHtml.join(''))
    res.end()
  })
  pages.forEach(function (page) {
    const { name, src } = page
    indexHtml.push(`<li style="${lisStyle}"><a style="${aStyle}" href="/${name}">${name}</a></li>`)
    app.get('/' + name, function (req, res) {
      const source = src.replace('/main.ts', '')
      const filepath = path.join(CWD, source, '/index.html')

      fs.readFile(filepath, function (err, result) {
        let response = ''
        if (err) {
          response = `${htmlHead}
            ${renderDefaultHtml(name)}
          `
          res.set('Content-Type', 'text/html')
          res.send(response)
          res.end()
        } else {
          res.set('Content-Type', 'text/html')
          res.send(result)
          res.end()
        }
      })
    })
  })
}
