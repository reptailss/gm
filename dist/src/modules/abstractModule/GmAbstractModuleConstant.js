"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleConstant = void 0;
const GmAbstractModule_1 = require("./GmAbstractModule");
class GmAbstractModuleConstant extends GmAbstractModule_1.GmAbstractModule {
    constructor() {
        super(...arguments);
        this.moduleType = 'constant';
        this.renderData = {};
        this.type = '';
        this.body = '';
        this.fileWriteModeGm = 'skipIfExists';
        this.dirType = 'modules';
    }
    getTemplatePath() {
        return 'modules/constant.ejs';
    }
    setType(type) {
        this.type = type;
        return this;
    }
    getType() {
        return this.type;
    }
    setBody(body) {
        this.body = body;
        return this;
    }
    getBody() {
        return this.body;
    }
    addRenderData(key, value) {
        this.renderData[key] = value;
        return this;
    }
    getRenderData(key) {
        if (!(key in this.renderData)) {
            throw new Error(`Not found data ${key}`);
        }
        return this.renderData[key];
    }
    getExport() {
        const parentInfo = this.getParentInfo();
        if (!(parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.dirName)) {
            return {
                path: this.getFilePath(),
                propertyName: this.getPropertyName(),
            };
        }
        return {
            path: `${parentInfo.dirName}/${this.getFilePath()}`,
            propertyName: this.getPropertyName(),
        };
    }
    getFileWriteMode() {
        return this.fileWriteModeGm;
    }
    setDirType(dirType) {
        this.dirType = dirType;
        return this;
    }
    getDirType() {
        return this.dirType;
    }
    setFileWriteMode(mode) {
        this.fileWriteModeGm = mode;
        return this;
    }
    getFilePath() {
        const dirName = this.getDirName();
        if (!dirName) {
            return this.getFileName();
        }
        return `${dirName}/${this.getFileName()}`;
    }
    addChildModule(module) {
        const dirName = this.getDirName();
        if (dirName) {
            module.setParentInfo({
                dirName,
            });
        }
        return super.addChildModule(module);
    }
}
exports.GmAbstractModuleConstant = GmAbstractModuleConstant;
//# sourceMappingURL=GmAbstractModuleConstant.js.map