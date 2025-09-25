import {GmAbstractModuleFn} from '@modules/abstractModule/GmAbstractModuleFn'
import {IGmModuleFn} from '@modules/interfaces/gmModule'
import {GmModuleEntityType} from '@modules/repository/GmModuleEntityType'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntityInstance} from '@modules/repository/GmModuleEntityInstance'


export abstract class GmAbstractModuleFnRepositorySql extends GmAbstractModuleFn implements IGmModuleFn {
    
    private readonly entityType: GmModuleEntityType
    private readonly gmModuleEntityInstance: GmModuleEntityInstance
    
    constructor(config: GmCrudConfig) {
        super(config)
        this.gmModuleEntityInstance = new GmModuleEntityInstance(config)
        this.entityType = new GmModuleEntityType(config)
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
