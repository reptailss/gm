"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAccessStructureMethodProcessor = void 0;
const GmServiceStructureAccess_1 = require("../../services/structureAccess/GmServiceStructureAccess");
const GmModuleRoutePaths_1 = require("../routePaths/GmModuleRoutePaths");
const GmImportStructureServiceEndpointDec_1 = require("../../decorators/controllerDecorators/GmImportStructureServiceEndpointDec");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmAccessStructureMethodProcessor {
    constructor(config, varNames) {
        this.config = config;
        this.varNames = varNames;
        this.gmServiceStructureAccess = new GmServiceStructureAccess_1.GmServiceStructureAccess();
        this.gmModuleRoutePaths = new GmModuleRoutePaths_1.GmModuleRoutePaths(config);
    }
    add(method) {
        method.addModule(this.gmModuleRoutePaths);
        method.prependDecorator(new GmImportStructureServiceEndpointDec_1.GmImportStructureServiceEndpointDec(`Add new ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`));
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.add.legalEntityId,
                openUserIdVarName: this.varNames.add.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('add'),
            })}`,
        });
    }
    update(method) {
        method.prependDecorator(new GmImportStructureServiceEndpointDec_1.GmImportStructureServiceEndpointDec(`Update ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`));
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.update.legalEntityId,
                openUserIdVarName: this.varNames.update.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('update'),
            })}`,
        });
    }
    delete(method) {
        method.prependDecorator(new GmImportStructureServiceEndpointDec_1.GmImportStructureServiceEndpointDec(`Delete ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`));
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.delete.legalEntityId,
                openUserIdVarName: this.varNames.delete.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('delete'),
            })}`,
        });
    }
    get(method) {
        method.prependDecorator(new GmImportStructureServiceEndpointDec_1.GmImportStructureServiceEndpointDec(`Get ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.config.dtoName.singular)}`));
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.get.legalEntityId,
                openUserIdVarName: this.varNames.get.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('get'),
            })}`,
        });
    }
    list(method) {
        method.prependDecorator(new GmImportStructureServiceEndpointDec_1.GmImportStructureServiceEndpointDec(`Get list ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.config.dtoName.plural)}`));
        method.addService(this.gmServiceStructureAccess);
        method.prependBodyElement({
            name: 'check Access',
            value: `await ${this.gmServiceStructureAccess.checkAccess({
                legalEntityIdVarName: this.varNames.list.legalEntityId,
                openUserIdVarName: this.varNames.list.openUserId,
                endpointVarName: this.gmModuleRoutePaths.getRoutePathPropertyName('list'),
            })}`,
        });
    }
}
exports.GmAccessStructureMethodProcessor = GmAccessStructureMethodProcessor;
//# sourceMappingURL=GmAccessStructureMethodProcessor.js.map