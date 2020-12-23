import merge from 'webpack-merge'
import webpack from 'webpack'
import { webpackCommonConfig } from './webpack.common.conf'
import { PROD_MODE, DEFAULT_OUTPUT } from '../common/constants'
import { setNodeEnv, getDefineNodeEnv, getUserBuildConfig, getCommonConfig, getPageSrc, getEntry } from '../common/utils'
const { devtool } = getUserBuildConfig()
const { multiple, entry = {} } = getCommonConfig()
let entrys = {}

if (multiple && process.argv[3]) {
  entrys[`${process.argv[3]}`] = getPageSrc(process.argv[3])
} else {
  entrys = getEntry(entry)
}

setNodeEnv(PROD_MODE)

const webpackProdConfig = merge(webpackCommonConfig as any, {
  mode: PROD_MODE,
  entry: entrys,
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
