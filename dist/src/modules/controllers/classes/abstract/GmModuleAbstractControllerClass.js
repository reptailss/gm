"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleAbstractControllerClass = void 0;
const GmAbstractModuleClass_1 = require("../../../abstractModule/GmAbstractModuleClass");
const GmControllerDec_1 = require("../../../../decorators/controllerDecorators/GmControllerDec");
class GmModuleAbstractControllerClass extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    constructor(config, className) {
        super(config);
        this.className = className;
    }
    getPropertyName() {
        return this.className;
    }
    getDirName() {
        return 'controllers';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
    init() {
        this.addDecorator(new GmControllerDec_1.GmControllerDec());
    }
}
exports.GmModuleAbstractControllerClass = GmModuleAbstractControllerClass;
//# sourceMappingURL=GmModuleAbstractControllerClass.js.map