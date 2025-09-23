import fs from 'fs'
import path from 'path'

export class CreateAppNodemonConfigModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'nodemon.json')
        
        fs.writeFileSync(packageJsonPath, JSON.stringify({
            'ignore': [
                'logs',
                'swagger-build',
                'files',
                'dist',
            ],
        }, null, 2), {
            encoding: 'utf-8',
        })
    }
}
