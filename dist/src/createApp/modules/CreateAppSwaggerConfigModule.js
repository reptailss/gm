"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppSwaggerConfigModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppSwaggerConfigModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'swaggerConfig.ts');
        const content = `
import { SwaggerConfig } from 'os-core-ts'

export default function buildSwaggerConfig(): SwaggerConfig {
    return {
        title: '${this.packageName} API',
        description: '-',
        hasAuth: true
    }
}
        `;
        fs_1.default.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppSwaggerConfigModule = CreateAppSwaggerConfigModule;
//# sourceMappingURL=CreateAppSwaggerConfigModule.js.map