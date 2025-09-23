"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceStructureAccess = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceStructureAccess extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getServiceName() {
        return 'StructureAccessService';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'StructureAccessService',
            isLibImport: true,
        };
    }
    checkAccess({ openUserIdVarName, endpointVarName, legalEntityIdVarName, }) {
        const openUserId = openUserIdVarName === 'openUserId' ? 'openUserId' : `openUserId:${openUserIdVarName}`;
        const legalEntityId = legalEntityIdVarName === 'legalEntityId' ? 'legalEntityId' : `legalEntityId:${legalEntityIdVarName}`;
        const endpoint = endpointVarName === 'endpoint' ? 'endpoint' : `endpoint:${endpointVarName}`;
        return `StructureAccessService.checkAccess({
            ${openUserId},
            ${legalEntityId},
            ${endpoint},
        })`;
    }
}
exports.GmServiceStructureAccess = GmServiceStructureAccess;
//# sourceMappingURL=GmServiceStructureAccess.js.map