"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositorySqlByDynamicLeId = void 0;
const GmAbstractModuleFnRepositorySql_1 = require("./abstractRepository/GmAbstractModuleFnRepositorySql");
const GmModuleRepositoryApiSql_1 = require("./api/GmModuleRepositoryApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const PROP_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
};
class GmModuleRepositorySqlByDynamicLeId extends GmAbstractModuleFnRepositorySql_1.GmAbstractModuleFnRepositorySql {
    constructor(config, { repositoryVarName, getRepositoryCbVarName, leIdVarName, }) {
        super(config);
        this.getRepositoryCbVarName = getRepositoryCbVarName;
        this.leIdVarName = leIdVarName;
        this.api = new GmModuleRepositoryApiSql_1.GmModuleRepositoryApiSql(repositoryVarName);
    }
    getPropertyName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    getInitRepository() {
        return `${this.getRepositoryCbVarName}(${this.leIdVarName})`;
    }
    init() {
        super.init();
        this.addProp({
            varName: PROP_VAR_NAMES.legalEntityId,
            type: 'number',
        });
        this.setAsyncType('async');
        this.setType(this.getRepositoryTypePropertyName());
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`;
        this.appendBodyElement({
            name: 'return Repository',
            value: `
            return LoaderSqlRepository.dynamicDbConfigByLegalEntityId({
                ${entity},
                tableName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                ${PROP_VAR_NAMES.legalEntityId},
            })`,
        });
    }
}
exports.GmModuleRepositorySqlByDynamicLeId = GmModuleRepositorySqlByDynamicLeId;
//# sourceMappingURL=GmModuleRepositorySqlByDynamicLeId.js.map