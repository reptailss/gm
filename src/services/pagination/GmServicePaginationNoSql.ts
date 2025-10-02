import {GmAbstractServiceFn} from '@services/abstractService/GmAbstractServiceFn'
import {IGmService} from '@services/inetfaces/gmService'
import {GmExport} from '@export/types'

export class GmServicePaginationNoSql extends GmAbstractServiceFn implements IGmService {
    
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'MultiCollectionPaginationNoSqlRepository',
            isLibImport: true,
        }
    }
    
    public getServiceName(): string {
        return 'MultiCollectionPaginationNoSqlRepository'
    }
    
    
    public getPagination({
                             paramsVarName,
                             dateStartVarName,
                             dateEndVarName,
                             loaderRepositoryVarName,
                         }: {
        paramsVarName: string,
        dateStartVarName: string,
        dateEndVarName: string,
        loaderRepositoryVarName: string,
    }): string {
        const paramsStr = paramsVarName === 'params' ? paramsVarName : `params:${paramsVarName}`
        const dateStartStr = dateStartVarName === 'dateStart' ? dateStartVarName : `dateStart:${dateStartVarName}`
        const dateEndStr = dateEndVarName === 'dateEnd' ? dateEndVarName : `dateEnd:${dateEndVarName}`
        const loaderRepositoryStr = loaderRepositoryVarName === 'loaderRepository' ? loaderRepositoryVarName : `loaderRepository:${loaderRepositoryVarName}`
        return `MultiCollectionPaginationNoSqlRepository.byYearAndMoth({
            ${paramsStr},
            ${dateStartStr},
            ${dateEndStr},
            ${loaderRepositoryStr}
        })
        `
    }
    
}
