import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleRepositorySqlByDynamicDomain} from '@modules/repository/GmModuleRepositorySqlByDynamicDomain'
import {GmModuleEntityType} from '@modules/repository/GmModuleEntityType'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'


const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'getRepositoryCb',
    domain: 'domain',
}

export class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass implements IGmModuleClass {


    private readonly repository: GmModuleRepositorySqlByDynamicDomain
    private readonly entityType: GmModuleEntityType

    constructor(
        config: GmCrudConfig,
        serviceName: string,
    ) {
        super(config, serviceName)
        this.repository = new GmModuleRepositorySqlByDynamicDomain(
            config,
            {
                repositoryVarName: PROP_NAMES.repository,
                getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
                domainVarName: PROP_NAMES.domain,
            },
        )
        this.entityType = new GmModuleEntityType(config)

    }

    public getModuleRepository(): IGmModuleRepository {
        return this.repository
    }

    public addAndInitMethod(method: IGmModuleClassMethod, domainVarName: string): this {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.repository.getInitRepository()}`,
        })
        method.addProp({
            varName: PROP_NAMES.domain,
            callVarName: domainVarName,
            decorator: null,
            type: 'string',
        })
        method.setPropsType('object')
        this.addMethod(method)
        return  this
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