import {GmAbstractModuleConstantRepositorySql} from '@modules/repository/abstractRepository/GmAbstractModuleConstantRepositorySql'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmModuleDbConnectionSql} from '@modules/dbConnectionSql/GmModuleDbConnectionSql'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiSql} from '@modules/repository/api/GmModuleRepositoryApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


export class GmModuleRepositorySqlByStaticDb extends GmAbstractModuleConstantRepositorySql implements IGmModuleRepository {
    
    public api: IGmModuleRepositoryApi
    
    private gmModuleDbConnectionSql: GmModuleDbConnectionSql
    
    constructor(
        config: GmCrudConfig,
        repositoryVarName: string,
    ) {
        super(config)
        this.gmModuleDbConnectionSql = new GmModuleDbConnectionSql(config)
        this.api = new GmModuleRepositoryApiSql(repositoryVarName)
    }
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Repository`
    }
    
    public init() {
        
        super.init()
        
        this.addModule(this.gmModuleDbConnectionSql)
        this.setType(this.getRepositoryTypePropertyName())
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`
        this.setBody(
            `
            LoaderSqlRepository.staticByDbConnection({
                 ${entity},
                 tableName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                 dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            })`)
        
        
    }
    
}
