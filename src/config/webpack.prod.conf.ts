import merge from 'webpack-merge'
import webpack from 'webpack'
import { webpackCommonConfig } from './webpack.common.conf'
import { PROD_MODE, DEFAULT_OUTPUT } from '../common/constants'
import { setNodeEnv, getDefineNodeEnv, getUserDevConfig } from '../common/utils'
const { devtool } = getUserDevConfig()

setNodeEnv(PROD_MODE)

const webpackProdConfig = merge(webpackCommonConfig as any, {
  mode: PROD_MODE,
  devtool,
  output: {
    path: DEFAULT_OUTPUT,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      ...getDefineNodeEnv()
    })
  ]
})

export default webpackProdConfig
