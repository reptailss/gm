"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmSwaggerInfoDec = void 0;
class GmSwaggerInfoDec {
    constructor(summary) {
        this.summary = summary;
    }
    getDecoratorName() {
        return 'SwaggerInfo';
    }
    getProps() {
        return [`{ summary:'${this.summary}'}`];
    }
    getImport() {
        return {
            propertyName: 'SwaggerInfo',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmSwaggerInfoDec = GmSwaggerInfoDec;
//# sourceMappingURL=GmSwaggerInfoDec.js.map