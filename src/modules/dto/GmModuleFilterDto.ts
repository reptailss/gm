import {GmAbstractModuleType} from '@modules/abstractModule/GmAbstractModuleType'
import {IGmModuleType} from '@modules/interfaces/gmModule'
import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'
import {GmModuleDtoField} from '@modules/dto/types'


export class GmModuleFilterDto extends GmAbstractModuleType implements IGmModuleType {
    
    constructor(
        config: GmCrudConfig,
    ) {
        super(config)
    }
    
    public getPropertyName(): string {
        return `Filter${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`
    }
    
    public getDirName(): string {
        return 'dto'
    }
    
    public getFileName(): string {
        return 'index.ts'
    }
    
    public init(): void {
        this.setFileWriteMode('appendBefore')
        this.setBody(`{
            ${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}:${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type},
            date_add:Date,
            date_update:Date,
           ${this.generateDtoByColumns().map((field) => {
            return `${field.key}:${field.type}`
        })?.join('\n')},
        }`)
    }
    
    private generateDtoByColumns = (): GmModuleDtoField[] => {
        const res: GmModuleDtoField[] = []
        
        for (const key in this.getConfig().repository.columns) {
            const column = this.getConfig().repository.columns[key]
            if (
                column.type === 'OBJECT' ||
                column.type === 'JSON'
            ) {
                continue
            }
            res.push({
                key,
                type: GmModuleDtoHelper.getTypeByColumn(column.type),
                columnType: column.type,
            })
        }
        return res
    }
}
