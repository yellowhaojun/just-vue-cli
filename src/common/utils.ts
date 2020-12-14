import { JUST_VUE_CONFIG } from './constants'
import { ProxyConfigArray, ProxyConfigMap } from 'webpack-dev-server'
import {} from 'webpack'

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

/**
 * 设置NODE_ENV
 * @param {String} value
 * @returns {void}
 */
export function setNodeEnv (value: NodeEnv): void {
  process.env.NODE_ENV = value
}

/**
 * 获取用户设置的配置
 */
export function getUserConfig (): UserConfig {
  let config = {
    build: {
      devtool: 'none'
    },
    dev: {
      autoOpenBrowser: false,
      cssSourceMap: false,
      port: 8080,
      publicPath: '/',
      proxy: {},
      devtool: 'cheap-module-source-map'
    },
    common: {
      alias: {}
    }
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const justVueConfig: UserConfig = require(JUST_VUE_CONFIG)
    config = Object.assign(config, justVueConfig)
  } catch (e) {
  }
  return config
}

/**
 * 获取用户开发配置
 * @returns {Object} DevConfig 用户开发配置
 */

export function getUserDevConfig (): DevConfig {
  return getUserConfig().dev
}

/**
 * 获取用户编译配置
 * @returns {Object} BuildConfig 编译的配置
 */
export function getUserBuildConfig (): BuildConfig {
  return getUserConfig().build
}

/**
 * 获取通用配置
 * @returns {Object} CommonConfig 通用配置
 */
export function getCommonConfig (): CommonConfig {
  return getUserConfig().common
}

/**
 * 获取定义的ENV配置
 * @returns {Object} ENV配置
 */
export function getDefineNodeEnv (): DefineNodeEnv {
  return {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
}
