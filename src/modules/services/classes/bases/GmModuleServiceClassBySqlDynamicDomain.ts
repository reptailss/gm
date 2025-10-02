import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleRepositorySqlByDynamicDomain} from '@modules/repository/GmModuleRepositorySqlByDynamicDomain'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'


const PROP_NAMES = {
    repository: 'repository',
    loaderRepository: 'loaderRepository',
    domain: 'domain',
}

export class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass implements IGmModuleClass {
    
    
    private readonly gmModuleRepositorySqlByDynamicDomain: GmModuleRepositorySqlByDynamicDomain
    
    constructor(
        config: GmCrudConfig,
        serviceName: string,
    ) {
        super(config, serviceName)
        this.gmModuleRepositorySqlByDynamicDomain = new GmModuleRepositorySqlByDynamicDomain(
            config,
            {
                repositoryVarName: PROP_NAMES.repository,
                loaderRepositoryVarName: `this.${PROP_NAMES.loaderRepository}`,
                domainVarName: PROP_NAMES.domain,
            },
        )
        
    }
    
    public getModuleRepository(): IGmModuleRepository {
        return this.gmModuleRepositorySqlByDynamicDomain
    }
    
    public addAndInitMethod(method: IGmModuleClassMethod, domainVarName: string): this {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.gmModuleRepositorySqlByDynamicDomain.getInitRepository()}`,
        })
        method.addProp({
            varName: PROP_NAMES.domain,
            callVarName: domainVarName,
            decorator: null,
            type: 'string',
        })
        method.setPropsType('object')
        this.addMethod(method)
        return this
    }
    
    public init(): void {
        
        this.addModule(this.gmModuleRepositorySqlByDynamicDomain)
        
        this.addConstructorProp({
            varName: PROP_NAMES.loaderRepository,
            type: this.gmModuleRepositorySqlByDynamicDomain.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        })
        this.addDecorator(new GmInjectableDec())
        
    }
    
}