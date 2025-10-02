import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'

export class GmModuleNoSqlRepositoryMethodCount extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
    }
    
    public getPropertyName(): string {
        return `count`
    }
    
    public init() {
        this.addModule(this.gmModuleEntity)
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'WhereNoSql',
        })
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'WhereParams',
        })
        const entity = this.gmModuleEntity.getPropertyName()
        this.addProp({
            type: `
            {
                where?: WhereNoSql<${entity}>
                clientWhere?: WhereParams<Entity<${entity}>>
            }
            `,
            varName: 'findOptions',
            callVarName: 'findOptions',
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.count(findOptions)`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<number>`)
    }
    
}