import { prompt } from 'inquirer'

const question = [{
  type: 'input',
  name: 'name',
  message: '请输入生成的目录名称',
  default: 'test',
  filter (val) {
    return val.trim()
  }
}]

const create: () => void = async () => {
  console.log('create')
  const { name } = await prompt(question)
  console.log(name)
}

export default create
