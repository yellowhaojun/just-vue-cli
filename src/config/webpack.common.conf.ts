import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import { EXTENSIONS, HTML_TEMPLATE_PATH, CWD } from '../common/constants'
import { getCommonConfig, getEntry, getPostCssConf } from '../common/utils'
import babelConf from '../config/babel.conf'
const { alias = {}, entry = {}, eslint = { open: true }, externals = [] } = getCommonConfig()

// 获取配置
const entrys = getEntry(entry)

const webpackCommonConfig = {
  entry: entrys,
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            hotReload: true
          }
        }
      },
      {
        test: /.(png|jpe?g|gif|ico|svg)(\?\S+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name]-[hash].[hash:7].[ext]' // 指定资源路径
          }
        }
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: ['style-loader', 'css-loader', // TODO新增是否分离样式配置
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { ...getPostCssConf() }
            }
          }, 'sass-loader']
      },
      {
        test: /\.(ts|js|jsx|tsx)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelConf
      }
    ]
  },
  resolve: {
    extensions: EXTENSIONS,
    alias: {
      vue: 'vue/dist/vue.esm-browser.js',
      ...alias
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE_PATH
    })
  ],
  externals
}

// 配置ESLINT，当前方法需要使用别的包进行处理
if (eslint.open) {
  const { exclude = [], extensions = [] } = eslint
  webpackCommonConfig.plugins.push(
    new ESLintWebpackPlugin({
      context: CWD,
      extensions,
      fix: false,
      exclude,
      cache: false,
      emitError: true
    })
  )
}

export { webpackCommonConfig }
