"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationValues = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServicePaginationValues extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationResult',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'PaginationResult';
    }
    getPaginationResultType(dtoType) {
        return `PaginationResult<${dtoType}>`;
    }
}
exports.GmServicePaginationValues = GmServicePaginationValues;
//# sourceMappingURL=GmServicePaginationResultType.js.map