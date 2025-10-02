import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {GmCrudConfig} from 'os-core-ts'
import {GmAbstractModuleClass} from '@modules/abstractModule/GmAbstractModuleClass'
import {GmModuleEntity} from '@modules/entity/GmModuleEntity'
import {GmModuleNoSqlRepositoryMethodCreate} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodCreate'
import {GmModuleNoSqlRepositoryMethodUpdate} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodUpdate'
import {GmModuleNoSqlRepositoryMethodDestroy} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodDestroy'
import {GmModuleNoSqlRepositoryMethodFindOne} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodFindOne'
import {
    GmModuleNoSqlRepositoryMethodFindByPk
} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodFindByPk'
import {GmModuleNoSqlRepositoryMethodFindAll} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodFindAll'
import {
    GmModuleNoSqlRepositoryMethodPagination
} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodPagination'
import {
    GmModuleNoSqlRepositoryMethodGetConfig
} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodGetConfig'
import {GmModuleNoSqlRepositoryMethodCount} from '@modules/repository/noSqlMethods/GmModuleNoSqlRepositoryMethodCount'



export abstract class GmAbstractModuleClassRepositoryNoSql extends GmAbstractModuleClass implements IGmModuleClass {
    
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
        
        this.addMethod(new GmModuleNoSqlRepositoryMethodCreate(
            this.getConfig(),
            this.repositoryVarName,
        ))
        this.addMethod(new GmModuleNoSqlRepositoryMethodUpdate(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleNoSqlRepositoryMethodDestroy(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleNoSqlRepositoryMethodFindOne(
            this.getConfig(),
            this.repositoryVarName,
        ))
        this.addMethod(new GmModuleNoSqlRepositoryMethodFindByPk(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleNoSqlRepositoryMethodFindAll(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleNoSqlRepositoryMethodPagination(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleNoSqlRepositoryMethodCount(
            this.getConfig(),
            this.repositoryVarName,
        ))
        
        this.addMethod(new GmModuleNoSqlRepositoryMethodGetConfig(
            this.getConfig(),
            this.repositoryVarName,
        ))
    }
    
}
