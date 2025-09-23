#!/usr/bin/env node

const {execSync} = require('child_process')
const {resolve} = require('path')


const gCrudModule = `ts-node ${resolve(__dirname, 'dist', 'commands', 'gCrudModule.js')}`


const commands = {
    'g-crud': gCrudModule,
}

const args = process.argv.slice(2)
const command = args[0]

try {
    if (!(command in commands)) {
        console.log(`Unknown command: ${command}`)
        process.exit(1)
    }

    execSync(commands[command], {stdio: 'inherit'})

} catch (error) {
    console.error('Error executing command:', error)
    process.exit(1)
}
