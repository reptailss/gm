"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGenerateAbstractCrudDec = void 0;
const GmWriteModule_1 = require("../writeModule/GmWriteModule");
const GmModuleAppModule_1 = require("../modules/appModule/GmModuleAppModule");
class GmGenerateAbstractCrudDec {
    constructor(config, controllers) {
        this.controllers = [];
        this.config = config;
        this.controllers = controllers;
    }
    run() {
        if (!this.controllers.length) {
            return;
        }
        this.controllers.forEach((controller) => {
            new GmWriteModule_1.GmWriteModule(controller).run();
        });
        new GmWriteModule_1.GmWriteModule(new GmModuleAppModule_1.GmModuleAppModule(this.config, this.controllers)).run();
    }
}
exports.GmGenerateAbstractCrudDec = GmGenerateAbstractCrudDec;
//# sourceMappingURL=GmGenerateAbstractCrudDec.js.map