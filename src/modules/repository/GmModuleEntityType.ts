import {GmAbstractModuleType} from '@modules/abstractModule/GmAbstractModuleType'
import {IGmModuleType} from '@modules/interfaces/gmModule'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


export class GmModuleEntityType extends GmAbstractModuleType implements IGmModuleType {


    public getPropertyName(): string {
        switch (this.getConfig().repository.type) {
            case 'staticByDbConnection':
                return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`
            case 'dynamicByDomain':
                return `Get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}RepositoryCb`
            case 'dynamicDbConfigByLegalEntityId':
                return `Get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}RepositoryCb`
            case 'byDatabaseNameAndYearMonth':
                return `Get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}RepositoryCb`
            default:
                return ''
        }
    }

    public getDirName(): string {
        return 'repository'
    }

    public getFileName(): string {
        return 'index.ts'
    }

    public init(): void {
        this.setFileWriteMode('appendAfter')

        switch (this.getConfig().repository.dbType) {
            case 'noSql': {
                this.addImport({
                    path: 'os-core-ts',
                    propertyName: 'INoSqlRepository',
                    isLibImport: true,
                })
                break
            }
            case 'sql': {
                this.addImport({
                    path: 'os-core-ts',
                    propertyName: 'ISqlRepository',
                    isLibImport: true,
                })
                break
            }
        }

        switch (this.getConfig().repository.type) {
            case 'staticByDbConnection': {
                this.setBody(`ISqlRepository<${this.getEntityName()}>`)
                break
            }
            case 'dynamicByDomain': {
                this.setBody(`(domain:string)=>Promise<ISqlRepository<${this.getEntityName()}>>`)
                break
            }
            case 'dynamicDbConfigByLegalEntityId': {
                this.setBody(`(legalEntityId:number)=>Promise<ISqlRepository<${this.getEntityName()}>>`)
                break
            }
            case 'byDatabaseNameAndYearMonth': {
                this.setBody(`(props:{month:number,year:number})=>Promise<INoSqlRepository<${this.getEntityName()}>>`)
                break
            }
        }

    }
    
    
    private getEntityName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Entity`
    }
}
