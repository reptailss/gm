import fs from 'fs'
import path from 'path'

export class CreateAppIndexModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'src', 'index.ts')
        
        const content =
            `
import { AppService } from './app'
import { appLogger } from 'os-core-ts'

new AppService().init().then(()=>{
    appLogger.info('App Service init')
})
        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}
