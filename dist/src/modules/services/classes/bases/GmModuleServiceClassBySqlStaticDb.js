"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassBySqlStaticDb = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleModelSqlByStaticDb_1 = require("../../../model/GmModuleModelSqlByStaticDb");
const GmModuleModelType_1 = require("../../../model/GmModuleModelType");
const PROP_NAMES = {
    model: 'model',
};
class GmModuleServiceClassBySqlStaticDb extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.model = new GmModuleModelSqlByStaticDb_1.GmModuleModelSqlByStaticDb(config, `this.${PROP_NAMES.model}`);
        this.modelType = new GmModuleModelType_1.GmModuleModelType(config);
    }
    getModuleModel() {
        return this.model;
    }
    init() {
        this.addModule(this.model);
        this.addModule(this.modelType);
        this.addConstructorProp({
            varName: PROP_NAMES.model,
            type: this.modelType.getPropertyName(),
            defaultValue: this.model.getPropertyName(),
            privateReadOnly: true,
        });
    }
}
exports.GmModuleServiceClassBySqlStaticDb = GmModuleServiceClassBySqlStaticDb;
//# sourceMappingURL=GmModuleServiceClassBySqlStaticDb.js.map