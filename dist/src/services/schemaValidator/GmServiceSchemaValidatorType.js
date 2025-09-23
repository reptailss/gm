"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceSchemaValidatorType = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceSchemaValidatorType extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'SchemaValidator',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'SchemaValidator';
    }
    getSchemaValidatorType(baseType) {
        return `SchemaValidator<${baseType}>`;
    }
}
exports.GmServiceSchemaValidatorType = GmServiceSchemaValidatorType;
//# sourceMappingURL=GmServiceSchemaValidatorType.js.map