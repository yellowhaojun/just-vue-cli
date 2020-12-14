#!/usr/bin/env node

import { version, command, parse } from 'commander'
// @ts-ignore
import packageJson from '../package.json'
import build from './commands/build'
import serve from './commands/serve'

version(`@just-vue-cli/cli ${packageJson.version}`)

command('build').description('build a vue app').action(build)

command('serve').description('run webpack dev server').action(serve)

parse(process.argv)
