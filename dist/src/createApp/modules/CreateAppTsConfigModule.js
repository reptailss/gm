"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppTsConfigModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppTsConfigModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'README.md');
        const content = `
### ${this.packageName} API

# Параметри ініціалізації для os-core-ts у Docker контейнері:

Обов'язкові поля:

| Mode | Environment variable             | Опис                                           |
|------|----------------------------------|------------------------------------------------|
| all  | **INIT_SERVICE_KEY**             | Унікальний ключ для сервісу                    |
| all  | **INIT_SERVICE_PREFIX**          | Префікс сервісу(наприклад v1/users)            |
| all  | **INIT_SYSTEM_AUTH_TOKEN**       | Токен авторизації для роботи системи           |

Api url:

| Mode | Environment variable                      | Дефолтне значення | Опис                                 |
|------|-------------------------------------------|-------------------|--------------------------------------|
| all  | INIT_URL_AUTH_SERVICE                     |                   | URL для сервісу автентифікації       |
| all  | INIT_URL_FOR_CHECK_AUTH                   |                   | URL для перевірки автентифікації     |
| all  | INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE |                   | URL для логера дій                   |
| all  | INIT_URL_OS_STATUS_SERVICE                |                   | URL для системного логера            |

# Не обов'язкові поля:

Налаштування:
(0 - вимкнено, 1 - увімкнено)

| Mode | Environment variable                           | Дефолтне значення       | Опис                                                                             |
|------|------------------------------------------------|-------------------------|----------------------------------------------------------------------------------|
| all  | INIT_SERVICE_PORT                              | 3000                    | Порт для запуску сервісу Node.js                                                 |
| all  | INIT_USE_SWAGGER                               | 0                       | Використання swagger (0,1)                                                       |
| all  | INIT_SWAGGER_URL                               | http://localhost:{порт} | URL для документації Swagger                                                     |
| all  | INIT_SWAGGER_DEFAULT_AUTH_TOKEN                |                         | Дефолтний токен авторизації для swagger(використовувати виключно для дев режиму) |
        `;
        fs_1.default.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppTsConfigModule = CreateAppTsConfigModule;
//# sourceMappingURL=CreateAppTsConfigModule.js.map