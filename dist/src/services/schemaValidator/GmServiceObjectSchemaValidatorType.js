"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceObjectSchemaValidatorType = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceObjectSchemaValidatorType extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'ObjectSchemaValidator',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'ObjectSchemaValidator';
    }
    getSchemaValidatorType(baseType) {
        return `ObjectSchemaValidator<${baseType}>`;
    }
}
exports.GmServiceObjectSchemaValidatorType = GmServiceObjectSchemaValidatorType;
//# sourceMappingURL=GmServiceObjectSchemaValidatorType.js.map