"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlStaticDb = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositorySqlByStaticDb_1 = require("../../../repository/GmModuleRepositorySqlByStaticDb");
const GmModuleEntityType_1 = require("../../../repository/GmModuleEntityType");
const PROP_NAMES = {
    repository: 'repository',
};
class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.repository = new GmModuleRepositorySqlByStaticDb_1.GmModuleRepositorySqlByStaticDb(config, `this.${PROP_NAMES.repository}`);
        this.entityType = new GmModuleEntityType_1.GmModuleEntityType(config);
    }
    getModuleRepository() {
        return this.repository;
    }
    init() {
        this.addModule(this.repository);
        this.addModule(this.entityType);
        this.addConstructorProp({
            varName: PROP_NAMES.repository,
            type: this.entityType.getPropertyName(),
            defaultValue: this.repository.getPropertyName(),
            privateReadOnly: true,
        });
    }
}
exports.GmModuleServiceClassBySqlStaticDb = GmModuleServiceClassBySqlStaticDb;
//# sourceMappingURL=GmModuleServiceClassBySqlStaticDb.js.map