"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmWriteModule = void 0;
const GmCreateFile_1 = require("./GmCreateFile");
class GmWriteModule {
    constructor(module) {
        module.init();
        this.gmCreateFile = new GmCreateFile_1.GmCreateFile(module);
    }
    run() {
        this.gmCreateFile.run();
    }
}
exports.GmWriteModule = GmWriteModule;
//# sourceMappingURL=GmWriteModule.js.map