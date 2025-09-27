import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmModuleDbConnectionSql} from '@modules/dbConnectionSql/GmModuleDbConnectionSql'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiSql} from '@modules/repository/api/GmModuleRepositoryApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {
    GmAbstractModuleClassRepositorySql,
} from '@modules/repository/abstractRepository/GmAbstractModuleClassRepositorySql'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'

const VAR_NAMES = {
    repository: 'repository',
}

export class GmModuleRepositorySqlByStaticDb extends GmAbstractModuleClassRepositorySql implements IGmModuleRepository {
    
    public api: IGmModuleRepositoryApi
    private readonly gmModuleDbConnectionSql: GmModuleDbConnectionSql
    
    constructor(
        config: GmCrudConfig,
        repositoryVarName: string,
    ) {
        super(config, `this.${VAR_NAMES.repository}`)
        this.gmModuleDbConnectionSql = new GmModuleDbConnectionSql(config)
        this.api = new GmModuleRepositoryApiSql(repositoryVarName)
        
    }
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
    }
    
    public init() {
        
        super.init()
        
        this.addDecorator(new GmInjectableDec())
        
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderSqlRepository',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'ISqlRepository',
            isLibImport: true,
        })
        this.addVar({
            varName: VAR_NAMES.repository,
            scope: 'private',
            type: `ISqlRepository<${this.getEntityName()}>`,
            readonly: true,
            defaultValue: null,
        })
        this.addConstructorProp({
            varName: 'loaderSqlRepository',
            privateReadOnly: false,
            type: 'LoaderSqlRepository',
            defaultValue: null,
        })
        this.addModule(this.gmModuleDbConnectionSql)
        
        
        this.addElementConstructorBody(`
        this.${VAR_NAMES.repository} = loaderSqlRepository.staticByDbConnection({
            entity:${this.getEntityInstance()},
            dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            tableName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
        })
        `)
        
        
    }
    
}
