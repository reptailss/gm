import fs from 'fs'
import path from 'path'

export class CreateAppSwaggerConfigModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'swaggerConfig.ts')
        
        const content =
            `
import { SwaggerConfig } from 'os-core-ts'

export default function buildSwaggerConfig(): SwaggerConfig {
    return {
        title: '${this.packageName} API',
        description: '-',
        hasAuth: true
    }
}
        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}
