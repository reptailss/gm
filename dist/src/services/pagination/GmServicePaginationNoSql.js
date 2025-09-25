"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationNoSql = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServicePaginationNoSql extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'RepositoryNoSqlPagination',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'RepositoryNoSqlPagination';
    }
    getPagination({ paramsVarName, dateStartVarName, dateEndVarName, getRepositoryCbVarName, }) {
        const paramsStr = paramsVarName === 'params' ? paramsVarName : `params:${paramsVarName}`;
        const dateStartStr = dateStartVarName === 'dateStart' ? dateStartVarName : `dateStart:${dateStartVarName}`;
        const dateEndStr = dateEndVarName === 'dateEnd' ? dateEndVarName : `dateEnd:${dateEndVarName}`;
        const getRepositoryCbStr = getRepositoryCbVarName === 'getRepositoryCb' ? getRepositoryCbVarName : `getRepositoryCb:${getRepositoryCbVarName}`;
        return `RepositoryNoSqlPagination.byYearAndMoth({
            ${paramsStr},
            ${dateStartStr},
            ${dateEndStr},
            ${getRepositoryCbStr}
        })
        `;
    }
}
exports.GmServicePaginationNoSql = GmServicePaginationNoSql;
//# sourceMappingURL=GmServicePaginationNoSql.js.map