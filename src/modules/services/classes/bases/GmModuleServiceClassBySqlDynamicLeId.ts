import {GmModuleAbstractServiceClass} from '@modules/services/classes/abstract/GmModuleAbstractServiceClass'
import {IGmModuleClass, IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleRepositorySqlByDynamicLeId} from '@modules/repository/GmModuleRepositorySqlByDynamicLeId'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmInjectableDec} from '@decorators/controllerDecorators/GmInjectableDec'


const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'loaderRepository',
    legalEntityId: 'legalEntityId',
}

export class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass implements IGmModuleClass {
    
    private readonly gmModuleRepositorySqlByDynamicLeId: GmModuleRepositorySqlByDynamicLeId
    
    constructor(
        config: GmCrudConfig,
        serviceName: string,
    ) {
        super(config, serviceName)
        this.gmModuleRepositorySqlByDynamicLeId = new GmModuleRepositorySqlByDynamicLeId(
            config,
            {
                repositoryVarName: PROP_NAMES.repository,
                getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
                leIdVarName: PROP_NAMES.legalEntityId,
            },
        )
        
    }
    
    public getModuleRepository(): IGmModuleRepository {
        return this.gmModuleRepositorySqlByDynamicLeId
    }
    
    public addAndInitMethod(method: IGmModuleClassMethod, leIdVarName: string): this {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.gmModuleRepositorySqlByDynamicLeId.getInitRepository()}`,
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
        
        this.addModule(this.gmModuleRepositorySqlByDynamicLeId)
        
        this.addConstructorProp({
            varName: PROP_NAMES.getRepositoryCb,
            type: this.gmModuleRepositorySqlByDynamicLeId.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        })
        
        this.addDecorator(new GmInjectableDec())
    }
    
}