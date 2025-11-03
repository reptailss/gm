import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmCrudConfig} from 'os-core-ts'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmServiceValidator} from '@services/validator/GmServiceValidator'
import {GmServiceObjectSchemaValidatorType} from '@services/schemaValidator/GmServiceObjectSchemaValidatorType'
import {GmModuleUpdateDto} from '@modules/dto/GmModuleUpdateDto'
import {GmServiceSchemaValidatorType} from '@services/schemaValidator/GmServiceSchemaValidatorType'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'
import {GmServicePaginationQueryParamsType} from '@services/paginationTypes/GmServicePaginationQueryParamsType'
import {GmServicePaginationQueryParamsValidator} from '@services/validator/GmServicePaginationQueryParamsValidator'
import {GmModuleFilterDto} from '@modules/dto/GmModuleFilterDto'


export class GmModuleValidator extends GmAbstractModuleClass implements IGmModuleClass {
    
    
    constructor(
        config: GmCrudConfig,
    ) {
        super(config)
    }
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}ValidatorFactory`
    }
    
    public getDirName(): string | null {
        return 'validator'
    }
    
    public getFileName(): string {
        return `${this.getPropertyName()}.ts`
    }
    
    public init(): void {
        
        const gmModuleValidatorGetFilterDtoMethod = new GmModuleValidatorGetFilterDtoMethod(this.getConfig())
        
        this
            .addMethod(new GmModuleValidatorGetCreateDtoMethod(this.getConfig()))
            .addMethod(new GmModuleValidatorGetUpdateDtoMethod(this.getConfig()))
            .addMethod(gmModuleValidatorGetFilterDtoMethod)
            .addMethod(new GmModuleValidatorGetPaginationMethod(this.getConfig(), gmModuleValidatorGetFilterDtoMethod.getPropertyName()))
    }
    
    public api = {
        getCreateDtoSchema: () => {
            return `${this.getPropertyName()}.${this.getMethodByIndex(0).renderMethodCall()}`
        },
        getUpdateDtoSchema: () => {
            return `${this.getPropertyName()}.${this.getMethodByIndex(1).renderMethodCall()}`
        },
        getDtoPaginationQueryParamsSchema: () => {
            return `${this.getPropertyName()}.${this.getMethodByIndex(3).renderMethodCall()}`
        },
    }
    
    
}


class GmModuleValidatorGetCreateDtoMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleCreateDto: GmModuleCreateDto
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmServiceObjectSchemaValidatorType: GmServiceObjectSchemaValidatorType
    
    constructor(config: GmCrudConfig) {
        super(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmServiceObjectSchemaValidatorType = new GmServiceObjectSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
    }
    
    public getPropertyName(): string {
        return `get${this.gmModuleCreateDto.getPropertyName()}Schema`
    }
    
    public init(): void {
        this.addModule(this.gmModuleCreateDto)
        this.addService(this.gmServiceObjectSchemaValidatorType)
        this.addService(this.gmServiceValidator)
        this.setReturnType(this.gmServiceObjectSchemaValidatorType.getSchemaValidatorType(this.gmModuleCreateDto.getPropertyName()))
        this.setMethodScope('static')
        this.appendBodyElement({
            name: 'return validator',
            value: `return ${this.gmServiceValidator.object(this.buildSchemaByColumns())}`,
        })
    }
    
    private buildSchemaByColumns(): Record<string, string> {
        
        const res: Record<string, string> = {}
        
        for (const key in this.getConfig().repository.columns) {
            switch (this.getConfig().repository.columns[key].type) {
                case 'INTEGER':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'BIGINT':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'FLOAT':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'BOOLEAN':
                    res[key] = this.gmServiceValidator.boolean()
                    break
                case 'STRING':
                    res[key] = this.gmServiceValidator.string(0, 255)
                    break
                case 'TEXT':
                    res[key] = this.gmServiceValidator.string()
                    break
                case 'DATETIME':
                    res[key] = this.gmServiceValidator.date()
                    break
                case 'JSON':
                    res[key] = this.gmServiceValidator.object({})
                    break
                case 'OBJECT':
                    res[key] = this.gmServiceValidator.object({})
                    break
            }
        }
        
        return res
    }
}

class GmModuleValidatorGetUpdateDtoMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmServiceValidator: GmServiceValidator
    private readonly gmServiceObjectSchemaValidatorType: GmServiceObjectSchemaValidatorType
    
    constructor(config: GmCrudConfig) {
        super(config)
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmServiceObjectSchemaValidatorType = new GmServiceObjectSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
    }
    
    public getPropertyName(): string {
        return `get${this.gmModuleUpdateDto.getPropertyName()}Schema`
    }
    
    
    public init(): void {
        this.addModule(this.gmModuleUpdateDto)
        this.addService(this.gmServiceObjectSchemaValidatorType)
        this.setReturnType(this.gmServiceObjectSchemaValidatorType.getSchemaValidatorType(this.gmModuleUpdateDto.getPropertyName()))
        this.setMethodScope('static')
        this.appendBodyElement({
            name: 'return validator',
            value: `return ${this.gmServiceValidator.object(this.buildSchemaByColumns())}`,
        })
    }
    
    private buildSchemaByColumns(): Record<string, string> {
        
        const res: Record<string, string> = {}
        
        for (const key in this.getConfig().repository.columns) {
            switch (this.getConfig().repository.columns[key].type) {
                case 'INTEGER':
                    res[key] = `${this.gmServiceValidator.number()}.optional()`
                    break
                case 'BIGINT':
                    res[key] = `${this.gmServiceValidator.number()}.optional()`
                    break
                case 'FLOAT':
                    res[key] = `${this.gmServiceValidator.number()}.optional()`
                    break
                case 'BOOLEAN':
                    res[key] = `${this.gmServiceValidator.boolean()}.optional()`
                    break
                case 'STRING':
                    res[key] = `${this.gmServiceValidator.string(0, 255)}.optional()`
                    break
                case 'TEXT':
                    res[key] = `${this.gmServiceValidator.string()}.optional()`
                    break
                case 'DATETIME':
                    res[key] = `${this.gmServiceValidator.date()}.optional()`
                    break
                case 'JSON':
                    res[key] = `${this.gmServiceValidator.object({})}.optional()`
                    break
                case 'OBJECT':
                    res[key] = `${this.gmServiceValidator.object({})}.optional()`
                    break
            }
        }
        
        return res
    }
}

class GmModuleValidatorGetFilterDtoMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleFilterDto: GmModuleFilterDto
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType
    private readonly gmServiceValidator: GmServiceValidator
    
    constructor(config: GmCrudConfig) {
        super(config)
        this.gmModuleFilterDto = new GmModuleFilterDto(config)
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
        this.gmServiceValidator = new GmServiceValidator()
    }
    
    public getPropertyName(): string {
        return `get${this.gmModuleFilterDto.getPropertyName()}Schema`
    }
    
    
    public init(): void {
        this.addModule(this.gmModuleFilterDto)
        this.addService(this.gmServiceSchemaValidatorType)
        this.setReturnType(this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmModuleFilterDto.getPropertyName()))
        this.setMethodScope('static')
        this.appendBodyElement({
            name: 'return validator',
            value: `return ${this.gmServiceValidator.object(this.buildSchemaByColumns())}`,
        })
    }
    
    private buildSchemaByColumns(): Record<string, string> {
        
        const res: Record<string, string> = {
            [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'number' ? this.gmServiceValidator.number() : this.gmServiceValidator.string(),
            date_add: this.gmServiceValidator.date(),
            date_update: this.gmServiceValidator.date(),
        }
        
        for (const key in this.getConfig().repository.columns) {
            switch (this.getConfig().repository.columns[key].type) {
                case 'INTEGER':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'BIGINT':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'FLOAT':
                    res[key] = this.gmServiceValidator.number()
                    break
                case 'BOOLEAN':
                    res[key] = this.gmServiceValidator.boolean()
                    break
                case 'STRING':
                    res[key] = this.gmServiceValidator.string(0, 255)
                    break
                case 'TEXT':
                    res[key] = this.gmServiceValidator.string()
                    break
                case 'DATETIME':
                    res[key] = this.gmServiceValidator.date()
                    break
            }
        }
        
        return res
    }
}

class GmModuleValidatorGetPaginationMethod extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleFilterDto: GmModuleFilterDto
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmServiceSchemaValidatorType: GmServiceSchemaValidatorType
    private readonly gmServicePaginationQueryParamsValidator: GmServicePaginationQueryParamsValidator
    
    constructor(
        config: GmCrudConfig,
        private readonly getFilterDtoCallPropVarName: string,
    ) {
        super(config)
        this.gmModuleFilterDto = new GmModuleFilterDto(config)
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType()
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServicePaginationQueryParamsValidator = new GmServicePaginationQueryParamsValidator()
    }
    
    public getPropertyName(): string {
        return `get${this.getConfig().dtoName.plural}PaginationParamsSchema`
    }
    
    
    public init(): void {
        this.addModule(this.gmModuleFilterDto)
        this.addService(this.gmServicePaginationQueryParamsType)
        this.addService(this.gmServiceSchemaValidatorType)
        this.addService(this.gmServicePaginationQueryParamsValidator)
        this.setMethodScope('static')
        this.setReturnType(
            this.gmServiceSchemaValidatorType.getSchemaValidatorType(
                this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleFilterDto.getPropertyName()),
            ),
        )
        this.appendBodyElement({
            name: 'return schema',
            value: `return ${this.gmServicePaginationQueryParamsValidator.getSchema(`this.${this.getFilterDtoCallPropVarName}()`)}`,
        })
    }
}