import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiSql} from '@modules/repository/api/GmModuleRepositoryApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {GmExport} from '@export/types'
import {
    GmAbstractModuleClassRepositorySql,
} from '@modules/repository/abstractRepository/GmAbstractModuleClassRepositorySql'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'


const PROP_VAR_NAMES = {
    domain: 'domain',
    repository: 'repository',
    loaderSqlRepository: 'loaderSqlRepository',
} as const


class SqlRepository extends GmAbstractModuleClassRepositorySql implements IGmModuleClass {
    
    
    constructor(
        config: GmCrudConfig,
        repositoryVarName: string,
    ) {
        super(config, repositoryVarName)
        
    }
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
    }
    
    public getExport(): GmExport | null {
        return null
    }
    
    public init() {
        super.init()
        this.setFileWriteMode('appendAfter')
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'ISqlRepository',
            isLibImport: true,
        })
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.repository,
            privateReadOnly: true,
            type: `ISqlRepository<${this.getEntityName()}>`,
            defaultValue: null,
        })
    }
    
}


class LoaderRepository extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly sqlRepository: SqlRepository
    
    constructor(
        config: GmCrudConfig,
        private readonly loaderSqlRepository: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.sqlRepository = new SqlRepository(config, `this.${PROP_VAR_NAMES.repository}`)
    }
    
    public getPropertyName(): string {
        return 'load'
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
        this.addModule(this.sqlRepository)
        
        this.addProp({
            type: 'string',
            varName: PROP_VAR_NAMES.domain,
            callVarName: PROP_VAR_NAMES.domain,
            decorator: null,
        })
        
        
        this.appendBodyElement({
            name: 'get repository',
            value: `
            const ${PROP_VAR_NAMES.repository} = await ${this.loaderSqlRepository}.dynamicByDomain({
                entity:new ${this.gmModuleEntity.getPropertyName()}(),
                tableName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                ${PROP_VAR_NAMES.domain},
            })
            `,
        })
        
        this.appendBodyElement({
            name: 'return repository',
            value: `return new ${this.sqlRepository.getPropertyName()}(${PROP_VAR_NAMES.repository})`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<${this.sqlRepository.getPropertyName()}>`)
    }
    
}


export class GmModuleRepositorySqlByDynamicDomain extends GmAbstractModuleClass implements IGmModuleRepository {
    
    public api: IGmModuleRepositoryApi
    
    private loaderRepositoryVarName: string
    private domainVarName: string
    private loaderRepository: LoaderRepository
    
    constructor(
        config: GmCrudConfig,
        {
            repositoryVarName,
            domainVarName,
            loaderRepositoryVarName,
        }: {
            repositoryVarName: string,
            loaderRepositoryVarName: string,
            domainVarName: string,
        },
    ) {
        super(config)
        this.loaderRepositoryVarName = loaderRepositoryVarName
        this.domainVarName = domainVarName
        this.api = new GmModuleRepositoryApiSql(repositoryVarName)
        this.loaderRepository = new LoaderRepository(this.getConfig(), `this.${PROP_VAR_NAMES.loaderSqlRepository}`)
    }
    
    public getDirName(): string {
        return 'repository'
    }
    
    public getFileName(): string {
        return 'index.ts'
    }
    
    public getPropertyName(): string {
        return `Loader${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
    }
    
    public getInitRepository(): string {
        return `${this.loaderRepositoryVarName}.${this.loaderRepository.getPropertyName()}(${this.domainVarName})`
    }
    
    public init() {
        
        this.setFileWriteMode('appendAfter')
        
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderSqlRepository',
            isLibImport: true,
        })
        
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.loaderSqlRepository,
            privateReadOnly: true,
            type: 'LoaderSqlRepository',
            defaultValue: null,
        })
        
        this.addMethod(this.loaderRepository)
        this.addDecorator(new GmInjectableDec())
        
    }
    
}