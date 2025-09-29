"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceUserDtoType = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceUserDtoType extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'UserDto',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'UserDto';
    }
    getUserInfoType() {
        return 'UserDto';
    }
}
exports.GmServiceUserDtoType = GmServiceUserDtoType;
//# sourceMappingURL=GmServiceUserDtoType.js.map