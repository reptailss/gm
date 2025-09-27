"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlStaticDb = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositorySqlByStaticDb_1 = require("../../../repository/GmModuleRepositorySqlByStaticDb");
const GmInjectableDec_1 = require("../../../../decorators/controllerDecorators/GmInjectableDec");
const PROP_NAMES = {
    repository: 'repository',
};
class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.repository = new GmModuleRepositorySqlByStaticDb_1.GmModuleRepositorySqlByStaticDb(config, `this.${PROP_NAMES.repository}`);
    }
    getModuleRepository() {
        return this.repository;
    }
    init() {
        this.addModule(this.repository);
        this.addConstructorProp({
            varName: PROP_NAMES.repository,
            type: this.repository.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        });
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleServiceClassBySqlStaticDb = GmModuleServiceClassBySqlStaticDb;
//# sourceMappingURL=GmModuleServiceClassBySqlStaticDb.js.map