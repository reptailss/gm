import {IGmModule} from '@modules/interfaces/gmModule'
import {IGmRenderModule} from '@render/interfaces/gmRenderModule'

export class GmRenderModule implements IGmRenderModule {

    private readonly module: IGmModule


    constructor(module: IGmModule) {
        this.module = module
    }

    public renderPropertyName(): string {
        return this.module.getPropertyName()
    }


}