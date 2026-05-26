import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiSql} from '@modules/repository/api/GmModuleRepositoryApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {
    GmAbstractModuleClassRepositorySql,
} from '@modules/repository/abstractRepository/GmAbstractModuleClassRepositorySql'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmExport} from '@export/types'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'


const PROP_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
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
    
    public readonly sqlRepository: SqlRepository
    
    constructor(
        config: GmCrudConfig,
        private readonly loaderSqlRepository: string,
        private readonly entityVarName: string,
    ) {
        super(config)
        this.sqlRepository = new SqlRepository(config, `this.${PROP_VAR_NAMES.repository}`)
    }
    
    public getPropertyName(): string {
        return 'load'
    }
    
    public init() {
        this.addModule(this.sqlRepository)
        
        this.addProp({
            type: 'number',
            varName: PROP_VAR_NAMES.legalEntityId,
            callVarName: PROP_VAR_NAMES.legalEntityId,
            decorator: null,
        })
        
        
        this.appendBodyElement({
            name: 'get repository',
            value: `
            const ${PROP_VAR_NAMES.repository} = await ${this.loaderSqlRepository}.dynamicDbConfigByLegalEntityId({
                entity:${this.entityVarName},
                ${PROP_VAR_NAMES.legalEntityId},
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

export class GmModuleRepositorySqlByDynamicLeId extends GmAbstractModuleClass implements IGmModuleRepository {
    
    public api: IGmModuleRepositoryApi
    
    private loaderRepositoryVarName: string
    private leIdVarName: string
    private loaderRepository: LoaderRepository
    private readonly gmModuleEntity: GmModuleEntity
    
    constructor(
        config: GmCrudConfig,
        {
            repositoryVarName,
            loaderRepositoryVarName,
            leIdVarName,
        }: {
            repositoryVarName: string,
            loaderRepositoryVarName: string,
            leIdVarName: string,
        },
    ) {
        super(config)
        this.loaderRepositoryVarName = loaderRepositoryVarName
        this.leIdVarName = leIdVarName
        this.api = new GmModuleRepositoryApiSql(repositoryVarName)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.loaderRepository = new LoaderRepository(
            this.getConfig(),
            `this.${PROP_VAR_NAMES.loaderSqlRepository}`,
            `this.${this.getEntityVarName()}`
        )
       
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
        return `${this.loaderRepositoryVarName}.${this.loaderRepository.getPropertyName()}(${this.leIdVarName})`
    }
    
    
    public init() {
        this.setFileWriteMode('appendAfter')
        this.addModule(this.gmModuleEntity)
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderSqlRepository',
            isLibImport: true,
        })
        
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.loaderSqlRepository,
            type: 'LoaderSqlRepository',
            privateReadOnly: true,
            defaultValue: null,
        })
        this.addConstructorProp({
            varName: this.getEntityVarName(),
            type: this.gmModuleEntity.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        })
        
        
        this.addMethod(this.loaderRepository)
        this.addDecorator(new GmInjectableDec())
        
    }
    
    private getEntityVarName():string {
        return this.gmModuleEntity.getPropertyName().toLowerCase()
    }
    
}