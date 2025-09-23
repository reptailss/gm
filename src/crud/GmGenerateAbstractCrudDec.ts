import {GmConfig} from '@config/types'
import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {GmWriteModule} from '@writeModule/GmWriteModule'
import {GmModuleAppModule} from '@modules/appModule/GmModuleAppModule'


export class GmGenerateAbstractCrudDec {

    private config: GmConfig
    private controllers: IGmModuleClass[] = []

    constructor(config: GmConfig, controllers: IGmModuleClass[]) {
        this.config = config
        this.controllers = controllers
    }


    public run() {

        if (!this.controllers.length) {
            return
        }

        this.controllers.forEach((controller) => {
            new GmWriteModule(controller).run()
        })

        new GmWriteModule(new GmModuleAppModule(
            this.config,
            this.controllers,
        )).run()

    }
}
