"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlDynamicDomain = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositorySqlByDynamicDomain_1 = require("../../../repository/GmModuleRepositorySqlByDynamicDomain");
const GmInjectableDec_1 = require("../../../../decorators/controllerDecorators/GmInjectableDec");
const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'loaderRepository',
    domain: 'domain',
};
class GmModuleServiceClassBySqlDynamicDomain extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, serviceName) {
        super(config, serviceName);
        this.gmModuleRepositorySqlByDynamicDomain = new GmModuleRepositorySqlByDynamicDomain_1.GmModuleRepositorySqlByDynamicDomain(config, {
            repositoryVarName: PROP_NAMES.repository,
            getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
            domainVarName: PROP_NAMES.domain,
        });
    }
    getModuleRepository() {
        return this.gmModuleRepositorySqlByDynamicDomain;
    }
    addAndInitMethod(method, domainVarName) {
        method.prependBodyElement({
            name: 'init repository',
            value: `const ${PROP_NAMES.repository} = await ${this.gmModuleRepositorySqlByDynamicDomain.getInitRepository()}`,
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
        this.addModule(this.gmModuleRepositorySqlByDynamicDomain);
        this.addConstructorProp({
            varName: PROP_NAMES.getRepositoryCb,
            type: this.gmModuleRepositorySqlByDynamicDomain.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        });
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleServiceClassBySqlDynamicDomain = GmModuleServiceClassBySqlDynamicDomain;
//# sourceMappingURL=GmModuleServiceClassBySqlDynamicDomain.js.map