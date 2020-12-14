import { JUST_VUE_CONFIG } from './constants'

export type NodeEnv = 'production' | 'development' | 'test'

export interface DefineNodeEnv {
  [key: string]: string
}

export interface UserConfig {
  [key: string]: string
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
  let config = {}
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
 */

// export function getUserDevConfig (): void {}

/**
 * 获取用户编译配置
 */
// export function getUserBuildConfig (): void {}

/**
 * 获取定义的ENV配置
 * @returns {Object} ENV配置
 */
export function getDefineNodeEnv (): DefineNodeEnv {
  return {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
}
