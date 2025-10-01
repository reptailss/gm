import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'

export class GmModuleRepositoryMethodFindByPk extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
    }
    
    public getPropertyName(): string {
        return 'findByPk'
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
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
        this.setReturnType(`Promise<Entity<${this.gmModuleEntity.getPropertyName()}> | null>`)
    }
    
}