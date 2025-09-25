"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleFnRepositoryNoSql = void 0;
const GmAbstractModuleFn_1 = require("../../abstractModule/GmAbstractModuleFn");
const GmModuleEntityType_1 = require("../GmModuleEntityType");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleEntityInstance_1 = require("../GmModuleEntityInstance");
class GmAbstractModuleFnRepositoryNoSql extends GmAbstractModuleFn_1.GmAbstractModuleFn {
    constructor(config) {
        super(config);
        this.gmModuleEntityInstance = new GmModuleEntityInstance_1.GmModuleEntityInstance(config);
        this.entityType = new GmModuleEntityType_1.GmModuleEntityType(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
    }
    getDirName() {
        return 'repository';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addModule(this.entityType, {
            hasAddImport: false,
        });
        this.addModule(this.gmModuleDto);
        this.addChildModule(this.gmModuleEntityInstance);
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderNoSqlRepository',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'INoSqlRepository',
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
exports.GmAbstractModuleFnRepositoryNoSql = GmAbstractModuleFnRepositoryNoSql;
//# sourceMappingURL=GmAbstractModuleFnRepositoryNoSql.js.map