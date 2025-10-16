"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleDbConnectionNoSql = void 0;
const GmAbstractModuleConstant_1 = require("../abstractModule/GmAbstractModuleConstant");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmModuleDbConnectionNoSql extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    getPropertyName() {
        return 'dbConnectionStaticNoSql';
    }
    getDirName() {
        return 'db';
    }
    getFileName() {
        return 'dbConnection.ts';
    }
    init() {
        this.setBody(`DbConnectionNoSqlFactory.getStaticByDatabaseName('${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().moduleName)}')`);
        this.setFileWriteMode('skipIfExists');
        this.setDirType('root');
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'DbConnectionNoSqlFactory',
            isLibImport: true,
            dirType: 'modules',
        });
    }
}
exports.GmModuleDbConnectionNoSql = GmModuleDbConnectionNoSql;
//# sourceMappingURL=GmModuleDbConnectionNoSql.js.map