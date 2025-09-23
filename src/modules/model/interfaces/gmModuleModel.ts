import {IGmModule} from '@modules/interfaces/gmModule'
import {IGmModuleModelApi} from '@modules/model/interfaces/gmModuleModelApi'

export interface IGmModuleModel extends IGmModule {
    api: IGmModuleModelApi

}