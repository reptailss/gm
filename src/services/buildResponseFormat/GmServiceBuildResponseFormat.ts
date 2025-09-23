import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServiceBuildResponseFormat extends GmAbstractServiceFn implements IGmService {

    public getServiceName(): string {
        return 'BuildResponseFormat'
    }

    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'BuildResponseFormat',
            isLibImport: true,
        }
    }

    public mutateRow(idVarName: String): string {
        return `BuildResponseFormat.mutateRow(${idVarName})`
    }

    public row(rowVarName: string): string {
        return `BuildResponseFormat.row(${rowVarName})`
    }

    public pagination(paginationVarName: string): string {
        return `BuildResponseFormat.pagination(${paginationVarName})`
    }


}
