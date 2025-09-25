import {GmAbstractModuleType} from '@modules/abstractModule/GmAbstractModuleType'
import {IGmModuleType} from '@modules/interfaces/gmModule'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


export class GmModuleDto extends GmAbstractModuleType implements IGmModuleType {

    private readonly gmModuleCreateDto: GmModuleCreateDto

    constructor(
        config: GmCrudConfig,
    ) {
        super(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
    }

    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`
    }


    public getDirName(): string {
        return this.gmModuleCreateDto.getDirName()
    }

    public getFileName(): string {
        return this.gmModuleCreateDto.getFileName()
    }


    public init(): void {
        this.addModule(this.gmModuleCreateDto, {
            hasAddImport: false,
        })
        this.setFileWriteMode('appendBefore')
        this.setBody(`
        ${this.gmModuleCreateDto.getPropertyName()} & {
            ${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}:${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type},
            date_add:Date,
            date_update:Date,
        }`)
    }
}
