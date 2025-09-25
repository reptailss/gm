import {GmAbstractModuleFnRepositorySql} from '@modules/repository/abstractRepository/GmAbstractModuleFnRepositorySql'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiSql} from '@modules/repository/api/GmModuleRepositoryApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


const PROP_VAR_NAMES = {
    domain: 'domain',
} as const

export class GmModuleRepositorySqlByDynamicDomain extends GmAbstractModuleFnRepositorySql implements IGmModuleRepository {
    
    public api: IGmModuleRepositoryApi
    
    private getRepositoryCbVarName: string
    private domainVarName: string
    
    constructor(
        config: GmCrudConfig,
        {
            repositoryVarName,
            domainVarName,
            getRepositoryCbVarName,
        }: {
            repositoryVarName: string,
            getRepositoryCbVarName: string,
            domainVarName: string,
        },
    ) {
        super(config)
        this.getRepositoryCbVarName = getRepositoryCbVarName
        this.domainVarName = domainVarName
        this.api = new GmModuleRepositoryApiSql(repositoryVarName)
    }
    
    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
    }
    
    public getInitRepository(): string {
        return `${this.getRepositoryCbVarName}(${this.domainVarName})`
    }
    
    public init() {
        super.init()
        
        this.setAsyncType('async')
        this.setType(this.getRepositoryTypePropertyName())
        
        this.addProp({
            varName: PROP_VAR_NAMES.domain,
            type: 'string',
        })
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`
        this.appendBodyElement({
            name: 'return Repository',
            value: `
            return LoaderSqlRepository.dynamicByDomain({
                ${entity},
                tableName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                ${PROP_VAR_NAMES.domain},
            })`,
        })
        
    }
    
}