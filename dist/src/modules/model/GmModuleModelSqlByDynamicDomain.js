"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelSqlByDynamicDomain = void 0;
const GmAbstractModuleFnModelSql_1 = require("./abstractModel/GmAbstractModuleFnModelSql");
const GmModuleModeApiSql_1 = require("./api/GmModuleModeApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const PROP_VAR_NAMES = {
    domain: 'domain',
};
class GmModuleModelSqlByDynamicDomain extends GmAbstractModuleFnModelSql_1.GmAbstractModuleFnModelSql {
    constructor(config, { modelVarName, domainVarName, getModelCbVarName, }) {
        super(config);
        this.getModelCbVarName = getModelCbVarName;
        this.domainVarName = domainVarName;
        this.api = new GmModuleModeApiSql_1.GmModuleModeApiSql(modelVarName);
    }
    getPropertyName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`;
    }
    getInitModel() {
        return `${this.getModelCbVarName}(${this.domainVarName})`;
    }
    init() {
        super.init();
        this.setAsyncType('async');
        this.setType(this.getModelTypePropertyName());
        this.addProp({
            varName: PROP_VAR_NAMES.domain,
            type: 'string',
        });
        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderModelSql.dynamicByDomain({
                columns:${this.getColumnsPropertyName()},
                tableName:${this.getTableNamePropertyName()},
                ${PROP_VAR_NAMES.domain},
            })`,
        });
    }
}
exports.GmModuleModelSqlByDynamicDomain = GmModuleModelSqlByDynamicDomain;
//# sourceMappingURL=GmModuleModelSqlByDynamicDomain.js.map