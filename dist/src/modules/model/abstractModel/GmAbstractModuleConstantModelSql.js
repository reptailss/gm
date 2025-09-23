"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleConstantModelSql = void 0;
const GmModuleConstants_1 = require("../../constants/GmModuleConstants");
const GmAbstractModuleConstant_1 = require("../../abstractModule/GmAbstractModuleConstant");
const GmModuleModelType_1 = require("../GmModuleModelType");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleModelColumns_1 = require("../../columns/GmModuleModelColumns");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
class GmModuleTableNameConstants extends GmModuleConstants_1.GmModuleConstants {
}
class GmAbstractModuleConstantModelSql extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    constructor(config) {
        super(config);
        this.gmModuleModelColumns = new GmModuleModelColumns_1.GmModuleModelColumns(config);
        this.modelType = new GmModuleModelType_1.GmModuleModelType(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleTableName = new GmModuleTableNameConstants({
            config,
            value: StringCaseHelper_1.StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: this.getTableName(),
        });
    }
    getDirName() {
        return 'model';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addChildModule(this.gmModuleModelColumns);
        this.addModule(this.gmModuleDto);
        this.addModule(this.modelType, {
            hasAddImport: false,
        });
        this.addChildModule(this.gmModuleTableName);
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderModelSql',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'IModelSql',
            isLibImport: true,
        });
    }
    getTableNamePropertyName() {
        return this.gmModuleTableName.getPropertyName();
    }
    getColumnsPropertyName() {
        return this.gmModuleModelColumns.getPropertyName();
    }
    getModelTypePropertyName() {
        return this.modelType.getPropertyName();
    }
    getTableName() {
        return `${StringCaseHelper_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_TABLE_NAME`;
    }
}
exports.GmAbstractModuleConstantModelSql = GmAbstractModuleConstantModelSql;
//# sourceMappingURL=GmAbstractModuleConstantModelSql.js.map