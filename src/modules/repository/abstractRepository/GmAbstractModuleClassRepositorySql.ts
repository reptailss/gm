import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {GmCrudConfig} from 'os-core-ts'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {GmModuleSqlRepositoryMethodFindAll} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodFindAll'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleSqlRepositoryMethodFindOne} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodFindOne'
import {GmModuleSqlRepositoryMethodFindByPk} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodFindByPk'
import {GmModuleSqlRepositoryMethodCreate} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodCreate'
import {GmModuleSqlRepositoryMethodUpdate} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodUpdate'
import {GmModuleSqlRepositoryMethodGetConfig} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodGetConfig'
import {GmModuleSqlRepositoryMethodPagination} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodPagination'
import {GmModuleSqlRepositoryMethodDestroy} from '@modules/repository/sqlMethods/GmModuleSqlRepositoryMethodDestroy'


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
        
        this.addMethod(new GmModuleSqlRepositoryMethodCreate(
            this.getConfig(),
            this.repositoryVarName,
        ))
        this.addMethod(new GmModuleSqlRepositoryMethodUpdate(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleSqlRepositoryMethodDestroy(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleSqlRepositoryMethodFindOne(
            this.getConfig(),
            this.repositoryVarName,
        ))
        this.addMethod(new GmModuleSqlRepositoryMethodFindByPk(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleSqlRepositoryMethodFindAll(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleSqlRepositoryMethodPagination(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleSqlRepositoryMethodGetConfig(
            this.getConfig(),
            this.repositoryVarName,
        ))
    }
    
}
