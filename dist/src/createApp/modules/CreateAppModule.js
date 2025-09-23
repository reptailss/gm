"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'src', 'app.ts');
        const content = `
import { App } from 'os-core-ts'

export class AppService {

    private readonly app = new App()

    public async init(): Promise<void> {

        this.app
            .useCors()
            .useConsoleLogger()
            .useRequestLogger()
            .useHealth()
            .useSwagger()
            .useDashboard()
            .enableSystemModulesFromEnv()
            .initModules()

        this.app.listen()

    }

}
        `;
        fs_1.default.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppModule = CreateAppModule;
//# sourceMappingURL=CreateAppModule.js.map