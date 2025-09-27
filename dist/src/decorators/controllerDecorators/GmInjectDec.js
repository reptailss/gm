"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmInjectDec = void 0;
class GmInjectDec {
    getDecoratorName() {
        return 'InjectDec';
    }
    getProps() {
        return [''];
    }
    getImport() {
        return {
            propertyName: 'InjectDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmInjectDec = GmInjectDec;
//# sourceMappingURL=GmInjectDec.js.map