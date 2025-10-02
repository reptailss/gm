import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {GmCrudConfig} from 'os-core-ts'

export class GmModuleSqlRepositoryMethodGetConfig extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string,
    ) {
        super(config)
    }
    
    public getPropertyName(): string {
        return 'getConfig'
    }
    
    public init() {
        
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        })
        
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.getConfig()`,
        })
        
        this.setReturnType(`{
                database: string
                host: string
                port: string
                dbType: 'mysql'
                tableName: string
            }`)
    }
    
}