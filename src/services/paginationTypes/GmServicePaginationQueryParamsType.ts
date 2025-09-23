import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServicePaginationQueryParamsType extends GmAbstractServiceFn implements IGmService {

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationQueryParams',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'PaginationQueryParams'
    }


    public getPaginationQueryParamsType(dtoType: string): string {
        return `PaginationQueryParams<${dtoType}>`
    }

}
