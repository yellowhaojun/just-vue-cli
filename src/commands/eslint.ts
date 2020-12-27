// 创建eslint配置
import { install } from '../helper/install'
import { createConf } from '../helper/eslint'

const PACKAGES = ['eslint-plugin-vue', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']

const createEslint = function (): void {
  // 生成配置文件
  createConf()
  // 安装依赖
  install(PACKAGES, { global: false, save: true, dev: false })
}

export default createEslint
