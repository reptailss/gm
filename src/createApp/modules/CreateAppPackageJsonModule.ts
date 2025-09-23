import fs from 'fs'
import path from 'path'

export class CreateAppPackageJsonModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'package.json')
        
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
                'os-core-ts': 'git+https://key/andry444/node-core-framework-typescript.git#v2.0.0',
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
        }
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2), {
            encoding: 'utf-8',
        })
    }
}
