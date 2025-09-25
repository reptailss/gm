"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelSqlByDynamicLeId = void 0;
const GmAbstractModuleFnModelSql_1 = require("./abstractModel/GmAbstractModuleFnModelSql");
const GmModuleModeApiSql_1 = require("./api/GmModuleModeApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const PROP_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
};
class GmModuleModelSqlByDynamicLeId extends GmAbstractModuleFnModelSql_1.GmAbstractModuleFnModelSql {
    constructor(config, { modelVarName, getModelCbVarName, leIdVarName, }) {
        super(config);
        this.getModelCbVarName = getModelCbVarName;
        this.leIdVarName = leIdVarName;
        this.api = new GmModuleModeApiSql_1.GmModuleModeApiSql(modelVarName);
    }
    getPropertyName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    getInitModel() {
        return `${this.getModelCbVarName}(${this.leIdVarName})`;
    }
    init() {
        super.init();
        this.addProp({
            varName: PROP_VAR_NAMES.legalEntityId,
            type: 'number',
        });
        this.setAsyncType('async');
        this.setType(this.getModelTypePropertyName());
        this.appendBodyElement({
            name: 'returnModel',
            value: `
            return LoaderSqlRepository.dynamicDbConfigByLegalEntityId({
                entity:${this.getEntityPropertyName()},
                tableName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                ${PROP_VAR_NAMES.legalEntityId},
            })`,
        });
    }
}
exports.GmModuleModelSqlByDynamicLeId = GmModuleModelSqlByDynamicLeId;
//# sourceMappingURL=GmModuleModelSqlByDynamicLeId.js.map