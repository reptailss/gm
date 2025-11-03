"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleFilterDto = void 0;
const GmAbstractModuleType_1 = require("../abstractModule/GmAbstractModuleType");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmModuleDtoHelper_1 = require("./helper/GmModuleDtoHelper");
class GmModuleFilterDto extends GmAbstractModuleType_1.GmAbstractModuleType {
    constructor(config) {
        super(config);
        this.generateDtoByColumns = () => {
            const res = [];
            for (const key in this.getConfig().repository.columns) {
                const column = this.getConfig().repository.columns[key];
                if (column.type === 'OBJECT' ||
                    column.type === 'JSON') {
                    continue;
                }
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
        return `Filter${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
    }
    getDirName() {
        return 'dto';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        var _a;
        this.setFileWriteMode('appendBefore');
        this.setBody(`{
            ${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}:${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type},
            date_add:Date,
            date_update:Date,
           ${(_a = this.generateDtoByColumns().map((field) => {
            return `${field.key}:${field.type}`;
        })) === null || _a === void 0 ? void 0 : _a.join('\n')},
        }`);
    }
}
exports.GmModuleFilterDto = GmModuleFilterDto;
//# sourceMappingURL=GmModuleFilterDto.js.map