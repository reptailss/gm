#!/usr/bin/env node

const { execSync } = require('child_process')
const { resolve } = require('path')

const commands = {
    'g-crud': () => execSync(`node ${resolve(__dirname, 'dist', 'commands', 'gCrudModule.js')}`, { stdio: 'inherit' }),
    'create-app': (appName) => {
        if (!appName) {
            console.error('Please provide an app name: create-app <appName>')
            process.exit(1)
        }
        execSync(`node ${resolve(__dirname, 'dist', 'commands', 'createApp.js')} ${appName}`, { stdio: 'inherit' })
    },
}

const args = process.argv.slice(2)
const command = args[0]

try {
    if (!(command in commands)) {
        console.log(`Unknown command: ${command}`)
        process.exit(1)
    }
    const commandArgs = args[1]
    commands[command](commandArgs)

} catch (error) {
    console.error('Error executing command:', error)
    process.exit(1)
}
