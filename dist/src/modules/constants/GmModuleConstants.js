"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleConstants = void 0;
const GmAbstractModuleConstant_1 = require("../abstractModule/GmAbstractModuleConstant");
class GmModuleConstants extends GmAbstractModuleConstant_1.GmAbstractModuleConstant {
    constructor({ config, value, propertyName, hasDir, fileName, mode, }) {
        super(config);
        this.mode = null;
        this.hasDir = false;
        this.fileName = null;
        this.propertyName = propertyName;
        this.hasDir = hasDir || false;
        this.fileName = fileName || null;
        this.mode = mode || null;
        this.value = value;
    }
    getPropertyName() {
        return this.propertyName;
    }
    getDirName() {
        return this.hasDir ? 'constants' : null;
    }
    getFileName() {
        if (this.fileName) {
            return this.fileName;
        }
        if (this.hasDir) {
            return 'index.ts';
        }
        return 'constants.ts';
    }
    init() {
        this.setBody(`'${this.value}'`);
        if (this.mode) {
            this.setFileWriteMode(this.mode);
        }
    }
}
exports.GmModuleConstants = GmModuleConstants;
//# sourceMappingURL=GmModuleConstants.js.map