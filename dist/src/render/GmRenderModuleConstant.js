"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderModuleConstant = void 0;
const GmRenderModule_1 = require("./GmRenderModule");
const GmRenderImports_1 = require("./GmRenderImports");
class GmRenderModuleConstant extends GmRenderModule_1.GmRenderModule {
    constructor(moduleConstant) {
        super(moduleConstant);
        this.moduleConstant = moduleConstant;
        this.gmRenderImports = new GmRenderImports_1.GmRenderImports(moduleConstant);
    }
    renderImports() {
        return this.gmRenderImports.renderImports();
    }
    renderBody() {
        return this.moduleConstant.getBody();
    }
    renderType() {
        if (!this.moduleConstant.getType()) {
            return '';
        }
        return `:${this.moduleConstant.getType()}`;
    }
    getData(key) {
        return this.moduleConstant.getRenderData(key);
    }
    getExportMarkIfExported() {
        if (this.moduleConstant.getExport()) {
            return 'export';
        }
        return '';
    }
}
exports.GmRenderModuleConstant = GmRenderModuleConstant;
//# sourceMappingURL=GmRenderModuleConstant.js.map