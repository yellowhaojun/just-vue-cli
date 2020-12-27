import { prompt } from 'inquirer'
import download from 'download-git-repo'
import ora from 'ora'
import chalk from 'chalk'

const TEMPLATES = {
  'multiple-page': {
    place: 'yellowhaojun/vue-multiple-template',
    branch: ''
  },
  'single-page': {
    place: 'yellowhaojun/vue-spa-template',
    branch: ''
  }
}

const tplLists = Object.keys(TEMPLATES) || []

const question = [{
  type: 'list',
  name: 'template',
  message: 'select a template',
  choices: tplLists,
  default: tplLists[0],
  filter (val: string) {
    return val
  }
}]

const create: () => void = async () => {
  const { template } = await prompt(question)

  const templateName = template
  const gitPlace = TEMPLATES[templateName].place
  const gitBranch = TEMPLATES[templateName].branch

  const spinner = ora('downloading please wait...')
  spinner.start()
  download(`${gitPlace}${gitBranch}`, './', (err: Error) => {
    if (err) {
      console.log(err)
      process.exit()
    }
    spinner.stop()
    console.log(chalk.cyan(' download complete.\n'))
  })
}

export default create
