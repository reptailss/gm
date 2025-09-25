import fs from 'fs'
import path from 'path'

export class CreateAppPrettierrcConfigModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, '.prettierrc')
        
        fs.writeFileSync(packageJsonPath, JSON.stringify({
            'semi': false,
            'singleQuote': true,
            'trailingComma': 'none',
            'tabWidth': 4,
            'printWidth': 180,
        }, null, 2), {
            encoding: 'utf-8',
        })
    }
}
