
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
        