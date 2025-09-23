"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppNodemonConfigModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppNodemonConfigModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'nodemon.json');
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify({
            'ignore': [
                'logs',
                'swagger-build',
                'files',
                'dist',
            ],
        }, null, 2), {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppNodemonConfigModule = CreateAppNodemonConfigModule;
//# sourceMappingURL=CreateAppNodemonConfigModule.js.map