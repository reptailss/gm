#!/usr/bin/env node

const {execSync} = require('child_process')
const {resolve} = require('path')


const gCrudModule = `node ${resolve(__dirname, 'dist', 'commands', 'gCrudModule.js')}`
const createApp = `node ${resolve(__dirname, 'dist', 'commands', 'createApp.js')}`


const commands = {
    'g-crud': gCrudModule,
    'create-app': createApp,
}

const args = process.argv.slice(2)
const command = args[0]

try {
    if (!(command in commands)) {
        console.log(`Unknown command: ${command}`)
        process.exit(1)
    }

    if (command === 'create-app') {
        const appName = args[1]
        if (!appName) {
            console.error('Please provide an app name: create-app <appName>')
            process.exit(1)
        }
        execSync(commands[command](appName), { stdio: 'inherit' })
    } else {
        execSync(commands[command], { stdio: 'inherit' })
    }

    execSync(commands[command], {stdio: 'inherit'})

} catch (error) {
    console.error('Error executing command:', error)
    process.exit(1)
}
