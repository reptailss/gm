"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleCreateDto = void 0;
const GmAbstractModuleType_1 = require("../abstractModule/GmAbstractModuleType");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmModuleDtoHelper_1 = require("./helper/GmModuleDtoHelper");
class GmModuleCreateDto extends GmAbstractModuleType_1.GmAbstractModuleType {
    constructor() {
        super(...arguments);
        this.generateDtoByColumns = () => {
            const res = [];
            for (const key in this.getConfig().repository.columns) {
                const column = this.getConfig().repository.columns[key];
                res.push({
                    key,
                    type: GmModuleDtoHelper_1.GmModuleDtoHelper.getTypeByColumn(column.type),
                    columnType: column.type,
                });
            }
            return res;
        };
    }
    getPropertyName() {
        return `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
    }
    getDirName() {
        return 'dto';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        var _a;
        this.addRenderData('fields', this.generateDtoByColumns());
        this.setBody(`{
            ${(_a = this.generateDtoByColumns().map((field) => {
            return `${field.key}:${field.type}`;
        })) === null || _a === void 0 ? void 0 : _a.join('\n')}
        }`);
    }
}
exports.GmModuleCreateDto = GmModuleCreateDto;
//# sourceMappingURL=GmModuleCreateDto.js.map