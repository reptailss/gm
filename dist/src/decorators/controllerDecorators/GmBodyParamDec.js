"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmBodyParamDec = exports.GmBodyParamNumDec = void 0;
class GmBodyParamNumDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'BodyParamNumDec';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'BodyParamNumDec',
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
        return 'BodyParamDec';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'BodyParamDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmBodyParamDec = GmBodyParamDec;
//# sourceMappingURL=GmBodyParamDec.js.map