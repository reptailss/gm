"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleFnRepositorySql = void 0;
const GmAbstractModuleFn_1 = require("../../abstractModule/GmAbstractModuleFn");
const GmModuleEntityType_1 = require("../GmModuleEntityType");
const GmModuleEntityInstance_1 = require("../GmModuleEntityInstance");
class GmAbstractModuleFnRepositorySql extends GmAbstractModuleFn_1.GmAbstractModuleFn {
    constructor(config) {
        super(config);
        this.gmModuleEntityInstance = new GmModuleEntityInstance_1.GmModuleEntityInstance(config);
        this.entityType = new GmModuleEntityType_1.GmModuleEntityType(config);
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
    getRepositoryTypePropertyName() {
        return this.entityType.getPropertyName();
    }
}
exports.GmAbstractModuleFnRepositorySql = GmAbstractModuleFnRepositorySql;
//# sourceMappingURL=GmAbstractModuleFnRepositorySql.js.map