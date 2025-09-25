"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllBySqlDynamicLeId = exports.GmModuleServiceClassGetBySqlDynamicLeId = exports.GmModuleServiceClassDeleteBySqlDynamicLeId = exports.GmModuleServiceClassUpdateBySqlDynamicLeId = exports.GmModuleServiceClassCreateBySqlDynamicLeId = exports.GmModuleServiceClassCrudBySqlDynamicLeId = void 0;
const GmModuleServiceClassBySqlDynamicLeId_1 = require("../../bases/GmModuleServiceClassBySqlDynamicLeId");
const GmServiceActionsLoggerService_1 = require("../../../../../services/sendActionSystemLog/GmServiceActionsLoggerService");
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmModuleServiceMethodCreate_1 = require("../../../methods/GmModuleServiceMethodCreate");
const GmModuleServiceMethodUpdate_1 = require("../../../methods/GmModuleServiceMethodUpdate");
const GmModuleServiceMethodDelete_1 = require("../../../methods/GmModuleServiceMethodDelete");
const GmModuleServiceMethodGetById_1 = require("../../../methods/GmModuleServiceMethodGetById");
const GmModuleServiceMethodGetPagination_1 = require("../../../methods/GmModuleServiceMethodGetPagination");
const GmModuleServiceClassCurdApi_1 = require("../../api/GmModuleServiceClassCurdApi");
class GmModuleServiceClassCrudBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId_1.GmModuleServiceClassBySqlDynamicLeId {
    constructor(config, serviceVarName, allCallVarNames) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.allCallVarNames = allCallVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService);
        this.addAndInitMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.create), this.allCallVarNames.create.legalEntityId).addAndInitMethod(new GmModuleServiceMethodUpdate_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.update), this.allCallVarNames.update.legalEntityId).addAndInitMethod(new GmModuleServiceMethodDelete_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.delete), this.allCallVarNames.delete.legalEntityId).addAndInitMethod(new GmModuleServiceMethodGetById_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleRepository(), this.allCallVarNames.getById), this.allCallVarNames.getById.legalEntityId).addAndInitMethod(new GmModuleServiceMethodGetPagination_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleRepository(), this.allCallVarNames.getPagination), this.allCallVarNames.getPagination.legalEntityId);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiAll(this.serviceVarName, this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(2), this.getMethodByIndex(3), this.getMethodByIndex(4));
    }
}
exports.GmModuleServiceClassCrudBySqlDynamicLeId = GmModuleServiceClassCrudBySqlDynamicLeId;
class GmModuleServiceClassCreateBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId_1.GmModuleServiceClassBySqlDynamicLeId {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames), this.callVarNames.legalEntityId);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiCreate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassCreateBySqlDynamicLeId = GmModuleServiceClassCreateBySqlDynamicLeId;
class GmModuleServiceClassUpdateBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId_1.GmModuleServiceClassBySqlDynamicLeId {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new GmModuleServiceMethodUpdate_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames), this.callVarNames.legalEntityId);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiUpdate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassUpdateBySqlDynamicLeId = GmModuleServiceClassUpdateBySqlDynamicLeId;
class GmModuleServiceClassDeleteBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId_1.GmModuleServiceClassBySqlDynamicLeId {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Delete${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new GmModuleServiceMethodDelete_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames), this.callVarNames.legalEntityId);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiDelete(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassDeleteBySqlDynamicLeId = GmModuleServiceClassDeleteBySqlDynamicLeId;
class GmModuleServiceClassGetBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId_1.GmModuleServiceClassBySqlDynamicLeId {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addAndInitMethod(new GmModuleServiceMethodGetById_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleRepository(), this.callVarNames), this.callVarNames.legalEntityId);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiGet(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetBySqlDynamicLeId = GmModuleServiceClassGetBySqlDynamicLeId;
class GmModuleServiceClassGetAllBySqlDynamicLeId extends GmModuleServiceClassBySqlDynamicLeId_1.GmModuleServiceClassBySqlDynamicLeId {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `GetAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addAndInitMethod(new GmModuleServiceMethodGetPagination_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleRepository(), this.callVarNames), this.callVarNames.legalEntityId);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiGetPagination(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetAllBySqlDynamicLeId = GmModuleServiceClassGetAllBySqlDynamicLeId;
//# sourceMappingURL=index.js.map