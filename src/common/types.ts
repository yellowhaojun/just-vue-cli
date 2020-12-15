import { ProxyConfigArray, ProxyConfigMap } from 'webpack-dev-server'

export type NodeEnv = 'production' | 'development' | 'test'

export interface DefineNodeEnv {
  'process.env.NODE_ENV': string;
  [key: string]: string
}
export interface BuildConfig {
  publicPath?: string,
  devtool?: string
}
export interface DevConfig {
  autoOpenBrowser?: boolean;
  cssSourceMap?: boolean;
  publicPath?: string;
  port?: number;
  proxy?: ProxyConfigArray | ProxyConfigMap,
  devtool?: string
}
export interface CommonConfig {
  alias?: { [key: string]: string; }
}
export interface UserConfig {
  build: BuildConfig,
  dev: DevConfig,
  common: CommonConfig
}
