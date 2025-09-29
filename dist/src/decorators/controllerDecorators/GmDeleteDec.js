"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmDeleteDec = void 0;
class GmDeleteDec {
    constructor(url) {
        this.url = url;
    }
    getDecoratorName() {
        return 'Delete';
    }
    getProps() {
        return [this.url];
    }
    getImport() {
        return {
            propertyName: 'Delete',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmDeleteDec = GmDeleteDec;
//# sourceMappingURL=GmDeleteDec.js.map