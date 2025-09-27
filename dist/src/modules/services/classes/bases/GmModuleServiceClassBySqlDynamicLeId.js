"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlDynamicLeId = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositorySqlByDynamicLeId_1 = require("../../../repository/GmModuleRepositorySqlByDynamicLeId");
const GmInjectableDec_1 = require("../../../../decorators/controllerDecorators/GmInjectableDec");
const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'loaderRepository',
    legalEntityId: 'legalEntityId',
};
class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, serviceName) {
        super(config, serviceName);
        this.gmModuleRepositorySqlByDynamicLeId = new GmModuleRepositorySqlByDynamicLeId_1.GmModuleRepositorySqlByDynamicLeId(config, {
            repositoryVarName: PROP_NAMES.repository,
            getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
            leIdVarName: PROP_NAMES.legalEntityId,
        });
    }
    getModuleRepository() {
        return this.gmModuleRepositorySqlByDynamicLeId;
    }
    addAndInitMethod(method, leIdVarName) {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.gmModuleRepositorySqlByDynamicLeId.getInitRepository()}`,
        });
        method.addProp({
            varName: PROP_NAMES.legalEntityId,
            decorator: null,
            type: 'number',
            callVarName: leIdVarName,
        });
        method.setPropsType('object');
        this.addMethod(method);
        return this;
    }
    init() {
        this.addModule(this.gmModuleRepositorySqlByDynamicLeId);
        this.addConstructorProp({
            varName: PROP_NAMES.getRepositoryCb,
            type: this.gmModuleRepositorySqlByDynamicLeId.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        });
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleServiceClassBySqlDynamicLeId = GmModuleServiceClassBySqlDynamicLeId;
//# sourceMappingURL=GmModuleServiceClassBySqlDynamicLeId.js.map