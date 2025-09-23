import fs from 'fs'
import path from 'path'

export class CreateAppEnvModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, '.env')
        
        const content =
            `
INIT_SERVICE_PORT=3017
INIT_SERVICE_KEY=products
INIT_HAS_CORS=1
        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}
