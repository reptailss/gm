#!/usr/bin/env node
import {CreateApp} from '@createApp/CreateApp'

const args = process.argv.slice(2)
const appName = args[0]

if (!appName) {
    console.error('Please provide an app name: create-app <appName>')
    process.exit(1)
}

new CreateApp(appName)
    .run()
    .then(() => {
        console.log('Success Create App')
    })
    .catch((err) => {
        console.error('Error creating app:', err)
        process.exit(1)
    })
