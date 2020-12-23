import merge from 'webpack-merge'
import webpack from 'webpack'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import { webpackCommonConfig } from './webpack.common.conf'
import { DEV_MODE, DEFAULT_OUTPUT, MULTIPLE_ENTRY } from '../common/constants'
import { setNodeEnv, getDefineNodeEnv, getUserDevConfig, getEntry, getCommonConfig } from '../common/utils'
import { router } from '../helper/multiple'

const { devtool, autoOpenBrowser = false } = getUserDevConfig()
const { multiple, entry = {} } = getCommonConfig()
const entrys = !multiple ? getEntry(entry) : MULTIPLE_ENTRY

// console.log(entrys)

setNodeEnv(DEV_MODE)

const webpackDevConfig = merge(webpackCommonConfig as any, {
  entry: entrys,
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
    quiet: false,
    before (app) {
      if (multiple) router(app)
    }
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
