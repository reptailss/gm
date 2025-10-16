import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {GmModuleServiceClass} from '@modules/services/interfaces/gmModuleServiceClassCurd'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'
import {GmModuleRepositoryNoSqlByStaticDb} from '@modules/repository/GmModuleRepositoryNoSqlByStaticDb'


const PROP_NAMES = {
    repository: 'repository',
} as const


export class GmModuleServiceClassByNoSqlStaticDb extends GmModuleAbstractServiceClass implements GmModuleServiceClass {
    
    private readonly repository: GmModuleRepositoryNoSqlByStaticDb
    
    
    constructor(
        config: GmCrudConfig,
        className: string,
    ) {
        super(config, className)
        
        this.repository = new GmModuleRepositoryNoSqlByStaticDb(config, `this.${PROP_NAMES.repository}`)
    }
    
    public getModuleRepository(): IGmModuleRepository {
        return this.repository
    }
    
    public init(): void {
        this.addModule(this.repository)
        this.addConstructorProp({
            varName: PROP_NAMES.repository,
            type: this.repository.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        })
        this.addDecorator(new GmInjectableDec())
    }
    
}