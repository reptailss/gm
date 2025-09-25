"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllBySqlStaticDb = exports.GmModuleServiceClassGetBySqlStaticDb = exports.GmModuleServiceClassDeleteBySqlStaticDb = exports.GmModuleServiceClassUpdateBySqlStaticDb = exports.GmModuleServiceClassCreateBySqlStaticDb = exports.GmModuleServiceClassCrudBySqlStaticDb = void 0;
const GmModuleServiceClassBySqlStaticDb_1 = require("../../bases/GmModuleServiceClassBySqlStaticDb");
const GmServiceActionsLoggerService_1 = require("../../../../../services/sendActionSystemLog/GmServiceActionsLoggerService");
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmModuleServiceMethodCreate_1 = require("../../../methods/GmModuleServiceMethodCreate");
const GmModuleServiceMethodUpdate_1 = require("../../../methods/GmModuleServiceMethodUpdate");
const GmModuleServiceMethodDelete_1 = require("../../../methods/GmModuleServiceMethodDelete");
const GmModuleServiceMethodGetById_1 = require("../../../methods/GmModuleServiceMethodGetById");
const GmModuleServiceMethodGetPagination_1 = require("../../../methods/GmModuleServiceMethodGetPagination");
const GmModuleServiceClassCurdApi_1 = require("../../api/GmModuleServiceClassCurdApi");
class GmModuleServiceClassCrudBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, allCallVarNames) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.allCallVarNames = allCallVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.create))
            .addMethod(new GmModuleServiceMethodUpdate_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.update))
            .addMethod(new GmModuleServiceMethodDelete_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.delete))
            .addMethod(new GmModuleServiceMethodGetById_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleRepository(), this.allCallVarNames.getById))
            .addMethod(new GmModuleServiceMethodGetPagination_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleRepository(), this.allCallVarNames.getPagination));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiAll(this.serviceVarName, this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(2), this.getMethodByIndex(3), this.getMethodByIndex(4));
    }
}
exports.GmModuleServiceClassCrudBySqlStaticDb = GmModuleServiceClassCrudBySqlStaticDb;
class GmModuleServiceClassCreateBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiCreate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassCreateBySqlStaticDb = GmModuleServiceClassCreateBySqlStaticDb;
class GmModuleServiceClassUpdateBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new GmModuleServiceMethodUpdate_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiUpdate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassUpdateBySqlStaticDb = GmModuleServiceClassUpdateBySqlStaticDb;
class GmModuleServiceClassDeleteBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Delete${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addMethod(new GmModuleServiceMethodDelete_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiDelete(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassDeleteBySqlStaticDb = GmModuleServiceClassDeleteBySqlStaticDb;
class GmModuleServiceClassGetBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addMethod(new GmModuleServiceMethodGetById_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleRepository(), this.callVarNames));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiGet(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetBySqlStaticDb = GmModuleServiceClassGetBySqlStaticDb;
class GmModuleServiceClassGetAllBySqlStaticDb extends GmModuleServiceClassBySqlStaticDb_1.GmModuleServiceClassBySqlStaticDb {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `GetAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addMethod(new GmModuleServiceMethodGetPagination_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleRepository(), this.callVarNames));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiGetPagination(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetAllBySqlStaticDb = GmModuleServiceClassGetAllBySqlStaticDb;
//# sourceMappingURL=index.js.map