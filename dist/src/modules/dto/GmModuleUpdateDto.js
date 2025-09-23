"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleUpdateDto = void 0;
const GmAbstractModuleType_1 = require("../abstractModule/GmAbstractModuleType");
const GmModuleCreateDto_1 = require("./GmModuleCreateDto");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmModuleUpdateDto extends GmAbstractModuleType_1.GmAbstractModuleType {
    constructor(config) {
        super(config);
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    getPropertyName() {
        return `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
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
        this.setBody(`Partial<${this.gmModuleCreateDto.getPropertyName()}>`);
    }
}
exports.GmModuleUpdateDto = GmModuleUpdateDto;
//# sourceMappingURL=GmModuleUpdateDto.js.map