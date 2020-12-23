#!/usr/bin/env node

import { version, command, parse } from 'commander'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import packageJson from '../package.json'
import build from './commands/build'
import serve from './commands/serve'
import create from './commands/create'

version(`@just-vue-cli/cli ${packageJson.version}`)

command('build').description('build a vue app').action(build)

command('serve').description('run webpack dev server').action(serve)

command('create').description('create a app').action(create)

parse(process.argv)
