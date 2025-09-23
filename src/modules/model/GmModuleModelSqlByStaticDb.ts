import {GmAbstractModuleConstantModelSql} from '@modules/model/abstractModel/GmAbstractModuleConstantModelSql'
import {IGmModuleModel} from '@modules/model/interfaces/gmModuleModel'
import {IGmModuleModelApi} from '@modules/model/interfaces/gmModuleModelApi'
import {GmModuleDbConnectionSql} from '@modules/dbConnectionSql/GmModuleDbConnectionSql'
import {GmConfig} from 'os-core-ts'
import {GmModuleModeApiSql} from '@modules/model/api/GmModuleModeApiSql'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


export class GmModuleModelSqlByStaticDb extends GmAbstractModuleConstantModelSql implements IGmModuleModel {

    public api: IGmModuleModelApi

    private gmModuleDbConnectionSql: GmModuleDbConnectionSql

    constructor(
        config: GmConfig,
        modelVarName: string,
    ) {
        super(config)
        this.gmModuleDbConnectionSql = new GmModuleDbConnectionSql(config)
        this.api = new GmModuleModeApiSql(modelVarName)
    }

    public getPropertyName(): string {
        return `${StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Model`
    }

    public init() {

        super.init()

        this.addModule(this.gmModuleDbConnectionSql)
        this.setType(this.getModelTypePropertyName())

        this.setBody(
            `LoaderModelSql.staticByDbConnection({
                 columns:${this.getColumnsPropertyName()},
                 tableName:${this.getTableNamePropertyName()},
                dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            })`)


    }

}
