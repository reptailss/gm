"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmInjectableDec = void 0;
class GmInjectableDec {
    getDecoratorName() {
        return 'InjectableDec';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            propertyName: 'InjectableDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmInjectableDec = GmInjectableDec;
//# sourceMappingURL=GmInjectableDec.js.map