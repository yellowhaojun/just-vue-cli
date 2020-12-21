import merge from 'webpack-merge'
import webpack from 'webpack'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import { webpackCommonConfig } from './webpack.common.conf'
import { DEV_MODE, DEFAULT_OUTPUT } from '../common/constants'
import { setNodeEnv, getDefineNodeEnv, getUserDevConfig } from '../common/utils'

const { devtool, autoOpenBrowser = false } = getUserDevConfig()

setNodeEnv(DEV_MODE)

const webpackDevConfig = merge(webpackCommonConfig as any, {
  mode: DEV_MODE,
  output: {
    path: DEFAULT_OUTPUT,
    filename: '[name].js'
  },
  devtool,
  devServer: {
    logLevel: 'silent',
    clientLogLevel: 'silent',
    inline: true,
    hot: true,
    stats: 'minimal',
    publicPath: '/',
    overlay: true,
    open: autoOpenBrowser,
    quiet: false
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [],
        notes: []
      },
      clearConsole: true
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      ...getDefineNodeEnv()
    })
  ]
})

export default webpackDevConfig
