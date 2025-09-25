import {GmModuleConstants} from '@modules/constants/GmModuleConstants'
import {GmAbstractModuleConstant} from '@modules/abstractModule/GmAbstractModuleConstant'
import {IGmModuleConstant} from '@modules/interfaces/gmModule'
import {GmModuleEntityType} from '@modules/repository/GmModuleEntityType'
import {GmModuleEntity} from '@modules/columns/GmModuleEntity'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntityInstance} from '@modules/repository/GmModuleEntityInstance'




export abstract class GmAbstractModuleConstantRepositorySql extends GmAbstractModuleConstant implements IGmModuleConstant {
    
    private readonly entityType: GmModuleEntityType
    private readonly gmModuleEntityInstance: GmModuleEntityInstance
    
    constructor(config: GmCrudConfig) {
        super(config)
        this.entityType = new GmModuleEntityType(config)
        this.gmModuleEntityInstance = new GmModuleEntityInstance(config)
    }
    
    
    public abstract getPropertyName(): string
    
    public getDirName(): string {
        return 'repository'
    }
    
    public getFileName(): string {
        return 'index.ts'
    }
    
    public init() {
        this.setFileWriteMode('appendAfter')
        this.addChildModule(this.gmModuleEntityInstance)
        this.addModule(this.entityType, {
            hasAddImport: false,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderSqlRepository',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'ISqlRepository',
            isLibImport: true,
        })
    }
    
    
    public getEntityPropertyName(): string {
        return this.gmModuleEntityInstance.getPropertyName()
    }
    
    public getRepositoryTypePropertyName(): string {
        return this.entityType.getPropertyName()
    }
    
}
