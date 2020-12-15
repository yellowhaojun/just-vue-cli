import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { EXTENSIONS, HTML_TEMPLATE_PATH, POSTCSS_CONFIG, CWD_POSTCSSS_CONFIG } from '../common/constants'
import { getCommonConfig, getFileExists } from '../common/utils'

const { alias = {} } = getCommonConfig()

export const webpackCommonConfig = {
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader',
        options: {
          hotReload: true
        }
      }
    }, {
      test: /.(png|jpe?g|gif|ico|svg)(\?\S+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]'
        }
      }
    }, {
      test: /\.(sc|sa|c)ss$/,
      use: ['style-loader', 'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              path: getFileExists(CWD_POSTCSSS_CONFIG) ? CWD_POSTCSSS_CONFIG : POSTCSS_CONFIG
            }
          }
        }, 'sass-loader']
    }, {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }]
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
  ]
}
