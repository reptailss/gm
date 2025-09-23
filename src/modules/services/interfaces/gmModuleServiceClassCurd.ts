import {IGmModuleModel} from '@modules/model/interfaces/gmModuleModel'
import {
    IGmModuleServiceApiAll,
    IGmModuleServiceApiCreate,
    IGmModuleServiceApiDelete,
    IGmModuleServiceApiGet,
    IGmModuleServiceApiGetPagination,
    IGmModuleServiceApiUpdate,
} from '@modules/services/interfaces/gmModuleServiceClassCurdApi'
import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'


export interface GmModuleServiceClass extends GmModuleAbstractServiceClass {
    getModuleModel(): IGmModuleModel
}


export interface GmModuleServiceClassAll extends GmModuleAbstractServiceClass {
    api: IGmModuleServiceApiAll
}

export interface GmModuleServiceClassCreate extends GmModuleAbstractServiceClass {
    api: IGmModuleServiceApiCreate
}

export interface GmModuleServiceClassUpdate extends GmModuleAbstractServiceClass {
    api: IGmModuleServiceApiUpdate
}

export interface GmModuleServiceClassDelete extends GmModuleAbstractServiceClass {
    api: IGmModuleServiceApiDelete
}

export interface GmModuleServiceClassGet extends GmModuleAbstractServiceClass {
    api: IGmModuleServiceApiGet
}

export interface GmModuleServiceClassGetAll extends GmModuleAbstractServiceClass {
    api: IGmModuleServiceApiGetPagination
}