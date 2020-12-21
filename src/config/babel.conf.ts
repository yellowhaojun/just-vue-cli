export default {
  presets: ['@babel/preset-env', '@babel/typescript'], // TODO 指定ESLINT配置文件
  plugins: [
    '@vue/babel-plugin-jsx',
    '@babel/proposal-class-properties',
    '@babel/transform-runtime'
  ],
  overrides: [
    {
      test: /\.vue$/,
      plugins: [
        '@babel/transform-typescript'
      ]
    }
  ]
}
