import merge from 'webpack-merge'
import webpack from 'webpack'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import { webpackCommonConfig } from './webpack.common.conf'
import { DEV_MODE, DEFAULT_ENTRY, DEFAULT_OUTPUT } from '../common/constants'
import { setNodeEnv, getDefineNodeEnv } from '../common/utils'

setNodeEnv(DEV_MODE)

const webpackDevConfig = merge(webpackCommonConfig as any, {
  mode: DEV_MODE,
  entry: DEFAULT_ENTRY,
  output: {
    path: DEFAULT_OUTPUT,
    filename: '[name].js'
  },
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
