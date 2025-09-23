"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleFnModelNoSql = void 0;
const GmModuleConstants_1 = require("../../constants/GmModuleConstants");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmAbstractModuleFn_1 = require("../../abstractModule/GmAbstractModuleFn");
const GmModuleModelType_1 = require("../GmModuleModelType");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleModelColumns_1 = require("../../columns/GmModuleModelColumns");
class GmModuleDatabaseNameConstants extends GmModuleConstants_1.GmModuleConstants {
    constructor(config, collectionName) {
        super({
            config,
            value: StringCaseHelper_1.StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: collectionName,
            mode: 'appendAfter',
        });
    }
}
class GmModuleCollectionNameConstants extends GmModuleConstants_1.GmModuleConstants {
    constructor(config, databaseName) {
        super({
            config,
            value: StringCaseHelper_1.StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: databaseName,
            mode: 'appendAfter',
        });
    }
}
class GmAbstractModuleFnModelNoSql extends GmAbstractModuleFn_1.GmAbstractModuleFn {
    constructor(config) {
        super(config);
        this.gmModuleModelColumns = new GmModuleModelColumns_1.GmModuleModelColumns(config);
        this.modelType = new GmModuleModelType_1.GmModuleModelType(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleCollectionName = new GmModuleCollectionNameConstants(config, this.getCollectionName());
        this.gmModuleDatabaseName = new GmModuleDatabaseNameConstants(config, this.getDatabaseName());
    }
    getDirName() {
        return 'model';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addModule(this.modelType, {
            hasAddImport: false,
        });
        this.addModule(this.gmModuleDto);
        this.addChildModule(this.gmModuleCollectionName);
        this.addChildModule(this.gmModuleDatabaseName);
        this.addChildModule(this.gmModuleModelColumns);
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderModelNoSql',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'IModelNoSql',
            isLibImport: true,
        });
    }
    getColumnsPropertyName() {
        return this.gmModuleModelColumns.getPropertyName();
    }
    getCollectionNamePropertyName() {
        return this.gmModuleCollectionName.getPropertyName();
    }
    getDatabaseNamePropertyName() {
        return this.gmModuleDatabaseName.getPropertyName();
    }
    getModelTypePropertyName() {
        return this.modelType.getPropertyName();
    }
    getCollectionName() {
        return `${StringCaseHelper_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_COLLECTION_NAME`;
    }
    getDatabaseName() {
        return `${StringCaseHelper_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_DATABASE_NAME`;
    }
}
exports.GmAbstractModuleFnModelNoSql = GmAbstractModuleFnModelNoSql;
//# sourceMappingURL=GmAbstractModuleFnModelNoSql.js.map