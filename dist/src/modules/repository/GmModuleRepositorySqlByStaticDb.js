"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositorySqlByStaticDb = void 0;
const GmModuleDbConnectionSql_1 = require("../dbConnectionSql/GmModuleDbConnectionSql");
const GmModuleRepositoryApiSql_1 = require("./api/GmModuleRepositoryApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmAbstractModuleClassRepositorySql_1 = require("./abstractRepository/GmAbstractModuleClassRepositorySql");
const GmInjectableDec_1 = require("../../decorators/controllerDecorators/GmInjectableDec");
const VAR_NAMES = {
    repository: 'repository',
};
class GmModuleRepositorySqlByStaticDb extends GmAbstractModuleClassRepositorySql_1.GmAbstractModuleClassRepositorySql {
    constructor(config, repositoryVarName) {
        super(config, `this.${VAR_NAMES.repository}`);
        this.gmModuleDbConnectionSql = new GmModuleDbConnectionSql_1.GmModuleDbConnectionSql(config);
        this.api = new GmModuleRepositoryApiSql_1.GmModuleRepositoryApiSql(repositoryVarName);
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    init() {
        super.init();
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderSqlRepository',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'ISqlRepository',
            isLibImport: true,
        });
        this.addVar({
            varName: VAR_NAMES.repository,
            scope: 'private',
            type: `ISqlRepository<${this.getEntityName()}>`,
            readonly: true,
            defaultValue: null,
        });
        this.addConstructorProp({
            varName: 'loaderSqlRepository',
            privateReadOnly: false,
            type: 'LoaderSqlRepository',
            defaultValue: null,
        });
        this.addModule(this.gmModuleDbConnectionSql);
        this.addElementConstructorBody(`
        this.${VAR_NAMES.repository} = loaderSqlRepository.staticByDbConnection({
            entity:${this.getEntityInstance()},
            dbConnection:${this.gmModuleDbConnectionSql.getPropertyName()},
            tableName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
        })
        `);
    }
}
exports.GmModuleRepositorySqlByStaticDb = GmModuleRepositorySqlByStaticDb;
//# sourceMappingURL=GmModuleRepositorySqlByStaticDb.js.map