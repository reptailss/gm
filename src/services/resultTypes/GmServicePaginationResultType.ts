import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServicePaginationValues extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationResult',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'PaginationResult'
    }

    public getPaginationResultType(dtoType: string): string {
        return `PaginationResult<${dtoType}>`
    }

}
