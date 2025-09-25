import {GmAbstractModuleFnRepositoryNoSql} from '@modules/repository/abstractRepository/GmAbstractModuleFnRepositoryNoSql'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiNoSql} from '@modules/repository/api/GmModuleRepositoryApiNoSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


const PROP_VAR_NAMES = {
    month: 'month',
    year: 'year',
} as const

export class GmModuleRepositoryByNoSqlMonthAndYear extends GmAbstractModuleFnRepositoryNoSql implements IGmModuleRepository {
    
    private monthVarName: string
    private yearVarName: string
    private getRepositoryCbVarName: string
    
    public api: IGmModuleRepositoryApi
    
    constructor(
        config: GmCrudConfig,
        {
            repositoryVarName,
            getRepositoryCbVarName,
            monthVarName,
            yearVarName,
            
        }: {
            repositoryVarName: string,
            getRepositoryCbVarName: string,
            monthVarName: string,
            yearVarName: string,
        },
    ) {
        super(config)
        this.getRepositoryCbVarName = getRepositoryCbVarName
        this.monthVarName = monthVarName
        this.yearVarName = yearVarName
        this.api = new GmModuleRepositoryApiNoSql(repositoryVarName)
    }
    
    
    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
    }
    
    public getInitRepository(): string {
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`
        return `${this.getRepositoryCbVarName}({${monthStr},${yearStr}})`
    }
    
    public init() {
        super.init()
        
        this.setPropsType('object')
        
        this.setAsyncType('async')
        this.setType(this.getRepositoryTypePropertyName())
        
        this.addProp({
            varName: PROP_VAR_NAMES.month,
            type: 'number',
        })
        this.addProp({
            varName: PROP_VAR_NAMES.year,
            type: 'number',
        })
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`
        this.appendBodyElement({
            name: 'return Repository',
            value: `
            return LoaderNoSqlRepository.byDatabaseNameAndYearMonth({
                ${entity},
                collectionName:${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)},
                databaseName:${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)},
                ${monthStr},
                ${yearStr},
            })`,
        })
        
    }
    
}