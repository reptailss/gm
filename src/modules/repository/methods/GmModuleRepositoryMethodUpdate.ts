import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleUpdateDto} from '@modules/dto/GmModuleUpdateDto'

export class GmModuleRepositoryMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly gmModuleDto: GmModuleDto
    public readonly gmModuleUpdateDto: GmModuleUpdateDto
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
    }
    
    public getPropertyName(): string {
        return 'update'
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleUpdateDto)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        })
        this.addProp({
            type: this.gmModuleUpdateDto.getPropertyName(),
            varName: 'updateDto',
            callVarName: 'updateDto',
            decorator: null,
        })
        
        this.addProp({
            type: `WhereSql<Entity<${this.gmModuleEntity.getPropertyName()}>>`,
            varName: 'where',
            callVarName: 'where',
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.update(updateDto,{where},true)`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`)
    }
    
}