import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleDto} from '@modules/dto/GmModuleDto'

export class GmModuleNoSqlRepositoryMethodFindOne extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
    }
    
    public getPropertyName(): string {
        return 'findOne'
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
            propertyName: 'WhereNoSql',
        })
        this.addProp({
            type: `WhereNoSql<${this.gmModuleEntity.getPropertyName()}>`,
            varName: 'where',
            callVarName: 'where',
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.findOne({where})`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<Entity<${this.gmModuleEntity.getPropertyName()}> | null>`)
    }
    
}