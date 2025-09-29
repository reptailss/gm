"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGetDec = void 0;
class GmGetDec {
    constructor(url) {
        this.url = url;
    }
    getDecoratorName() {
        return 'Get';
    }
    getProps() {
        return [this.url];
    }
    getImport() {
        return {
            propertyName: 'Get',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmGetDec = GmGetDec;
//# sourceMappingURL=GmGetDec.js.map