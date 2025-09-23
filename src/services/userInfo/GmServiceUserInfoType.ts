import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServiceUserInfoType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'UserInfo',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'UserInfo'
    }

    getUserInfoType(): string {
        return `UserInfo`
    }

}
