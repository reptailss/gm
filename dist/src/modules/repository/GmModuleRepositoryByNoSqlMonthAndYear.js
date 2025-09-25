"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryByNoSqlMonthAndYear = void 0;
const GmAbstractModuleFnRepositoryNoSql_1 = require("./abstractRepository/GmAbstractModuleFnRepositoryNoSql");
const GmModuleRepositoryApiNoSql_1 = require("./api/GmModuleRepositoryApiNoSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const PROP_VAR_NAMES = {
    month: 'month',
    year: 'year',
};
class GmModuleRepositoryByNoSqlMonthAndYear extends GmAbstractModuleFnRepositoryNoSql_1.GmAbstractModuleFnRepositoryNoSql {
    constructor(config, { repositoryVarName, getRepositoryCbVarName, monthVarName, yearVarName, }) {
        super(config);
        this.getRepositoryCbVarName = getRepositoryCbVarName;
        this.monthVarName = monthVarName;
        this.yearVarName = yearVarName;
        this.api = new GmModuleRepositoryApiNoSql_1.GmModuleRepositoryApiNoSql(repositoryVarName);
    }
    getPropertyName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    getInitRepository() {
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`;
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`;
        return `${this.getRepositoryCbVarName}({${monthStr},${yearStr}})`;
    }
    init() {
        super.init();
        this.setPropsType('object');
        this.setAsyncType('async');
        this.setType(this.getRepositoryTypePropertyName());
        this.addProp({
            varName: PROP_VAR_NAMES.month,
            type: 'number',
        });
        this.addProp({
            varName: PROP_VAR_NAMES.year,
            type: 'number',
        });
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`;
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`;
        const entity = this.getEntityPropertyName() === 'entity' ? 'entity' : `entity:${this.getEntityPropertyName()}`;
        this.appendBodyElement({
            name: 'return Repository',
            value: `
            return LoaderNoSqlRepository.byDatabaseNameAndYearMonth({
                ${entity},
                collectionName:${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)},
                databaseName:${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)},
                ${monthStr},
                ${yearStr},
            })`,
        });
    }
}
exports.GmModuleRepositoryByNoSqlMonthAndYear = GmModuleRepositoryByNoSqlMonthAndYear;
//# sourceMappingURL=GmModuleRepositoryByNoSqlMonthAndYear.js.map