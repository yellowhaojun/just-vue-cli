import merge from 'webpack-merge'
import webpack from 'webpack'
import { webpackCommonConfig } from './webpack.common.conf'
import { PROD_MODE, DEFAULT_ENTRY, DEFAULT_OUTPUT } from '../common/constants'
import { setNodeEnv, getDefineNodeEnv } from '../common/utils'

setNodeEnv(PROD_MODE)

const webpackProdConfig = merge(webpackCommonConfig as any, {
  mode: PROD_MODE,
  entry: DEFAULT_ENTRY,
  output: {
    path: DEFAULT_OUTPUT,
    filename: '[name].js'
  },
  optimization: {
  },
  plugins: [
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

export default webpackProdConfig
