import { ProxyConfigArray, ProxyConfigMap } from 'webpack-dev-server'

export type NodeEnv = 'production' | 'development' | 'test'
export interface DefineNodeEnv {
  'process.env.NODE_ENV': string;
  [key: string]: string;
}

export interface Entry {
  [key: string]: string;
}

// 编译配置
export interface BuildConfig {
  publicPath?: string;
  devtool?: string;
}

// 开发配置
export interface DevConfig {
  autoOpenBrowser?: boolean;
  cssSourceMap?: boolean;
  publicPath?: string;
  port?: number;
  proxy?: ProxyConfigArray | ProxyConfigMap;
  devtool?: string;
}

// Eslint配置
export interface EslintConfig {
  open: boolean;
  files?: string[];
  exclude?: string[];
  extensions?: string[];
}

// 通用配置
export interface CommonConfig {
  externals: { [key: string]: string }[],
  alias?: { [key: string]: string; };
  eslint?: EslintConfig;
  entry?: { [key: string]: string; };
  multiple?: boolean;
}

// 用户配置
export interface UserConfig {
  build: BuildConfig;
  dev: DevConfig;
  common: CommonConfig;
}

// postCss配置
export interface PostcssOptions {
  plugins?: string[],
  path?: string
}

export interface PageItem {
  src: string,
  page: string,
  name: string
}
