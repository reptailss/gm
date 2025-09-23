"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelColumns = void 0;
const GmAbstractModuleConstant_1 = require("../abstractModule/GmAbstractModuleConstant");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmModuleDto_1 = require("../dto/GmModuleDto");
class GmModuleModelColumns extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_COLUMNS`;
    }
    getDirName() {
        return null;
    }
    getFileName() {
        return 'columns.ts';
    }
    init() {
        this.addImport({
            path: 'os-core-ts',
            propertyName: this.getColumnLibType(),
            isLibImport: true,
        });
        const gmModuleDto = new GmModuleDto_1.GmModuleDto(this.getConfig());
        this.addModule(gmModuleDto);
        this.setType(`${this.getColumnLibType()}<${gmModuleDto.getPropertyName()}>`);
        this.setBody(`{
        ${this.gmGetColumnModelFromConfig().map(({ key, column }) => {
            return `
                ${key}: ${JSON.stringify(column, null, 2)}
            `;
        }).join(',\n')}
        }`);
    }
    getColumnLibType() {
        return this.getConfig().model.dbType === 'noSql' ? 'ModelNoSqlColumns' : 'ModelSqlColumns';
    }
    gmGetColumnModelFromConfig() {
        const res = [];
        for (const key in this.getConfig().model.columns) {
            const column = this.getConfig().model.columns[key];
            res.push({
                key,
                column,
            });
        }
        return res;
    }
}
exports.GmModuleModelColumns = GmModuleModelColumns;
//# sourceMappingURL=GmModuleModelColumns.js.map