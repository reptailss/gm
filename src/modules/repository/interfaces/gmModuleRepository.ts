import {IGmModule} from '@modules/interfaces/gmModule'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'

export interface IGmModuleRepository extends IGmModule {
    api: IGmModuleRepositoryApi

}