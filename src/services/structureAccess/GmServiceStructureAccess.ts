import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServiceStructureAccess extends GmAbstractServiceFn implements IGmService {
    
    public getServiceName(): string {
        return 'StructureAccessService'
    }
    
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'StructureAccessService',
            isLibImport: true,
        }
    }
    
    public checkAccess({
                           openUserIdVarName,
                           endpointVarName,
                           legalEntityIdVarName,
                       }: {
        openUserIdVarName: string
        legalEntityIdVarName: string
        endpointVarName: string
    }): string {
        const openUserId = openUserIdVarName === 'openUserId' ? 'openUserId' : `openUserId:${openUserIdVarName}`
        const legalEntityId = legalEntityIdVarName === 'legalEntityId' ? 'legalEntityId' : `legalEntityId:${legalEntityIdVarName}`
        const endpoint = endpointVarName === 'endpoint' ? 'endpoint' : `endpoint:${endpointVarName}`
        return `StructureAccessService.checkAccess({
            ${openUserId},
            ${legalEntityId},
            ${endpoint},
        })`
    }
    
}
