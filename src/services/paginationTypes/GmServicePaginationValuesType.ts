import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServicePaginationValuesType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationValues',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'PaginationValues'
    }

    public getPaginationValuesType(dtoType: string): string {
        return `PaginationValues<${dtoType}>`
    }

}
