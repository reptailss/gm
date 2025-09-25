"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositorySqlByStaticDb = void 0;
const GmAbstractModuleConstantRepositorySql_1 = require("./abstractRepository/GmAbstractModuleConstantRepositorySql");
const GmModuleDbConnectionSql_1 = require("../dbConnectionSql/GmModuleDbConnectionSql");
const GmModuleRepositoryApiSql_1 = require("./api/GmModuleRepositoryApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmModuleRepositorySqlByStaticDb extends GmAbstractModuleConstantRepositorySql_1.GmAbstractModuleConstantRepositorySql {
    constructor(config, repositoryVarName) {
        super(config);
        this.gmModuleDbConnectionSql = new GmModuleDbConnectionSql_1.GmModuleDbConnectionSql(config);
        this.api = new GmModuleRepositoryApiSql_1.GmModuleRepositoryApiSql(repositoryVarName);
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Repository`;
    }
    init() {
        super.init();
        this.addModule(this.gmModuleDbConnectionSql);
        this.setType(this.getRepositoryTypePropertyName());
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`;
        this.setBody(`
            LoaderSqlRepository.staticByDbConnection({
                 ${entity},
                 tableName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                 dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            })`);
    }
}
exports.GmModuleRepositorySqlByStaticDb = GmModuleRepositorySqlByStaticDb;
//# sourceMappingURL=GmModuleRepositorySqlByStaticDb.js.map