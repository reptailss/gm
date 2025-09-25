#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateApp_1 = require("../src/createApp/CreateApp");
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const CONFIG_DIR = path_1.default.join(os_1.default.homedir(), '.os-gm');
const CONFIG_FILE = path_1.default.join(CONFIG_DIR, 'config.json');
function getGlobalConfig() {
    if (!fs_1.default.existsSync(CONFIG_FILE))
        return {};
    try {
        const content = fs_1.default.readFileSync(CONFIG_FILE, 'utf-8');
        return JSON.parse(content);
    }
    catch (err) {
        console.warn('Помилка читання глобального конфігу:', err);
        return {};
    }
}
async function main() {
    const args = process.argv.slice(2);
    let appName = args[0];
    if (!appName) {
        const { projectName } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Введіть назву проєкту:',
                validate: (input) => input.trim() !== '' || 'Назва проєкту не може бути пустою',
            },
        ]);
        appName = projectName;
    }
    const answers = await inquirer_1.default.prompt([
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
    ]);
    new CreateApp_1.CreateApp(appName, Object.assign(Object.assign({}, answers), { env: getGlobalConfig() }))
        .run()
        .then(() => {
        console.log('Success Create App');
    })
        .catch((err) => {
        console.error('Error creating app:', err);
        process.exit(1);
    });
}
main();
//# sourceMappingURL=createApp.js.map