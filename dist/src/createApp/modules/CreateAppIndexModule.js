"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppIndexModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppIndexModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'src', 'index.ts');
        const content = `
import { AppService } from './app'
import { appLogger } from 'os-core-ts'

new AppService().init().then(()=>{
    appLogger.info('App Service init')
})
        `;
        fs_1.default.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppIndexModule = CreateAppIndexModule;
//# sourceMappingURL=CreateAppIndexModule.js.map