import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'

export class GmModuleNoSqlRepositoryMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
    }
    
    public getPropertyName(): string {
        return 'create'
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        })
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'CreateEntity',
        })
        this.addProp({
            type: `CreateEntity<${this.gmModuleEntity.getPropertyName()}>`,
            varName: 'createEntity',
            callVarName: 'createEntity',
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.create(createEntity)`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<Entity<${this.gmModuleEntity.getPropertyName()}>>`)
    }
    
}