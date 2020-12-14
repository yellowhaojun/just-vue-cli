import webpack from 'webpack'
import ora from 'ora'
import chalk from 'chalk'
import rimraf from 'rimraf'
import webpackProdConfig from '../config/webpack.prod.conf'
import { DEFAULT_OUTPUT } from '../common/constants'

const spinner = ora('building for production...')

const build = function (): void {
  rimraf(DEFAULT_OUTPUT, (err) => {
    if (err) throw err

    spinner.start()
    webpack(webpackProdConfig, (err, stats) => {
      spinner.stop()
      if (err || stats.hasErrors()) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      chalk.cyan(' Build complete.\n')
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
}

export default build
