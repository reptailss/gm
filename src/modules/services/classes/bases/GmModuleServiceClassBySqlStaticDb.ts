import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {GmModuleServiceClass} from '@modules/services/interfaces/gmModuleServiceClassCurd'
import {GmModuleRepositorySqlByStaticDb} from '@modules/repository/GmModuleRepositorySqlByStaticDb'
import {GmModuleEntityType} from '@modules/repository/GmModuleEntityType'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'


const PROP_NAMES = {
    repository: 'repository',
} as const


export class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass implements GmModuleServiceClass {

    private readonly repository: GmModuleRepositorySqlByStaticDb
    private readonly entityType: GmModuleEntityType


    constructor(
        config: GmCrudConfig,
        className: string,
    ) {
        super(config, className)

        this.repository = new GmModuleRepositorySqlByStaticDb(config, `this.${PROP_NAMES.repository}`)
        this.entityType = new GmModuleEntityType(config)
    }

    public getModuleRepository(): IGmModuleRepository {
        return this.repository
    }

    public init(): void {
        this.addModule(this.repository)
        this.addModule(this.entityType)
        this.addConstructorProp({
            varName: PROP_NAMES.repository,
            type: this.entityType.getPropertyName(),
            defaultValue: this.repository.getPropertyName(),
            privateReadOnly: true,
        })
    }

}