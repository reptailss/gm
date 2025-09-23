"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServicePaginationValuesType = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServicePaginationValuesType extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'PaginationValues',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'PaginationValues';
    }
    getPaginationValuesType(dtoType) {
        return `PaginationValues<${dtoType}>`;
    }
}
exports.GmServicePaginationValuesType = GmServicePaginationValuesType;
//# sourceMappingURL=GmServicePaginationValuesType.js.map