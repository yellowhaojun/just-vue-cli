import merge from 'webpack-merge'
import webpack from 'webpack'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import { webpackCommonConfig } from './webpack.common.conf'
import { DEV_MODE, DEFAULT_OUTPUT } from '../common/constants'
import { setNodeEnv, getDefineNodeEnv, getUserDevConfig } from '../common/utils'

const { devtool } = getUserDevConfig()

setNodeEnv(DEV_MODE)

const webpackDevConfig = merge(webpackCommonConfig as any, {
  mode: DEV_MODE,
  output: {
    path: DEFAULT_OUTPUT,
    filename: '[name].js'
  },
  devtool,
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    publicPath: '/',
    overlay: true
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      ...getDefineNodeEnv()
    })
  ]
  // externals: [{
  //   vue: {
  //     root: 'Vue',
  //     commonjs: 'vue',
  //     commonjs2: 'vue',
  //   }
  // }]
})

export default webpackDevConfig
