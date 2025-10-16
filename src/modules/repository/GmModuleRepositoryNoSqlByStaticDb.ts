import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmModuleDbConnectionSql} from '@modules/dbConnection/GmModuleDbConnectionSql'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiSql} from '@modules/repository/api/GmModuleRepositoryApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {
    GmAbstractModuleClassRepositorySql,
} from '@modules/repository/abstractRepository/GmAbstractModuleClassRepositorySql'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'
import {GmModuleRepositoryApiNoSql} from '@modules/repository/api/GmModuleRepositoryApiNoSql'
import {GmModuleDbConnectionNoSql} from '@modules/dbConnection/GmModuleDbConnectionNoSql'
import {
    GmAbstractModuleClassRepositoryNoSql
} from '@modules/repository/abstractRepository/GmAbstractModuleClassRepositoryNoSql'

const VAR_NAMES = {
    repository: 'repository',
}

export class GmModuleRepositoryNoSqlByStaticDb extends GmAbstractModuleClassRepositoryNoSql implements IGmModuleRepository {
    
    public api: IGmModuleRepositoryApi
    private readonly gmModuleDbConnectionNoSql: GmModuleDbConnectionNoSql
    
    constructor(
        config: GmCrudConfig,
        repositoryVarName: string,
    ) {
        super(config, `this.${VAR_NAMES.repository}`)
        this.gmModuleDbConnectionNoSql = new GmModuleDbConnectionNoSql(config)
        this.api = new GmModuleRepositoryApiNoSql(repositoryVarName)
        
    }
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
    }
    
    public init() {
        
        super.init()
        
        this.addDecorator(new GmInjectableDec())
        
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderNoSqlRepository',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'INoSqlRepository',
            isLibImport: true,
        })
        this.addVar({
            varName: VAR_NAMES.repository,
            scope: 'private',
            type: `INoSqlRepository<${this.getEntityName()}>`,
            readonly: true,
            defaultValue: null,
        })
        this.addConstructorProp({
            varName: 'loaderNoSqlRepository',
            privateReadOnly: false,
            type: 'LoaderNoSqlRepository',
            defaultValue: null,
        })
        this.addModule(this.gmModuleDbConnectionNoSql)
        
        
        this.addElementConstructorBody(`
        this.${VAR_NAMES.repository} = loaderNoSqlRepository.staticByDbConnection({
            entity:${this.getEntityInstance()},
            dbConnection:${this.gmModuleDbConnectionNoSql.getPropertyName()},
            collectionName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
        })
        `)
        
        
    }
    
}
