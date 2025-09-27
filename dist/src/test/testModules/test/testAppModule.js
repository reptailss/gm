"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAppModule = void 0;
const os_core_ts_1 = require("os-core-ts");
const TestController_1 = require("./controllers/TestController");
exports.testAppModule = new os_core_ts_1.AppModule({
    controllers: [TestController_1.TestController],
    swaggerInfo: {
        tag: 'Test',
    },
});
//# sourceMappingURL=testAppModule.js.map