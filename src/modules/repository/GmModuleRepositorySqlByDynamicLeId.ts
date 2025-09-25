import {GmAbstractModuleFnRepositorySql} from '@modules/repository/abstractRepository/GmAbstractModuleFnRepositorySql'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {IGmModuleRepositoryApi} from '@modules/repository/interfaces/gmModuleRepositoryApi'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleRepositoryApiSql} from '@modules/repository/api/GmModuleRepositoryApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


const PROP_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
} as const

export class GmModuleRepositorySqlByDynamicLeId extends GmAbstractModuleFnRepositorySql implements IGmModuleRepository {

    public api: IGmModuleRepositoryApi

    private getRepositoryCbVarName: string
    private leIdVarName: string

    constructor(
        config: GmCrudConfig,
        {
            repositoryVarName,
            getRepositoryCbVarName,
            leIdVarName,
        }: {
            repositoryVarName: string,
            getRepositoryCbVarName: string,
            leIdVarName: string,
        },
    ) {
        super(config)
        this.getRepositoryCbVarName = getRepositoryCbVarName
        this.leIdVarName = leIdVarName
        this.api = new GmModuleRepositoryApiSql(repositoryVarName)
    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
    }

    public getInitRepository(): string {
        return `${this.getRepositoryCbVarName}(${this.leIdVarName})`
    }


    public init() {
        super.init()

        this.addProp({
            varName: PROP_VAR_NAMES.legalEntityId,
            type: 'number',
        })

        this.setAsyncType('async')
        this.setType(this.getRepositoryTypePropertyName())
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`
        this.appendBodyElement({
            name: 'return Repository',
            value: `
            return LoaderSqlRepository.dynamicDbConfigByLegalEntityId({
                ${entity},
                tableName:'${StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                ${PROP_VAR_NAMES.legalEntityId},
            })`,
        })

    }

}