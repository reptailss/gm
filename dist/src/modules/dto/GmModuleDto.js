"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleDto = void 0;
const GmAbstractModuleType_1 = require("../abstractModule/GmAbstractModuleType");
const GmModuleCreateDto_1 = require("./GmModuleCreateDto");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmModuleDtoHelper_1 = require("./helper/GmModuleDtoHelper");
class GmModuleDto extends GmAbstractModuleType_1.GmAbstractModuleType {
    constructor(config) {
        super(config);
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
    }
    getDirName() {
        return this.gmModuleCreateDto.getDirName();
    }
    getFileName() {
        return this.gmModuleCreateDto.getFileName();
    }
    init() {
        this.addModule(this.gmModuleCreateDto, {
            hasAddImport: false,
        });
        this.setFileWriteMode('appendBefore');
        this.setBody(`
        ${this.gmModuleCreateDto.getPropertyName()} & {
            ${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}:${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type},
            date_add:Date,
            date_update:Date,
        }`);
    }
}
exports.GmModuleDto = GmModuleDto;
//# sourceMappingURL=GmModuleDto.js.map