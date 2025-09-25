"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlDynamicDomain = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositorySqlByDynamicDomain_1 = require("../../../repository/GmModuleRepositorySqlByDynamicDomain");
const GmModuleEntityType_1 = require("../../../repository/GmModuleEntityType");
const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'getRepositoryCb',
    domain: 'domain',
};
class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, serviceName) {
        super(config, serviceName);
        this.repository = new GmModuleRepositorySqlByDynamicDomain_1.GmModuleRepositorySqlByDynamicDomain(config, {
            repositoryVarName: PROP_NAMES.repository,
            getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
            domainVarName: PROP_NAMES.domain,
        });
        this.entityType = new GmModuleEntityType_1.GmModuleEntityType(config);
    }
    getModuleRepository() {
        return this.repository;
    }
    addAndInitMethod(method, domainVarName) {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.repository.getInitRepository()}`,
        });
        method.addProp({
            varName: PROP_NAMES.domain,
            callVarName: domainVarName,
            decorator: null,
            type: 'string',
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
exports.GmModuleServiceClassBySqlDynamicDomain = GmModuleServiceClassBySqlDynamicDomain;
//# sourceMappingURL=GmModuleServiceClassBySqlDynamicDomain.js.map