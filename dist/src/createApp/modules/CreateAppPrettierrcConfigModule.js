"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppPrettierrcConfigModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppPrettierrcConfigModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, '.prettierrc');
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify({
            'semi': false,
            'singleQuote': true,
            'trailingComma': 'none',
            'tabWidth': 4,
            'printWidth': 180,
        }, null, 2), {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppPrettierrcConfigModule = CreateAppPrettierrcConfigModule;
//# sourceMappingURL=CreateAppPrettierrcConfigModule.js.map