import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'

export class GmModuleNoSqlRepositoryMethodFindAll extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    public readonly gmModuleEntity: GmModuleEntity
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
    }
    
    public getPropertyName(): string {
        return `findAll<ReturnAttributes extends Array<keyof ${this.gmModuleEntity.getPropertyName()}> | undefined = undefined>`
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
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'WhereParams',
        })
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OrderParams',
        })
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'NoSqlRow',
        })
        const entity = this.gmModuleEntity.getPropertyName()
        this.addProp({
            type: `
            {
                where?: WhereNoSql<${entity}>
                clientWhere?: WhereParams<Entity<${entity}>>
                order?: OrderParams<Entity<${entity}>>
                offset?: number
                limit?: number
                attributes?: ReturnAttributes
            }
            `,
            varName: 'findOptions',
            callVarName: 'findOptions',
            decorator: null,
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.findAll(findOptions)`,
        })
        
        this.setAsyncType('async')
        this.setReturnType(`Promise<NoSqlRow<${this.gmModuleEntity.getPropertyName()},ReturnAttributes>[]>`)
    }
    
}