import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServiceMutateRowResultType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'MutateRowResult',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'MutateRowResult'
    }

    getMutateRowResultType(type: 'string' | 'number'): string {
        return `MutateRowResult<${type}>`
    }

}
