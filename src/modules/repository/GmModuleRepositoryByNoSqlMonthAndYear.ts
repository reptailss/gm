import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiNoSql} from '@modules/repository/api/GmModuleRepositoryApiNoSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmExport} from '@export/types'
import {
    GmAbstractModuleClassRepositoryNoSql,
} from '@modules/repository/abstractRepository/GmAbstractModuleClassRepositoryNoSql'


const PROP_VAR_NAMES = {
    month: 'month',
    year: 'year',
    loaderNoSqlRepository: 'loaderNoSqlRepository',
    repository: 'repository',
    entity: 'entity',
} as const

class NoSqlRepository extends GmAbstractModuleClassRepositoryNoSql implements IGmModuleClass {
    
    
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
            propertyName: 'INoSqlRepository',
            isLibImport: true,
        })
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.repository,
            privateReadOnly: true,
            type: `INoSqlRepository<${this.getEntityName()}>`,
            defaultValue: null,
        })
    }
    
}


class LoaderRepository extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly noSqlRepository: NoSqlRepository
    
    constructor(
        config: GmCrudConfig,
        private readonly loaderNoSqlRepository: string,
        private readonly entityVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.noSqlRepository = new NoSqlRepository(config, `this.${PROP_VAR_NAMES.repository}`)
    }
    
    public getPropertyName(): string {
        return 'load'
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
        this.addModule(this.noSqlRepository)
        
        this.addProp({
            varName: PROP_VAR_NAMES.month,
            type: 'number',
            callVarName: PROP_VAR_NAMES.month,
            decorator: null,
        })
        
        this.addProp({
            varName: PROP_VAR_NAMES.year,
            type: 'number',
            callVarName: PROP_VAR_NAMES.year,
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'get repository',
            value: `
            const ${PROP_VAR_NAMES.repository} = await ${this.loaderNoSqlRepository}.byDatabaseNameAndYearMonth({
                 entity:${this.entityVarName},
                 collectionName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                 databaseName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                 ${PROP_VAR_NAMES.month},
                 ${PROP_VAR_NAMES.year},
            })
            `,
        })
        
        this.appendBodyElement({
            name: 'return repository',
            value: `return new ${this.noSqlRepository.getPropertyName()}(${PROP_VAR_NAMES.repository})`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<${this.noSqlRepository.getPropertyName()}>`)
    }
    
}


export class GmModuleRepositoryByNoSqlMonthAndYear extends GmAbstractModuleClass implements IGmModuleRepository {
    
    private monthVarName: string
    private yearVarName: string
    private loaderRepositoryVarName: string
    private loaderRepository: LoaderRepository
    public readonly gmModuleEntity: GmModuleEntity
    
    public api: IGmModuleRepositoryApi
    
    constructor(
        config: GmCrudConfig,
        {
            repositoryVarName,
            loaderRepositoryVarName,
            monthVarName,
            yearVarName,
            
        }: {
            repositoryVarName: string,
            loaderRepositoryVarName: string,
            monthVarName: string,
            yearVarName: string,
        },
    ) {
        super(config)
        this.loaderRepositoryVarName = loaderRepositoryVarName
        this.monthVarName = monthVarName
        this.yearVarName = yearVarName
        this.api = new GmModuleRepositoryApiNoSql(repositoryVarName)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.loaderRepository = new LoaderRepository(
            this.getConfig(),
            `this.${PROP_VAR_NAMES.loaderNoSqlRepository}`,
            `this.${PROP_VAR_NAMES.entity}`,
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
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`
        return `${this.loaderRepositoryVarName}.load(${monthStr},${yearStr})`
    }
    
    public init() {
        
        this.setFileWriteMode('appendAfter')
        this.addModule(this.gmModuleEntity)
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderNoSqlRepository',
            isLibImport: true,
        })
        
        this.addVar({
            type: null,
            defaultValue: `new ${this.gmModuleEntity.getPropertyName()}()`,
            varName: PROP_VAR_NAMES.entity,
            readonly: true,
            scope: 'public',
        })
        
        
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.loaderNoSqlRepository,
            privateReadOnly: true,
            type: 'LoaderNoSqlRepository',
            defaultValue: null,
        })
        
        this.addMethod(this.loaderRepository)
        this.addDecorator(new GmInjectableDec())
    }
    
}