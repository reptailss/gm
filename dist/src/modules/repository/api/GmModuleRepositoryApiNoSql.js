"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryApiNoSql = void 0;
const GmObjectStringifyHelper_1 = require("../../../helpers/GmObjectStringifyHelper");
class GmModuleRepositoryApiNoSql {
    constructor(repositoryVarName) {
        this.repositoryVarName = repositoryVarName;
    }
    create(createDtoVarName) {
        return `${this.repositoryVarName}.create(${createDtoVarName})`;
    }
    update(updateDtoVarName, props) {
        return `${this.repositoryVarName}.update(${updateDtoVarName},
                     {
                           where:${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectOptionsToString(props.where)},
                           returning:}
                      },
                      ${props.returning ? 'true' : 'false'}
                )`;
    }
    destroy(props) {
        return `${this.repositoryVarName}.destroy({
                           where:${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectOptionsToString(props.where)}
                      })`;
    }
    findOne(props) {
        return `${this.repositoryVarName}.findOne({
                           where:${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectOptionsToString(props.where)}
                      })`;
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
exports.GmModuleRepositoryApiNoSql = GmModuleRepositoryApiNoSql;
//# sourceMappingURL=GmModuleRepositoryApiNoSql.js.map