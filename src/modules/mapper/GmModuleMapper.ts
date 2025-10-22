import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmModuleUpdateDto} from '@modules/dto/GmModuleUpdateDto'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


class CreateDtoToEntity extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly gmModuleCreateDto: GmModuleCreateDto
    
    constructor(
        config: GmCrudConfig,
        private readonly callVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
    }
    
    public getPropertyName(): string {
        return 'createDtoToEntity'
    }
    
    public init() {
        this.setMethodScope('static')
        this.addModule(this.gmModuleEntity)
        this.addModule(this.gmModuleCreateDto)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'CreateEntity',
        })
        this.addProp({
            type: this.gmModuleCreateDto.getPropertyName(),
            varName: 'createDto',
            callVarName: this.callVarName,
            decorator: null,
        })
        this.appendBodyElement({
            name: 'return res',
            value: `return {
            ${Object.keys(this.getConfig().repository.columns).map((key) => {
                return `${key}:createDto.${key},`
            }).join('\n')}
            }`,
        })
        
        this.setReturnType(`CreateEntity<${this.gmModuleEntity.getPropertyName()}>`)
    }
    
}

class UpdateDtoToEntity extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly gmModuleUpdateDto: GmModuleUpdateDto
    
    constructor(
        config: GmCrudConfig,
        private readonly callVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
    }
    
    public getPropertyName(): string {
        return 'updateDtoToEntity'
    }
    
    public init() {
        this.setMethodScope('static')
        this.addModule(this.gmModuleEntity)
        this.addModule(this.gmModuleUpdateDto)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'UpdateEntity',
        })
        this.addProp({
            type: this.gmModuleUpdateDto.getPropertyName(),
            varName: 'updateDto',
            callVarName: this.callVarName,
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `
            const  updateEntity:UpdateEntity< ${this.gmModuleEntity.getPropertyName()}> = {}
            
             ${Object.keys(this.getConfig().repository.columns).map((key) => {
                return `if(typeof updateDto.${key} !== 'undefined'){
                    updateEntity.${key} = updateDto.${key}
                }`
            }).join('\n')}
            
            return updateEntity
         `,
        })
        
        this.setReturnType(`UpdateEntity<${this.gmModuleEntity.getPropertyName()}>`)
    }
    
    
}

class EntityDtoToDto extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly gmModuleDto: GmModuleDto
    
    constructor(
        config: GmCrudConfig,
        private readonly callVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.gmModuleDto = new GmModuleDto(config)
    }
    
    public getPropertyName(): string {
        return 'entityToDTo'
    }
    
    public init() {
        this.setMethodScope('static')
        this.addModule(this.gmModuleEntity)
        this.addModule(this.gmModuleDto)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        })
        this.addProp({
            type: this.gmModuleDto.getPropertyName(),
            varName: 'entity',
            callVarName: this.callVarName,
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return {
            ${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}:entity.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key},
            date_add:entity.date_add,
            date_update:entity.date_update,
            ${Object.keys(this.getConfig().repository.columns).map((key) => {
                return `${key}:entity.${key},`
            }).join('\n')}
            }`,
        })
        
        this.setReturnType(this.gmModuleDto.getPropertyName())
    }
    
}


class Api {
    
    constructor(
        private readonly serviceVarName: string,
        private readonly createDtoToEntityMethod: IGmModuleClassMethod,
        private readonly updateDtoToEntityMethod: IGmModuleClassMethod,
        private readonly entityToDtoMethod: IGmModuleClassMethod,
    ) {
    }
    
    public createDtoToEntity() {
        return `${this.serviceVarName}.${this.createDtoToEntityMethod.renderMethodCall()}`
    }
    
    public updateDtoToEntity() {
        return `${this.serviceVarName}.${this.updateDtoToEntityMethod.renderMethodCall()}`
    }
    
    public entityToDto() {
        return `${this.serviceVarName}.${this.entityToDtoMethod.renderMethodCall()}`
    }
}

export class GmModuleMapper extends GmAbstractModuleClass implements IGmModuleClass {
    public api!: Api
    
    constructor(config: GmCrudConfig,
                private readonly callVarNames: {
                    createDto: string
                    updateDto: string
                    entity: string
                }) {
        super(config)
    }
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Mapper`
    }
    
    public getDirName(): string {
        return 'mapper'
    }
    
    public getFileName(): string {
        return `${this.getPropertyName()}.ts`
    }
    
    public init(): void {
        this.addMethod(new CreateDtoToEntity(this.getConfig(), this.callVarNames.createDto))
        this.addMethod(new UpdateDtoToEntity(this.getConfig(), this.callVarNames.updateDto))
        this.addMethod(new EntityDtoToDto(this.getConfig(), this.callVarNames.entity))
        
        this.api = new Api(
            this.getPropertyName(),
            this.getMethodByIndex(0),
            this.getMethodByIndex(1),
            this.getMethodByIndex(2),
        )
    }
    
}