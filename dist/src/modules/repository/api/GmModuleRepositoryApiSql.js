"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryApiSql = void 0;
const GmObjectStringifyHelper_1 = require("../../../helpers/GmObjectStringifyHelper");
class GmModuleRepositoryApiSql {
    constructor(repositoryVarName) {
        this.repositoryVarName = repositoryVarName;
    }
    create(createDtoVarName) {
        return `${this.repositoryVarName}.create(${createDtoVarName})`;
    }
    update(updateDtoVarName, props) {
        return `${this.repositoryVarName}.update(${updateDtoVarName},${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectOptionsToString(props.where)})`;
    }
    destroy(props) {
        return `${this.repositoryVarName}.destroy(${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectOptionsToString(props.where)})`;
    }
    findOne(props) {
        return `${this.repositoryVarName}.findOne(${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectOptionsToString(props.where)})`;
    }
    findByPk(idVarName) {
        return `${this.repositoryVarName}.findByPk(${idVarName})`;
    }
    pagination(paramsVarName) {
        return `${this.repositoryVarName}.pagination(${paramsVarName})`;
    }
    getConfig() {
        return `${this.repositoryVarName}.getConfig()`;
    }
    getRepositoryVarName() {
        return this.repositoryVarName;
    }
}
exports.GmModuleRepositoryApiSql = GmModuleRepositoryApiSql;
//# sourceMappingURL=GmModuleRepositoryApiSql.js.map