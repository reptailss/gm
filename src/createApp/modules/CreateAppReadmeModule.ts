import fs from 'fs'
import path from 'path'

export class CreateAppReadmeModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'tsconfig.json')
        
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
        }
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2), {
            encoding: 'utf-8',
        })
    }
}
