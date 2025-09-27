import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleDto} from '@modules/dto/GmModuleDto'

export class GmModuleRepositoryMethodFindByPk extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    public readonly gmModuleDto: GmModuleDto
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
        this.gmModuleDto = new GmModuleDto(config)
    }
    
    public getPropertyName(): string {
        return 'findByPk'
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
        this.addModule(this.gmModuleDto)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        })
        this.addProp({
            type: `number`,
            varName: 'id',
            callVarName: 'id',
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.findByPk(id)`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()} | null>`)
    }
    
}