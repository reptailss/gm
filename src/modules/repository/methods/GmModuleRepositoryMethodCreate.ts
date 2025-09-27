import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'

export class GmModuleRepositoryMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly gmModuleDto: GmModuleDto
    public readonly gmModuleCreateDto: GmModuleCreateDto
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
    }
    
    public getPropertyName(): string {
        return 'create'
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleCreateDto)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        })
        this.addProp({
            type: this.gmModuleCreateDto.getPropertyName(),
            varName: 'createDto',
            callVarName: 'where',
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.create(createDto)`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`)
    }
    
}