"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositorySqlByDynamicDomain = void 0;
const GmAbstractModuleFnRepositorySql_1 = require("./abstractRepository/GmAbstractModuleFnRepositorySql");
const GmModuleRepositoryApiSql_1 = require("./api/GmModuleRepositoryApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const PROP_VAR_NAMES = {
    domain: 'domain',
};
class GmModuleRepositorySqlByDynamicDomain extends GmAbstractModuleFnRepositorySql_1.GmAbstractModuleFnRepositorySql {
    constructor(config, { repositoryVarName, domainVarName, getRepositoryCbVarName, }) {
        super(config);
        this.getRepositoryCbVarName = getRepositoryCbVarName;
        this.domainVarName = domainVarName;
        this.api = new GmModuleRepositoryApiSql_1.GmModuleRepositoryApiSql(repositoryVarName);
    }
    getPropertyName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    getInitRepository() {
        return `${this.getRepositoryCbVarName}(${this.domainVarName})`;
    }
    init() {
        super.init();
        this.setAsyncType('async');
        this.setType(this.getRepositoryTypePropertyName());
        this.addProp({
            varName: PROP_VAR_NAMES.domain,
            type: 'string',
        });
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`;
        this.appendBodyElement({
            name: 'return Repository',
            value: `
            return LoaderSqlRepository.dynamicByDomain({
                ${entity},
                tableName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                ${PROP_VAR_NAMES.domain},
            })`,
        });
    }
}
exports.GmModuleRepositorySqlByDynamicDomain = GmModuleRepositorySqlByDynamicDomain;
//# sourceMappingURL=GmModuleRepositorySqlByDynamicDomain.js.map