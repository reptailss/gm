"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllBySqlDynamicDomain = exports.GmModuleServiceClassGetBySqlDynamicDomain = exports.GmModuleServiceClassDeleteBySqlDynamicDomain = exports.GmModuleServiceClassUpdateBySqlDynamicDomain = exports.GmModuleServiceClassCreateBySqlDynamicDomain = exports.GmModuleServiceClassCrudBySqlDynamicDomain = void 0;
const GmModuleServiceClassBySqlDynamicDomain_1 = require("../../bases/GmModuleServiceClassBySqlDynamicDomain");
const GmServiceActionsLoggerService_1 = require("../../../../../services/sendActionSystemLog/GmServiceActionsLoggerService");
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmModuleServiceMethodCreate_1 = require("../../../methods/GmModuleServiceMethodCreate");
const GmModuleServiceMethodUpdate_1 = require("../../../methods/GmModuleServiceMethodUpdate");
const GmModuleServiceMethodDelete_1 = require("../../../methods/GmModuleServiceMethodDelete");
const GmModuleServiceMethodGetById_1 = require("../../../methods/GmModuleServiceMethodGetById");
const GmModuleServiceMethodGetPagination_1 = require("../../../methods/GmModuleServiceMethodGetPagination");
const GmModuleServiceClassCurdApi_1 = require("../../api/GmModuleServiceClassCurdApi");
class GmModuleServiceClassCrudBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, allCallVarNames) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.allCallVarNames = allCallVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService);
        this.addAndInitMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.create), this.allCallVarNames.create.domain).addAndInitMethod(new GmModuleServiceMethodUpdate_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.update), this.allCallVarNames.update.domain).addAndInitMethod(new GmModuleServiceMethodDelete_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.delete), this.allCallVarNames.delete.domain).addAndInitMethod(new GmModuleServiceMethodGetById_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleRepository(), this.allCallVarNames.getById), this.allCallVarNames.getById.domain).addAndInitMethod(new GmModuleServiceMethodGetPagination_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleRepository(), this.allCallVarNames.getPagination), this.allCallVarNames.getPagination.domain);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiAll(this.serviceVarName, this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(2), this.getMethodByIndex(3), this.getMethodByIndex(4));
    }
}
exports.GmModuleServiceClassCrudBySqlDynamicDomain = GmModuleServiceClassCrudBySqlDynamicDomain;
class GmModuleServiceClassCreateBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames), this.callVarNames.domain);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiCreate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassCreateBySqlDynamicDomain = GmModuleServiceClassCreateBySqlDynamicDomain;
class GmModuleServiceClassUpdateBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new GmModuleServiceMethodUpdate_1.GmModuleServiceMethodUpdate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames), this.callVarNames.domain);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiUpdate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassUpdateBySqlDynamicDomain = GmModuleServiceClassUpdateBySqlDynamicDomain;
class GmModuleServiceClassDeleteBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Delete${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new GmModuleServiceMethodDelete_1.GmModuleServiceMethodDelete(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames), this.callVarNames.domain);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiDelete(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassDeleteBySqlDynamicDomain = GmModuleServiceClassDeleteBySqlDynamicDomain;
class GmModuleServiceClassGetBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addAndInitMethod(new GmModuleServiceMethodGetById_1.GmModuleServiceMethodGetById(this.getConfig(), this.getModuleRepository(), this.callVarNames), this.callVarNames.domain);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiGet(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetBySqlDynamicDomain = GmModuleServiceClassGetBySqlDynamicDomain;
class GmModuleServiceClassGetAllBySqlDynamicDomain extends GmModuleServiceClassBySqlDynamicDomain_1.GmModuleServiceClassBySqlDynamicDomain {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `GetAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addAndInitMethod(new GmModuleServiceMethodGetPagination_1.GmModuleServiceMethodGetPagination(this.getConfig(), this.getModuleRepository(), this.callVarNames), this.callVarNames.domain);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiGetPagination(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetAllBySqlDynamicDomain = GmModuleServiceClassGetAllBySqlDynamicDomain;
//# sourceMappingURL=index.js.map