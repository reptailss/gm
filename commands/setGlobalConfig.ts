#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import os from 'os'
import inquirer from 'inquirer'



const CONFIG_DIR = path.join(os.homedir(), '.os-gm')
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json')

if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR, { recursive: true })

let config: Record<string, any> = {}
if (fs.existsSync(CONFIG_FILE)) {
    try {
        config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    } catch {
        console.warn('Помилка при читанні глобального конфігу. Створюємо новий.')
        config = {}
    }
}

const args = process.argv.slice(2)
let key = args[0]
let value = args[1]

async function main() {
    if (!key) {
        const answer = await inquirer.prompt([
            { type: 'input', name: 'key', message: 'Введіть ключ:' }
        ])
        key = answer.key
    }
    
    if (!value) {
        const answer = await inquirer.prompt([
            { type: 'input', name: 'value', message: `Введіть значення для ${key}:` }
        ])
        value = answer.value
    }
    
    config[key] = value
    
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { encoding: 'utf-8' })
    
    console.log(`Глобальна конфігурація збережена: ${key}=${value}`)
}

main().catch(err => {
    console.error('Помилка збереження глобального конфігу:', err)
    process.exit(1)
})
