import { exec } from 'shelljs'
import ora from 'ora'
import chalk from 'chalk'

interface InatallOptions {
  global?: boolean;
  save?: boolean;
  dev?: boolean;
}

export const createCommand = function (pack: string, options: InatallOptions): string {
  const command = ['npm', 'install']
  if (pack) command.push(pack)
  const { global = false, save = false, dev = false } = options
  if (global) command.push('-g')
  if (save) command.push('--save')
  if (dev) command.push('--save-dev')
  return command.join(' ')
}

/**
 * 安装inatll
 */
export const install = function (list: string[] = [], options: InatallOptions = {}): void {
  const spinner = ora('installing package...')
  const commandList: string[] = []
  // 生成命令
  if (list && list.length > 0) {
    list.forEach(item => {
      commandList.push(createCommand(item, options))
    })
  }
  spinner.start()
  exec(commandList.join('\n'))
  spinner.stop()
  chalk.cyan(' Install complete.\n')
}
