"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelSqlByStaticDb = void 0;
const GmAbstractModuleConstantModelSql_1 = require("./abstractModel/GmAbstractModuleConstantModelSql");
const GmModuleDbConnectionSql_1 = require("../dbConnectionSql/GmModuleDbConnectionSql");
const GmModuleModeApiSql_1 = require("./api/GmModuleModeApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmModuleModelSqlByStaticDb extends GmAbstractModuleConstantModelSql_1.GmAbstractModuleConstantModelSql {
    constructor(config, modelVarName) {
        super(config);
        this.gmModuleDbConnectionSql = new GmModuleDbConnectionSql_1.GmModuleDbConnectionSql(config);
        this.api = new GmModuleModeApiSql_1.GmModuleModeApiSql(modelVarName);
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Repository`;
    }
    init() {
        super.init();
        this.addModule(this.gmModuleDbConnectionSql);
        this.setType(this.getModelTypePropertyName());
        this.setBody(`
            LoaderSqlRepository.staticByDbConnection({
                 entity: ${this.getEntityPropertyName()},
                 tableName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                 dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            })`);
    }
}
exports.GmModuleModelSqlByStaticDb = GmModuleModelSqlByStaticDb;
//# sourceMappingURL=GmModuleModelSqlByStaticDb.js.map