"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderModuleType = void 0;
const GmRenderModule_1 = require("./GmRenderModule");
const GmRenderImports_1 = require("./GmRenderImports");
class GmRenderModuleType extends GmRenderModule_1.GmRenderModule {
    constructor(moduleType) {
        super(moduleType);
        this.moduleType = moduleType;
        this.gmRenderImports = new GmRenderImports_1.GmRenderImports(moduleType);
    }
    renderBody() {
        return this.moduleType.getBody();
    }
    renderImports() {
        return this.gmRenderImports.renderImports();
    }
    getData(key) {
        return this.moduleType.getRenderData(key);
    }
    getExportMarkIfExported() {
        if (this.moduleType.getExport()) {
            return 'export';
        }
        return '';
    }
}
exports.GmRenderModuleType = GmRenderModuleType;
//# sourceMappingURL=GmRenderModuleType.js.map