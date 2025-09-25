import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleRepositorySqlByDynamicLeId} from '@modules/repository/GmModuleRepositorySqlByDynamicLeId'
import {GmModuleEntityType} from '@modules/repository/GmModuleEntityType'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'


const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'getRepositoryCb',
    legalEntityId: 'legalEntityId',
}

export class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass implements IGmModuleClass {

    private readonly repository: GmModuleRepositorySqlByDynamicLeId
    private readonly entityType: GmModuleEntityType

    constructor(
        config: GmCrudConfig,
        serviceName: string,
    ) {
        super(config, serviceName)
        this.repository = new GmModuleRepositorySqlByDynamicLeId(
            config,
            {
                repositoryVarName: PROP_NAMES.repository,
                getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
                leIdVarName: PROP_NAMES.legalEntityId,
            },
        )
        this.entityType = new GmModuleEntityType(config)

    }

    public getModuleRepository(): IGmModuleRepository {
        return this.repository
    }

    public addAndInitMethod(method: IGmModuleClassMethod, leIdVarName: string): this {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.repository.getInitRepository()}`,
        })
        method.addProp({
            varName: PROP_NAMES.legalEntityId,
            decorator: null,
            type: 'number',
            callVarName: leIdVarName,

        })
        method.setPropsType('object')
        this.addMethod(method)
        return this
    }

    public init(): void {

        this.addModule(this.repository)
        this.addModule(this.entityType)

        this.addConstructorProp({
            varName: PROP_NAMES.getRepositoryCb,
            type: this.entityType.getPropertyName(),
            defaultValue: this.repository.getPropertyName(),
            privateReadOnly: true,
        })
    }

}