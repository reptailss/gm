"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppPackageJsonModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppPackageJsonModule {
    constructor(packageName, config) {
        this.packageName = packageName;
        this.config = config;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'package.json');
        const osCoreKey = 'INIT_OS_CORE_LIB' in this.config.env ? this.config.env.INIT_OS_CORE_LIB : 'git+https://{key}/{user}/node-core-framework-typescript.git#v3.0.0';
        const packageJsonContent = {
            name: this.packageName,
            version: '1.0.0',
            description: '',
            main: './src/app.ts',
            scripts: {
                'app': 'node ./dist/index.js',
                'dev': 'nodemon  ./src/index.ts',
                'build': 'tspc --build',
                'g-swagger': 'npx os-core-ts g-swagger',
            },
            author: '-',
            license: 'ISC',
            dependencies: {
                'os-core-ts': osCoreKey,
            },
            devDependencies: {
                '@types/node': '22.7.6',
                'nodemon': '2.0.20',
                'ts-node': '10.9.2',
                'ts-patch': '^3.3.0',
                'tsconfig-paths': '^4.2.0',
                'typescript': '5.4.2',
                'typescript-transform-paths': '^3.5.3',
            },
        };
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2), {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppPackageJsonModule = CreateAppPackageJsonModule;
//# sourceMappingURL=CreateAppPackageJsonModule.js.map