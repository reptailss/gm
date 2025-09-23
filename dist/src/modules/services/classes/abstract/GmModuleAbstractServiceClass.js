"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleAbstractServiceClass = void 0;
const GmAbstractModuleClass_1 = require("../../../abstractModule/GmAbstractModuleClass");
class GmModuleAbstractServiceClass extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    constructor(config, className) {
        super(config);
        this.className = className;
    }
    getPropertyName() {
        return this.className;
    }
    getDirName() {
        return 'services';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
}
exports.GmModuleAbstractServiceClass = GmModuleAbstractServiceClass;
//# sourceMappingURL=GmModuleAbstractServiceClass.js.map