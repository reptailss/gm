"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmBodyDec = void 0;
class GmBodyDec {
    constructor(schemaVarName) {
        this.schemaVarName = schemaVarName;
    }
    getDecoratorName() {
        return 'Body';
    }
    getProps() {
        return [this.schemaVarName];
    }
    getImport() {
        return {
            propertyName: 'Body',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmBodyDec = GmBodyDec;
//# sourceMappingURL=GmBodyDec.js.map