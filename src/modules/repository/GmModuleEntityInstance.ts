import {IGmModuleConstant} from '@modules/interfaces/gmModule'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleEntity} from '@modules/columns/GmModuleEntity'
import {GmAbstractModuleConstant} from '@modules/abstractModule/GmAbstractModuleConstant'


export class GmModuleEntityInstance extends GmAbstractModuleConstant implements IGmModuleConstant {
    private readonly gmModuleEntity: GmModuleEntity
    
    constructor(config: GmCrudConfig) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
    }
    
    public getPropertyName(): string {
        return 'entity'
    }
    
    public getDirName(): string | null {
        return null
    }
    
    public getFileName(): string {
        return 'index.ts'
    }
    
    public getExport(): null {
        return null
    }
    
    
    public init(): void {
        this.addModule(this.gmModuleEntity)
        this.setFileWriteMode('appendAfter')
        this.setBody(`new ${this.gmModuleEntity.getPropertyName()}()`)
        
    }
    
}
