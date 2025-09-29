"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmInjectableDec = void 0;
class GmInjectableDec {
    getDecoratorName() {
        return 'Injectable';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            propertyName: 'Injectable',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmInjectableDec = GmInjectableDec;
//# sourceMappingURL=GmInjectableDec.js.map