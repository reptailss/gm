"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlDynamicLeId = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositorySqlByDynamicLeId_1 = require("../../../repository/GmModuleRepositorySqlByDynamicLeId");
const GmInjectableDec_1 = require("../../../../decorators/controllerDecorators/GmInjectableDec");
const PROP_NAMES = {
    repository: 'repository',
    loaderRepository: 'loaderRepository',
    legalEntityId: 'legalEntityId',
};
class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, serviceName) {
        super(config, serviceName);
        this.gmModuleRepositorySqlByDynamicLeId = new GmModuleRepositorySqlByDynamicLeId_1.GmModuleRepositorySqlByDynamicLeId(config, {
            repositoryVarName: PROP_NAMES.repository,
            loaderRepositoryVarName: `this.${PROP_NAMES.loaderRepository}`,
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
            varName: PROP_NAMES.loaderRepository,
            type: this.gmModuleRepositorySqlByDynamicLeId.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        });
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleServiceClassBySqlDynamicLeId = GmModuleServiceClassBySqlDynamicLeId;
//# sourceMappingURL=GmModuleServiceClassBySqlDynamicLeId.js.map