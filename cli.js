#!/usr/bin/env node

const {execSync} = require('child_process')
const {resolve} = require('path')

const commands = {
    'g-crud': () => {
        execSync(`node ${resolve(__dirname, 'dist', 'commands', 'gCrudModule.js')}`, {stdio: 'inherit'})
    },
    'create-app': () => {
        execSync(`node ${resolve(__dirname, 'dist', 'commands', 'createApp.js')}`, {stdio: 'inherit'})
    },
    'set-global-config': () => {
        execSync(`node ${resolve(__dirname, 'dist', 'commands', 'setGlobalConfig.js')}`, {stdio: 'inherit'})
    },
    'help': () => {
        console.log('Доступні команди:')
        console.log('- create-app: Створює новий проект')
        console.log('- g-crud: Генерує CRUD модулі для вашого проекту на основі конфгіу - gCrudConfig.ts')
        console.log('- set-global-config: Записує глобально енв конфіг для подальшого створення проектів')
    },
}

const args = process.argv.slice(2)
const command = args[0]

try {
    if (!(command in commands)) {
        console.log(`Unknown command: ${command}`)
        process.exit(1)
    }

    const commandArgs = args.slice(1)
    commands[command](...commandArgs)

} catch (error) {
    console.error('Error executing command:', error)
    process.exit(1)
}
