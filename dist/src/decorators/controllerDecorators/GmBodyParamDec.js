"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmBodyParamDec = exports.GmBodyParamNumDec = void 0;
class GmBodyParamNumDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'BodyParamNum';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'BodyParamNum',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmBodyParamNumDec = GmBodyParamNumDec;
class GmBodyParamDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'BodyParam';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'BodyParam',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmBodyParamDec = GmBodyParamDec;
//# sourceMappingURL=GmBodyParamDec.js.map