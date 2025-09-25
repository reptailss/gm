"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleEntityInstance = void 0;
const GmModuleEntity_1 = require("../columns/GmModuleEntity");
const GmAbstractModuleConstant_1 = require("../abstractModule/GmAbstractModuleConstant");
class GmModuleEntityInstance extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    constructor(config) {
        super(config);
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getPropertyName() {
        return 'entity';
    }
    getDirName() {
        return null;
    }
    getFileName() {
        return 'index.ts';
    }
    getExport() {
        return null;
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.setBody(`new ${this.gmModuleEntity.getPropertyName()}()`);
    }
}
exports.GmModuleEntityInstance = GmModuleEntityInstance;
//# sourceMappingURL=GmModuleEntityInstance.js.map