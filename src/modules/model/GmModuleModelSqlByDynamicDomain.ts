import {GmAbstractModuleFnModelSql} from '@modules/model/abstractModel/GmAbstractModuleFnModelSql'
import {IGmModuleModel} from '@modules/model/interfaces/gmModuleModel'
import {IGmModuleModelApi} from '@modules/model/interfaces/gmModuleModelApi'
import {GmConfig} from '@config/types'
import {GmModuleModeApiSql} from '@modules/model/api/GmModuleModeApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


const PROP_VAR_NAMES = {
    domain: 'domain',
} as const

export class GmModuleModelSqlByDynamicDomain extends GmAbstractModuleFnModelSql implements IGmModuleModel {

    public api: IGmModuleModelApi

    private getModelCbVarName: string
    private domainVarName: string

    constructor(
        config: GmConfig,
        {
            modelVarName,
            domainVarName,
            getModelCbVarName,
        }: {
            modelVarName: string,
            getModelCbVarName: string,
            domainVarName: string,
        },
    ) {
        super(config)
        this.getModelCbVarName = getModelCbVarName
        this.domainVarName = domainVarName
        this.api = new GmModuleModeApiSql(modelVarName)
    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`
    }

    public getInitModel(): string {
        return `${this.getModelCbVarName}(${this.domainVarName})`
    }

    public init() {
        super.init()

        this.setAsyncType('async')
        this.setType(this.getModelTypePropertyName())

        this.addProp({
            varName: PROP_VAR_NAMES.domain,
            type: 'string',
        })

        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderModelSql.dynamicByDomain({
                columns:${this.getColumnsPropertyName()},
                tableName:${this.getTableNamePropertyName()},
                ${PROP_VAR_NAMES.domain},
            })`,
        })
    }

}