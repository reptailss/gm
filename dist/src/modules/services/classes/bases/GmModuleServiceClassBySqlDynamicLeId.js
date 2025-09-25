"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlDynamicLeId = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositorySqlByDynamicLeId_1 = require("../../../repository/GmModuleRepositorySqlByDynamicLeId");
const GmModuleEntityType_1 = require("../../../repository/GmModuleEntityType");
const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'getRepositoryCb',
    legalEntityId: 'legalEntityId',
};
class GmModuleServiceClassBySqlDynamicLeId extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, serviceName) {
        super(config, serviceName);
        this.repository = new GmModuleRepositorySqlByDynamicLeId_1.GmModuleRepositorySqlByDynamicLeId(config, {
            repositoryVarName: PROP_NAMES.repository,
            getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
            leIdVarName: PROP_NAMES.legalEntityId,
        });
        this.entityType = new GmModuleEntityType_1.GmModuleEntityType(config);
    }
    getModuleRepository() {
        return this.repository;
    }
    addAndInitMethod(method, leIdVarName) {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.repository.getInitRepository()}`,
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
        this.addModule(this.repository);
        this.addModule(this.entityType);
        this.addConstructorProp({
            varName: PROP_NAMES.getRepositoryCb,
            type: this.entityType.getPropertyName(),
            defaultValue: this.repository.getPropertyName(),
            privateReadOnly: true,
        });
    }
}
exports.GmModuleServiceClassBySqlDynamicLeId = GmModuleServiceClassBySqlDynamicLeId;
//# sourceMappingURL=GmModuleServiceClassBySqlDynamicLeId.js.map