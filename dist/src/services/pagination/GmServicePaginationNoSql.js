"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationNoSql = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServicePaginationNoSql extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'MultiCollectionPaginationNoSqlRepository',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'MultiCollectionPaginationNoSqlRepository';
    }
    getPagination({ paramsVarName, dateStartVarName, dateEndVarName, loaderRepositoryVarName, }) {
        const paramsStr = paramsVarName === 'params' ? paramsVarName : `params:${paramsVarName}`;
        const dateStartStr = dateStartVarName === 'dateStart' ? dateStartVarName : `dateStart:${dateStartVarName}`;
        const dateEndStr = dateEndVarName === 'dateEnd' ? dateEndVarName : `dateEnd:${dateEndVarName}`;
        const loaderRepositoryStr = loaderRepositoryVarName === 'loaderRepository' ? loaderRepositoryVarName : `loaderRepository:${loaderRepositoryVarName}`;
        return `MultiCollectionPaginationNoSqlRepository.byYearAndMoth({
            ${paramsStr},
            ${dateStartStr},
            ${dateEndStr},
            ${loaderRepositoryStr}
        })
        `;
    }
}
exports.GmServicePaginationNoSql = GmServicePaginationNoSql;
//# sourceMappingURL=GmServicePaginationNoSql.js.map