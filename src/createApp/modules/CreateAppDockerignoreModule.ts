import fs from 'fs'
import path from 'path'

export class CreateAppDockerignoreModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, '.dockerignore')
        
        const content =
            `
**/.git
        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}
