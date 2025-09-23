"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceDateHelper = void 0;
const GmAbstractServiceFn_1 = require("../abstractService/GmAbstractServiceFn");
class GmServiceDateHelper extends GmAbstractServiceFn_1.GmAbstractServiceFn {
    getServiceName() {
        return 'DateHelper';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'DateHelper',
            isLibImport: true,
        };
    }
    getConstructorProp() {
        return null;
    }
    getCurrentMonth() {
        return `DateHelper.getCurrentMonth()`;
    }
    getCurrentYear() {
        return `DateHelper.getCurrentYear()`;
    }
}
exports.GmServiceDateHelper = GmServiceDateHelper;
//# sourceMappingURL=GmServiceDateHelper.js.map