import {GmAbstractModuleConstant} from '@modules/abstractModule/GmAbstractModuleConstant'
import {IGmModule} from '@modules/interfaces/gmModule'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


export class GmModuleDbConnectionNoSql extends GmAbstractModuleConstant implements IGmModule {

    public getPropertyName(): string {
        return 'dbConnectionStaticNoSql'
    }


    public getDirName(): string {
        return 'db'
    }

    public getFileName(): string {
        return 'dbConnection.ts'
    }


    public init(): void {
        this.setBody(`DbConnectionNoSqlFactory.getStaticByDatabaseName('${StringCaseHelper.toKebabCase(this.getConfig().moduleName)}')`)
        this.setFileWriteMode('skipIfExists')
        this.setDirType('root')
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DbConnectionNoSqlFactory',
            isLibImport: true,
            dirType: 'modules',
        })
    }

}
