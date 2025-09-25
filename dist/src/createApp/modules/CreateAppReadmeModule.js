"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppReadmeModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppReadmeModule {
    constructor(packageName, config) {
        this.packageName = packageName;
        this.config = config;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'README.md');
        let content = `
### ${this.packageName} API

# Параметри ініціалізації для os-core-ts у Docker контейнері:

Обов'язкові поля:

| Mode | Environment variable             | Опис                                           |
|------|----------------------------------|------------------------------------------------|
| all  | **INIT_SERVICE_KEY**             | Унікальний ключ для сервісу                    |
| all  | **INIT_SERVICE_PREFIX**          | Префікс сервісу(наприклад v1/users)            |
| all  | **INIT_SYSTEM_AUTH_TOKEN**       | Токен авторизації для роботи системи           |` +
            (this.config.hasDynamicSql ? `
| all  | **INIT_SQL_DYNAMIC_DB_HOST**     | Хост динамічної SQL бази даних                 |
| all  | **INIT_SQL_DYNAMIC_DB_PORT**     | Порт динамічної SQL бази даних                 |
| all  | **INIT_SQL_DYNAMIC_DB_USERNAME** | Ім'я користувача для динамічної SQL бази даних |
| all  | **INIT_SQL_DYNAMIC_DB_PASSWORD** | Пароль для динамічної SQL бази даних           |` : '') +
            (this.config.hasStaticSql ? `
| all  | **INIT_SQL_STATIC_DB_DATABASE**  | Назва статичної SQL бази даних                 |
| all  | **INIT_SQL_STATIC_DB_HOST**      | Хост статичної SQL бази даних                  |
| all  | **INIT_SQL_STATIC_DB_PORT**      | Порт статичної SQL бази даних                  |
| all  | **INIT_SQL_STATIC_DB_USERNAME**  | Ім'я користувача для статичної SQL бази даних  |
| all  | **INIT_SQL_STATIC_DB_PASSWORD**  | Пароль для статичної SQL бази даних            |` : '') +
            (this.config.hasMongo ? `
| all  | **INIT_MONGODB_PROTOCOL**        | Протокол підключення до MongoDB                |
| all  | **INIT_MONGODB_HOST**            | Хост MongoDB                                   |
| all  | **INIT_MONGODB_PORT**            | Порт MongoDB                                   |
| all  | **INIT_MONGODB_USER**            | Ім'я користувача MongoDB                       |
| all  | **INIT_MONGODB_PASSWORD**        | Пароль MongoDB                                 |
| all  | **INIT_MONGODB_OPTIONS**         | Додаткові опції підключення MongoDB            |` : '') +
            (this.config.hasStaticRedis ? `
| all  | **INIT_REDIS_STATIC_HOST**       | Статичний хост Redis                           |
| all  | **INIT_REDIS_STATIC_PORT**       | Статичний порт Redis                           |
| all  | **INIT_REDIS_STATIC_PASSWORD**   | Статичний пароль Redis                         |` : '') +
            (this.config.hasDynamicSql ? `
| all  | **INIT_REDIS_DYNAMIC_HOST**      | Динамічний хост Redis                          |
| all  | **INIT_REDIS_DYNAMIC_PORT**      | Динамічний порт Redis                          |
| all  | **INIT_REDIS_DYNAMIC_PASSWORD**  | Динамічний пароль Redis                        |` : '') +
            `
            
Api url:

| Mode | Environment variable                      | Дефолтне значення | Опис                                 |
|------|-------------------------------------------|-------------------|--------------------------------------|
| all  | INIT_URL_AUTH_SERVICE                     |                   | URL для сервісу автентифікації       |
| all  | INIT_URL_FOR_CHECK_AUTH                   |                   | URL для перевірки автентифікації     |
| all  | INIT_URL_TO_ACTIONS_SYSTEM_LOGGER_SERVICE |                   | URL для логера дій                   |
| all  | INIT_URL_OS_STATUS_SERVICE                |                   | URL для системного логера            |` +
            (this.config.hasStructureAccess ? `
| all  | INIT_URL_STRUCTURE_ACCESS_SERVICE         |                   | URL для сервісу доступу по структурі |` : '') +
            `
            
# Не обов'язкові поля:


Налаштування:
(0 - вимкнено, 1 - увімкнено)

| Mode | Environment variable                           | Дефолтне значення       | Опис                                                                             |
|------|------------------------------------------------|-------------------------|----------------------------------------------------------------------------------|
| all  | INIT_SERVICE_PORT                              | 3000                    | Порт для запуску сервісу Node.js                                                 |
| all  | INIT_USE_SWAGGER                               | 0                       | Використання swagger (0,1)                                                       |
| all  | INIT_HAS_CORS                                  | 1                       | Включення CORS (0,1)                                                             |
| all  | INIT_HAS_CONSOLE_LOGGER_REQUESTS               | 0                       | Дублювати логування запитів у консоль (0,1)                                      |
| all  | INIT_HAS_SEND_ACTION_SYSTEM_LOGGER             | 1                       | Відправка інформації на сервіс про створення, редагування даних (0,1)            |
| all  | INIT_SWAGGER_URL                               | http://localhost:{порт} | URL для документації Swagger                                                     |
| all  | INIT_SWAGGER_DEFAULT_AUTH_TOKEN                |                         | Дефолтний токен авторизації для swagger (лише для dev режиму)                    |` +
            (this.config.hasDynamicSql ? `
| all  | INIT_REDIS_CLIENT_DATABASE_PREFIX              |                         | Префікс до редісу для отримання назви бази даних за доменом                      |
| all  | INIT_SQL_DYNAMIC_DB_DIALECT                    | mysql                   | Діалект динамічної SQL бази даних (mysql,mariadb)                                |
| all  | INIT_SQL_DYNAMIC_DB_ENCODING                   | utf8                    | Кодування динамічної SQL бази даних                                              |
| all  | INIT_SQL_DYNAMIC_DB_TIMEZONE                   | +00:00                  | Часовий пояс для динамічної SQL бази даних                                       |
| all  | INIT_SQL_DYNAMIC_CHECK_READINESS_DATABASE_NAME |                         | Назва динамічної бази даних для HEALTH-чеків                                     |` : '') +
            (this.config.hasStaticSql ? `
| all  | INIT_SQL_STATIC_DB_DIALECT                     | mysql                   | Діалект статичної SQL бази даних (mysql,mariadb)                                 |
| all  | INIT_SQL_STATIC_DB_ENCODING                    | utf8                    | Кодування статичної SQL бази даних                                               |
| all  | INIT_SQL_STATIC_DB_TIMEZONE                    | +00:00                  | Часовий пояс для статичної SQL бази даних                                        |` : '') +
            (this.config.hasStructureAccess ? `
| all  | INIT_USE_STRUCTURE_ACCESS                      | 0                       | Використовувати доступ по сервісу структури (0,1)                                |` : '') +
            (this.config.hasAws ? `
| all  | INIT_AWS_S3_BUCKET                             |                         | bucket для S3                                                                    |
| all  | INIT_AWS_S3_REGION                             |                         | Регіон для S3                                                                    |
| all  | INIT_AWS_S3_ACCESS_KEY                         |                         | Ключ для S3                                                                      |
| all  | INIT_AWS_S3_SECRET_KEY                         |                         | Секрет для S3                                                                    |
| all  | INIT_HAS_AWS_S3_UPLOAD                         | 0                       | Чи завантажувати файли на S3 (0=локально)                                        |` : '');
        content = content.replace(/\n{3,}/g, '\n\n');
        fs_1.default.writeFileSync(packageJsonPath, content, { encoding: 'utf-8' });
    }
}
exports.CreateAppReadmeModule = CreateAppReadmeModule;
//# sourceMappingURL=CreateAppReadmeModule.js.map