import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {GmCrudConfig} from 'os-core-ts'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {GmModuleRepositoryMethodFindAll} from '@modules/repository/methods/GmModuleRepositoryMethodFindAll'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleRepositoryMethodFindOne} from '@modules/repository/methods/GmModuleRepositoryMethodFindOne'
import {GmModuleRepositoryMethodFindByPk} from '@modules/repository/methods/GmModuleRepositoryMethodFindByPk'
import {GmModuleRepositoryMethodCreate} from '@modules/repository/methods/GmModuleRepositoryMethodCreate'
import {GmModuleRepositoryMethodUpdate} from '@modules/repository/methods/GmModuleRepositoryMethodUpdate'
import {GmModuleRepositoryMethodGetConfig} from '@modules/repository/methods/GmModuleRepositoryMethodGetConfig'
import {GmModuleRepositoryMethodPagination} from '@modules/repository/methods/GmModuleRepositoryMethodPagination'
import {GmModuleRepositoryMethodDestroy} from '@modules/repository/methods/GmModuleRepositoryMethodDestroy'


export abstract class GmAbstractModuleClassRepositorySql extends GmAbstractModuleClass implements IGmModuleClass {
    
    private readonly gmModuleEntity: GmModuleEntity
    
    constructor(
        config: GmCrudConfig,
        private readonly repositoryVarName: string,
    ) {
        super(config)
        this.gmModuleEntity = new GmModuleEntity(config)
    }
    
    public abstract getPropertyName(): string
    
    public getDirName(): string {
        return 'repository'
    }
    
    public getFileName(): string {
        return 'index.ts'
    }
    
    public getEntityInstance(): string {
        return `new ${this.gmModuleEntity.getPropertyName()}()`
    }
    
    public getEntityName(): string {
        return this.gmModuleEntity.getPropertyName()
    }
    
    
    public init() {
        this.addModule(this.gmModuleEntity)
        
        this.addMethod(new GmModuleRepositoryMethodCreate(
            this.getConfig(),
            this.repositoryVarName,
        ))
        this.addMethod(new GmModuleRepositoryMethodUpdate(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleRepositoryMethodDestroy(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleRepositoryMethodFindOne(
            this.getConfig(),
            this.repositoryVarName,
        ))
        this.addMethod(new GmModuleRepositoryMethodFindByPk(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleRepositoryMethodFindAll(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleRepositoryMethodPagination(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleRepositoryMethodGetConfig(
            this.getConfig(),
            this.repositoryVarName,
        ))
    }
    
}
