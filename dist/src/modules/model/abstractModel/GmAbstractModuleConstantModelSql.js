"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleConstantModelSql = void 0;
const GmAbstractModuleConstant_1 = require("../../abstractModule/GmAbstractModuleConstant");
const GmModuleEntityType_1 = require("../GmModuleEntityType");
const GmModuleEntityInstance_1 = require("../GmModuleEntityInstance");
class GmAbstractModuleConstantModelSql extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    constructor(config) {
        super(config);
        this.entityType = new GmModuleEntityType_1.GmModuleEntityType(config);
        this.gmModuleEntityInstance = new GmModuleEntityInstance_1.GmModuleEntityInstance(config);
    }
    getDirName() {
        return 'repository';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addChildModule(this.gmModuleEntityInstance);
        this.addModule(this.entityType, {
            hasAddImport: false,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderSqlRepository',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'ISqlRepository',
            isLibImport: true,
        });
    }
    getEntityPropertyName() {
        return this.gmModuleEntityInstance.getPropertyName();
    }
    getModelTypePropertyName() {
        return this.entityType.getPropertyName();
    }
}
exports.GmAbstractModuleConstantModelSql = GmAbstractModuleConstantModelSql;
//# sourceMappingURL=GmAbstractModuleConstantModelSql.js.map