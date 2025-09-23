import {GmCreateFile} from '@writeModule/GmCreateFile'
import {IGmModule} from '@modules/interfaces/gmModule'


export class GmWriteModule {
    private readonly gmCreateFile: GmCreateFile

    constructor(
        module: IGmModule,
    ) {
        module.init()
        this.gmCreateFile = new GmCreateFile(module)
    }

    public run() {
        this.gmCreateFile.run()
    }

}
