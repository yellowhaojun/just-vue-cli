import ejs from 'ejs'
import { CWD, TEMPLATE } from '../common/constants'
import fs from 'fs'
import path from 'path'

/**
 * 创建配置文件
 */
export const createConf = function (): void {
  const eslintrc = path.join(TEMPLATE, './eslintrc.tpl')
  const eslintignore = path.join(TEMPLATE, './eslintignore.tpl')

  // 创建配置文件
  ejs.renderFile(eslintrc, {}, {}, function (err, res) {
    if (err) throw err
    fs.writeFileSync(path.join(CWD, './.eslintrc.js'), res)
  })

  // 创建忽略文件
  ejs.renderFile(eslintignore, {}, {}, function (err, res) {
    if (err) throw err
    fs.writeFileSync(path.join(CWD, './.eslintignore'), res)
  })
}
