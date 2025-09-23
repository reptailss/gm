import {GmModuleConstructorProp} from '@modules/types'
import {IGmService} from '@services/inetfaces/gmService'

export interface IGmServiceClass extends IGmService {
    serviceType: 'class'

    getConstructorProp():GmModuleConstructorProp

}

