"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmImportStructureServiceEndpointDec = void 0;
class GmImportStructureServiceEndpointDec {
    constructor(name) {
        this.name = name;
    }
    getDecoratorName() {
        return 'ImportStructureServiceEndpoint';
    }
    getProps() {
        return [`'${this.name}'`];
    }
    getImport() {
        return {
            propertyName: 'ImportStructureServiceEndpoint',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmImportStructureServiceEndpointDec = GmImportStructureServiceEndpointDec;
//# sourceMappingURL=GmImportStructureServiceEndpointDec.js.map