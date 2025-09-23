"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceRowResultType = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceRowResultType extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'RowResult',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'RowResult';
    }
    getRowResultType(baseType) {
        return `RowResult<${baseType}>`;
    }
}
exports.GmServiceRowResultType = GmServiceRowResultType;
//# sourceMappingURL=GmServiceRowResultType.js.map