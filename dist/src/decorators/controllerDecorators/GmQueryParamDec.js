"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmQueryParamDateDec = exports.GmQueryParamDec = exports.GmQueryParamNumDec = void 0;
class GmQueryParamNumDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'QueryParamNum';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'QueryParamNum',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmQueryParamNumDec = GmQueryParamNumDec;
class GmQueryParamDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'QueryParam';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'QueryParam',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmQueryParamDec = GmQueryParamDec;
class GmQueryParamDateDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'QueryParamDate';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'QueryParamDate',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmQueryParamDateDec = GmQueryParamDateDec;
//# sourceMappingURL=GmQueryParamDec.js.map