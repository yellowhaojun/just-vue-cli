import path from 'path'

export const DEFAULT_CONFIG = {}

export const PROD_MODE = 'production'

export const DEV_MODE = 'development'

// 默认运行环境路径
export const CWD = process.cwd()

// 默认的入口路径(为了方便测试，暂设定为demo)
export const DEFAULT_ENTRY = {
  app: path.join(CWD, './src/main.ts')
}

// 默认的出口路径
export const DEFAULT_OUTPUT = path.join(CWD, './dist')

// 可忽略后缀
export const EXTENSIONS = ['.ts', '.tsx', '.js', '.vue', '.json']

// ESLINT使用的后缀
export const ESLINT_EXTENSIONS = ['vue', 'jsx', 'ts', 'tsx']

// ESLINT exclude
export const ESLINT_EXCLUDE = ['node_modules']

// 默认模版路径
export const HTML_TEMPLATE_PATH = path.join(__dirname, '../../index.html')

// 配置的路径
export const JUST_VUE_CONFIG = path.join(CWD, './just.vue.config.js')

// 默认端口号
export const PORT = 8080

// 运行目录的postcss.config.js的路径
export const CWD_POSTCSSS_CONFIG = path.join(CWD, './postcss.config.js')

// 图片资源限制
export const LIMIT = 10000
