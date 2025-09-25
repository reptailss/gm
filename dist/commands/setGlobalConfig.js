#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const inquirer_1 = __importDefault(require("inquirer"));
const CONFIG_DIR = path_1.default.join(os_1.default.homedir(), '.os-gm');
const CONFIG_FILE = path_1.default.join(CONFIG_DIR, 'config.json');
if (!fs_1.default.existsSync(CONFIG_DIR))
    fs_1.default.mkdirSync(CONFIG_DIR, { recursive: true });
let config = {};
if (fs_1.default.existsSync(CONFIG_FILE)) {
    try {
        config = JSON.parse(fs_1.default.readFileSync(CONFIG_FILE, 'utf-8'));
    }
    catch (_a) {
        console.warn('Помилка при читанні глобального конфігу. Створюємо новий.');
        config = {};
    }
}
const args = process.argv.slice(2);
let key = args[0];
let value = args[1];
async function main() {
    if (!key) {
        const answer = await inquirer_1.default.prompt([
            { type: 'input', name: 'key', message: 'Введіть ключ:' }
        ]);
        key = answer.key;
    }
    if (!value) {
        const answer = await inquirer_1.default.prompt([
            { type: 'input', name: 'value', message: `Введіть значення для ${key}:` }
        ]);
        value = answer.value;
    }
    config[key] = value;
    fs_1.default.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { encoding: 'utf-8' });
    console.log(`Глобальна конфігурація збережена: ${key}=${value}`);
}
main().catch(err => {
    console.error('Помилка збереження глобального конфігу:', err);
    process.exit(1);
});
//# sourceMappingURL=setGlobalConfig.js.map