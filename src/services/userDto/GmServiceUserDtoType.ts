import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServiceUserDtoType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'UserDto',
            isLibImport: true,
        }
    }
    
    public getServiceName(): string {
        return 'UserDto'
    }
    
    public getUserInfoType(): string {
        return 'UserDto'
    }
    
}
