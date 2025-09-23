"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppReadmeModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppReadmeModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'tsconfig.json');
        const packageJsonContent = {
            'compilerOptions': {
                'target': 'ES2017',
                'module': 'commonjs',
                'rootDir': './src',
                'sourceMap': true,
                'outDir': 'dist',
                'esModuleInterop': true,
                'experimentalDecorators': true,
                'emitDecoratorMetadata': true,
                'forceConsistentCasingInFileNames': true,
                'strict': true,
                'strictNullChecks': true,
                'strictFunctionTypes': true,
                'skipLibCheck': true,
                'baseUrl': '.',
                'types': [
                    'node',
                ],
                'allowSyntheticDefaultImports': true,
                'moduleResolution': 'node',
                'paths': {
                    '@modules/*': [
                        'src/modules/*',
                    ],
                    '@db/*': [
                        'src/db/*',
                    ],
                },
                'plugins': [
                    {
                        'transform': 'typescript-transform-paths',
                    },
                ],
            },
            'ts-node': {
                'require': [
                    'tsconfig-paths/register',
                ],
            },
            'exclude': [
                'swaggerConfig.ts',
                'gCrudConfig.ts',
            ],
        };
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2), {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppReadmeModule = CreateAppReadmeModule;
//# sourceMappingURL=CreateAppReadmeModule.js.map