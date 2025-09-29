"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmPostDec = void 0;
class GmPostDec {
    constructor(url) {
        this.url = url;
    }
    getDecoratorName() {
        return 'Post';
    }
    getProps() {
        return [this.url];
    }
    getImport() {
        return {
            propertyName: 'Post',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmPostDec = GmPostDec;
//# sourceMappingURL=GmPostDec.js.map