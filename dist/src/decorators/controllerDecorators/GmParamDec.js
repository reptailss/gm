"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmParamDec = exports.GmParamNumDec = void 0;
class GmParamNumDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'ParamNum';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'ParamNum',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmParamNumDec = GmParamNumDec;
class GmParamDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'Param';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'Param',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmParamDec = GmParamDec;
//# sourceMappingURL=GmParamDec.js.map