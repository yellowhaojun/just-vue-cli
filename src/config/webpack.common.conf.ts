import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import { EXTENSIONS, HTML_TEMPLATE_PATH, CWD, LIMIT } from '../common/constants'
import { getCommonConfig, getPostCssConf } from '../common/utils'
import babelConf from '../config/babel.conf'
const { alias = {}, eslint = { open: true }, externals = [] } = getCommonConfig()

// 获取配置

const webpackCommonConfig = {
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
        test: /.(png|jpe?g|gif|ico)(\?\S+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: LIMIT,
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
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: LIMIT,
          name: 'fonts/[name].[hash:7].[ext]'
        }
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
