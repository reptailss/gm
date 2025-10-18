import {GmAbstractModuleType} from '@modules/abstractModule/GmAbstractModuleType'
import {IGmModuleType} from '@modules/interfaces/gmModule'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleDtoField} from '@modules/dto/types'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


export class GmModuleUpdateDto extends GmAbstractModuleType implements IGmModuleType {


    constructor(
        config: GmCrudConfig,
    ) {
        super(config)
    }

    public getPropertyName(): string {
        return `Update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`
    }
    
    public getDirName(): string {
        return 'dto'
    }
    
    public getFileName(): string {
        return 'index.ts'
    }

    public init(): void {
        this.setFileWriteMode('appendAfter')
        this.setBody(`{
           ${this.generateDtoByColumns().map((field) => {
            return `${field.key}?:${field.type}`
        })?.join('\n')},
        }`)
    }
    
    private generateDtoByColumns = (): GmModuleDtoField[] => {
        const res: GmModuleDtoField[] = []
        
        for (const key in this.getConfig().repository.columns) {
            const column = this.getConfig().repository.columns[key]
            res.push({
                key,
                type: GmModuleDtoHelper.getTypeByColumn(column.type),
                columnType: column.type,
            })
        }
        return res
    }
}
