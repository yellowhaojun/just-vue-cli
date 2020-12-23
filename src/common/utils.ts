import fs from 'fs'
import glob from 'glob'
import path from 'path'
import { JUST_VUE_CONFIG, ESLINT_EXTENSIONS, ESLINT_EXCLUDE, DEFAULT_ENTRY, CWD, CWD_POSTCSSS_CONFIG } from './constants'
import { NodeEnv, UserConfig, DevConfig, BuildConfig, CommonConfig, DefineNodeEnv, Entry, PostcssOptions, PageItem } from './types'
import postcssConf from '../config/postcss.conf'

/**
 * 设置NODE_ENV
 * @param {String} value
 * @returns {void}
 */
export function setNodeEnv (value: NodeEnv): void {
  process.env.NODE_ENV = value
}

/**
 * 获取用户设置的配置
 */
export function getUserConfig (): UserConfig {
  let config: UserConfig = {
    build: {
      devtool: 'none'
    },
    dev: {
      autoOpenBrowser: false,
      cssSourceMap: false,
      port: 8080,
      publicPath: '/',
      proxy: {},
      devtool: 'cheap-module-source-map'
    },
    common: {
      externals: [],
      alias: {},
      eslint: {
        open: false, // 默认关闭
        exclude: ESLINT_EXCLUDE,
        extensions: ESLINT_EXTENSIONS
      },
      entry: DEFAULT_ENTRY,
      multiple: false
    }
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const justVueConfig: UserConfig = require(JUST_VUE_CONFIG)
    config = Object.assign(config, justVueConfig)
  } catch (e) {
  }
  return config
}

/**
 * 获取用户开发配置
 * @returns {Object} DevConfig 用户开发配置
 */

export function getUserDevConfig (): DevConfig {
  return getUserConfig().dev
}

/**
 * 获取用户编译配置
 * @returns {Object} BuildConfig 编译的配置
 */
export function getUserBuildConfig (): BuildConfig {
  return getUserConfig().build
}

/**
 * 获取通用配置
 * @returns {Object} CommonConfig 通用配置
 */
export function getCommonConfig (): CommonConfig {
  return getUserConfig().common
}

/**
 * 获取定义的ENV配置
 * @returns {Object} ENV配置
 */
export function getDefineNodeEnv (): DefineNodeEnv {
  return {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
}

/**
 * 判断运行目录的是否存在某个文件
 * @param {String} file 需要判断的文件路径
 * @returns {Boolean} pass 是否存在文件
 */
export function getFileExists (file: string): boolean {
  return fs.existsSync(file)
}

/**
 * 获取实际的入口路径
 * @param entrys
 */
export function getEntry (entrys: Entry): Entry {
  const values = {}
  for (const key in entrys) {
    values[key] = path.join(CWD, entrys[key])
  }
  return values
}

/**
 * 获取postcssConfig
 */
export function getPostCssConf (): PostcssOptions {
  // const postcssOptions: PostcssOptions = {}
  const { plugins } = postcssConf
  if (getFileExists(CWD_POSTCSSS_CONFIG)) {
    return { path: CWD_POSTCSSS_CONFIG }
  }
  return { plugins: plugins }
}

/**
 * 获取页面目录
 */
export function getPages (): PageItem[] {
  const globPath = path.join(CWD, './src/pages/**/*')
  const pages: PageItem[] = []
  glob.sync(globPath).forEach(function (item) {
    const page = item.replace(CWD, '')
    const pageArrs = page.split('/')
    const _page = pageArrs[pageArrs.length - 1]
    const last = pageArrs[pageArrs.length - 2]
    const prefix = pageArrs[pageArrs.length - 3]
    if (_page === 'main.ts') {
      pages.push({
        src: pageArrs.join('/'),
        page: last,
        name: prefix !== 'pages' ? `${prefix}_${last}` : last
      })
    }
  })
  return pages
}

export function getPageSrc (name: string): string {
  const pages = getPages()
  let res = ''
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].name === name) {
      res = path.join(CWD, pages[i].src)
      break
    }
  }
  return res
}
