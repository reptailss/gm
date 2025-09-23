"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceBuildResponseFormat = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceBuildResponseFormat extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getServiceName() {
        return 'BuildResponseFormat';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'BuildResponseFormat',
            isLibImport: true,
        };
    }
    mutateRow(idVarName) {
        return `BuildResponseFormat.mutateRow(${idVarName})`;
    }
    row(rowVarName) {
        return `BuildResponseFormat.row(${rowVarName})`;
    }
    pagination(paginationVarName) {
        return `BuildResponseFormat.pagination(${paginationVarName})`;
    }
}
exports.GmServiceBuildResponseFormat = GmServiceBuildResponseFormat;
//# sourceMappingURL=GmServiceBuildResponseFormat.js.map