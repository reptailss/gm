#!/usr/bin/env node
import {CreateApp} from '@createApp/CreateApp'
import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import os from 'os'

const CONFIG_DIR = path.join(os.homedir(), '.os-gm')
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json')

function getGlobalConfig(): Record<string, string> {
    if (!fs.existsSync(CONFIG_FILE)) return {}
    
    try {
        const content = fs.readFileSync(CONFIG_FILE, 'utf-8')
        return JSON.parse(content)
    } catch (err) {
        console.warn('Помилка читання глобального конфігу:', err)
        return {}
    }
}

async function main() {
    const args = process.argv.slice(2)
    let appName = args[0]
    
    if (!appName) {
        const {projectName} = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Введіть назву проєкту:',
                validate: (input) => input.trim() !== '' || 'Назва проєкту не може бути пустою',
            },
        ])
        appName = projectName
    }
    
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'hasDynamicSql',
            message: 'Використовувати Динамічну SQL?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'hasStaticSql',
            message: 'Використовувати Статичну SQL?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'hasMongo',
            message: 'Використовувати MongoDB?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'hasStaticRedis',
            message: 'Використовувати Статичний Redis?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'hasStructureAccess',
            message: 'Використовувати доступ по структурі?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'hasAws',
            message: 'Використовувати AWS S3?',
            default: false,
        },
    ])
    
    new CreateApp(appName, {
        ...answers,
        env: getGlobalConfig(),
    })
        .run()
        .then(() => {
            console.log('Success Create App')
        })
        .catch((err) => {
            console.error('Error creating app:', err)
            process.exit(1)
        })
}

main()
