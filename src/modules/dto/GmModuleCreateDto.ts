import {GmAbstractModuleType} from '@modules/abstractModule/GmAbstractModuleType'
import {IGmModuleType} from '@modules/interfaces/gmModule'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleDtoField} from '@modules/dto/types'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


export class GmModuleCreateDto extends GmAbstractModuleType implements IGmModuleType {


    public getPropertyName(): string {
        return `Create${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`
    }

    public getDirName(): string {
        return 'dto'
    }

    public getFileName(): string {
        return 'index.ts'
    }

    public init(): void {
        this.addRenderData<GmModuleDtoField[]>(
            'fields',
            this.generateDtoByColumns(),
        )

        this.setBody(`{
            ${this.generateDtoByColumns().map((field) => {
            return `${field.key}:${field.type}`
        })?.join('\n')}
        }`)

    }

    private generateDtoByColumns = (): GmModuleDtoField[] => {
        const res: GmModuleDtoField[] = []

        for (const key in this.getConfig().model.columns) {
            const column = this.getConfig().model.columns[key]
            res.push({
                key,
                type: GmModuleDtoHelper.getTypeByColumn(column.type),
                columnType: column.type,
            })
        }
        return res
    }


}
