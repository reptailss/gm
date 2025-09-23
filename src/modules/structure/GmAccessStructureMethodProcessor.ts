import {GmServiceStructureAccess} from '@services/structureAccess/GmServiceStructureAccess'
import {GmModuleRoutePaths} from '@modules/routePaths/GmModuleRoutePaths'
import {GmConfig} from '@config/types'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmImportStructureServiceEndpointDec} from '@decorators/controllerDecorators/GmImportStructureServiceEndpointDec'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


type CallVarNames = {
    openUserId: string
    legalEntityId: string
}


export class GmAccessStructureMethodProcessor {
    
    private readonly gmServiceStructureAccess: GmServiceStructureAccess
    private readonly gmModuleRoutePaths: GmModuleRoutePaths
    
    constructor(
        private readonly config: GmConfig,
        private readonly varNames: {
            add: CallVarNames,
            update: CallVarNames,
            delete: CallVarNames,
            get: CallVarNames,
            list: CallVarNames,
        },
    ) {
        
        this.gmServiceStructureAccess = new GmServiceStructureAccess()
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)
        
    }
    
    
    public add(method: IGmModuleClassMethod) {
        method.addModule(this.gmModuleRoutePaths)
        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Add new ${StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`))
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.add.legalEntityId,
                openUserIdVarName: this.varNames.add.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('add'),
            })}`,
        })
        
    }
    
    public update(method: IGmModuleClassMethod) {
        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Update ${StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`))
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.update.legalEntityId,
                openUserIdVarName: this.varNames.update.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('update'),
            })}`,
        })
    }
    
    public delete(method: IGmModuleClassMethod) {
        
        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Delete ${StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`))
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.delete.legalEntityId,
                openUserIdVarName: this.varNames.delete.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('delete'),
            })}`,
        })
    }
    
    public get(method: IGmModuleClassMethod) {
        
        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Get ${StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`))
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.get.legalEntityId,
                openUserIdVarName: this.varNames.get.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('get'),
            })}`,
        })
    }
    
    public list(method: IGmModuleClassMethod) {
        
        method.prependDecorator(new GmImportStructureServiceEndpointDec(`Get list ${StringCaseHelper.toKebabCase(this.config.dtoName.plural)}`))
        method.addService(this.gmServiceStructureAccess)
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.list.legalEntityId,
                openUserIdVarName: this.varNames.list.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('list'),
            })}`,
        })
    }
}