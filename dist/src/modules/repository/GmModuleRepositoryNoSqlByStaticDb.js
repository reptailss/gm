"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryNoSqlByStaticDb = void 0;
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmInjectableDec_1 = require("../../decorators/controllerDecorators/GmInjectableDec");
const GmModuleRepositoryApiNoSql_1 = require("./api/GmModuleRepositoryApiNoSql");
const GmModuleDbConnectionNoSql_1 = require("../dbConnection/GmModuleDbConnectionNoSql");
const GmAbstractModuleClassRepositoryNoSql_1 = require("./abstractRepository/GmAbstractModuleClassRepositoryNoSql");
const VAR_NAMES = {
    repository: 'repository',
};
class GmModuleRepositoryNoSqlByStaticDb extends GmAbstractModuleClassRepositoryNoSql_1.GmAbstractModuleClassRepositoryNoSql {
    constructor(config, repositoryVarName) {
        super(config, `this.${VAR_NAMES.repository}`);
        this.gmModuleDbConnectionNoSql = new GmModuleDbConnectionNoSql_1.GmModuleDbConnectionNoSql(config);
        this.api = new GmModuleRepositoryApiNoSql_1.GmModuleRepositoryApiNoSql(repositoryVarName);
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    init() {
        super.init();
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderNoSqlRepository',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'INoSqlRepository',
            isLibImport: true,
        });
        this.addVar({
            varName: VAR_NAMES.repository,
            scope: 'private',
            type: `INoSqlRepository<${this.getEntityName()}>`,
            readonly: true,
            defaultValue: null,
        });
        this.addConstructorProp({
            varName: 'loaderNoSqlRepository',
            privateReadOnly: false,
            type: 'LoaderNoSqlRepository',
            defaultValue: null,
        });
        this.addModule(this.gmModuleDbConnectionNoSql);
        this.addElementConstructorBody(`
        this.${VAR_NAMES.repository} = loaderNoSqlRepository.staticByDbConnection({
            entity:${this.getEntityInstance()},
            dbConnection:${this.gmModuleDbConnectionNoSql.getPropertyName()},
            collectionName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
        })
        `);
    }
}
exports.GmModuleRepositoryNoSqlByStaticDb = GmModuleRepositoryNoSqlByStaticDb;
//# sourceMappingURL=GmModuleRepositoryNoSqlByStaticDb.js.map