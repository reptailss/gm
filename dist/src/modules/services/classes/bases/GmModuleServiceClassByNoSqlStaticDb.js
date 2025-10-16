"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassByNoSqlStaticDb = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmInjectableDec_1 = require("../../../../decorators/controllerDecorators/GmInjectableDec");
const GmModuleRepositoryNoSqlByStaticDb_1 = require("../../../repository/GmModuleRepositoryNoSqlByStaticDb");
const PROP_NAMES = {
    repository: 'repository',
};
class GmModuleServiceClassByNoSqlStaticDb extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.repository = new GmModuleRepositoryNoSqlByStaticDb_1.GmModuleRepositoryNoSqlByStaticDb(config, `this.${PROP_NAMES.repository}`);
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
exports.GmModuleServiceClassByNoSqlStaticDb = GmModuleServiceClassByNoSqlStaticDb;
//# sourceMappingURL=GmModuleServiceClassByNoSqlStaticDb.js.map