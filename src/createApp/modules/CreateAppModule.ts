import fs from 'fs'
import path from 'path'

export class CreateAppModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'src', 'app.ts')
        
        const content =
            `
import { App } from 'os-core-ts'

export class AppService {

    private readonly app = new App()

    public async init(): Promise<void> {

        this.app
            .useCors()
            .useConsoleLogger()
            .useRequestLogger()
            .useHealth()
            .useSwagger()
            .useDashboard()
            .enableSystemModulesFromEnv()
            .initModules()

        this.app.listen()

    }

}
        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}
