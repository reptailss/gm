import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServicePaginationNoSql extends GmAbstractServiceFn implements IGmService {
    
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'RepositoryNoSqlPagination',
            isLibImport: true,
        }
    }
    
    public getServiceName(): string {
        return 'RepositoryNoSqlPagination'
    }
    
    
    public getPagination({
                             paramsVarName,
                             dateStartVarName,
                             dateEndVarName,
                             getRepositoryCbVarName,
                         }: {
        paramsVarName: string,
        dateStartVarName: string,
        dateEndVarName: string,
        getRepositoryCbVarName: string,
    }): string {
        const paramsStr = paramsVarName === 'params' ? paramsVarName : `params:${paramsVarName}`
        const dateStartStr = dateStartVarName === 'dateStart' ? dateStartVarName : `dateStart:${dateStartVarName}`
        const dateEndStr = dateEndVarName === 'dateEnd' ? dateEndVarName : `dateEnd:${dateEndVarName}`
        const getRepositoryCbStr = getRepositoryCbVarName === 'getRepositoryCb' ? getRepositoryCbVarName : `getRepositoryCb:${getRepositoryCbVarName}`
        return `RepositoryNoSqlPagination.byYearAndMoth({
            ${paramsStr},
            ${dateStartStr},
            ${dateEndStr},
            ${getRepositoryCbStr}
        })
        `
    }
    
}
