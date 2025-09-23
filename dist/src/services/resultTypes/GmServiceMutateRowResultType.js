"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceMutateRowResultType = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceMutateRowResultType extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'MutateRowResult',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'MutateRowResult';
    }
    getMutateRowResultType(type) {
        return `MutateRowResult<${type}>`;
    }
}
exports.GmServiceMutateRowResultType = GmServiceMutateRowResultType;
//# sourceMappingURL=GmServiceMutateRowResultType.js.map