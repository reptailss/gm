import {GmCrudConfig} from 'os-core-ts'
import {GmAbstractModuleFn} from '@modules/abstractModule/GmAbstractModuleFn'
import {IGmModuleFn} from '@modules/interfaces/gmModule'
import {GmModuleEntityType} from '@modules/repository/GmModuleEntityType'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleEntityInstance} from '@modules/repository/GmModuleEntityInstance'


export abstract class GmAbstractModuleFnRepositoryNoSql extends GmAbstractModuleFn implements IGmModuleFn {
    
    private readonly entityType: GmModuleEntityType
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleEntityInstance: GmModuleEntityInstance
    
    constructor(config: GmCrudConfig) {
        super(config)
        this.gmModuleEntityInstance = new GmModuleEntityInstance(config)
        this.entityType = new GmModuleEntityType(config)
        this.gmModuleDto = new GmModuleDto(config)
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
        
        this.addModule(this.entityType, {
            hasAddImport: false,
        })
        this.addModule(this.gmModuleDto)
        this.addChildModule(this.gmModuleEntityInstance)
        
        
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderNoSqlRepository',
            isLibImport: true,
        })
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'INoSqlRepository',
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
