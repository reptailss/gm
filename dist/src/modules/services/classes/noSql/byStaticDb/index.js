"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllByNoSqlStaticDb = exports.GmModuleServiceClassGetByNoSqlStaticDb = exports.GmModuleServiceClassDeleteByNoSqlStaticDb = exports.GmModuleServiceClassUpdateByNoSqlStaticDb = exports.GmModuleServiceClassCreateByNoSqlStaticDb = exports.GmModuleServiceClassCrudByNoSqlStaticDb = void 0;
const GmServiceActionsLoggerService_1 = require("../../../../../services/sendActionSystemLog/GmServiceActionsLoggerService");
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmModuleServiceMethodCreate_1 = require("../../../methods/GmModuleServiceMethodCreate");
const GmModuleServiceMethodUpdate_1 = require("../../../methods/GmModuleServiceMethodUpdate");
const GmModuleServiceMethodDelete_1 = require("../../../methods/GmModuleServiceMethodDelete");
const GmModuleServiceMethodGetById_1 = require("../../../methods/GmModuleServiceMethodGetById");
const GmModuleServiceMethodGetPagination_1 = require("../../../methods/GmModuleServiceMethodGetPagination");
const GmModuleServiceClassCurdApi_1 = require("../../api/GmModuleServiceClassCurdApi");
const GmModuleServiceClassByNoSqlStaticDb_1 = require("../../bases/GmModuleServiceClassByNoSqlStaticDb");
class GmModuleServiceClassCrudByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb_1.GmModuleServiceClassByNoSqlStaticDb {
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
exports.GmModuleServiceClassCrudByNoSqlStaticDb = GmModuleServiceClassCrudByNoSqlStaticDb;
class GmModuleServiceClassCreateByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb_1.GmModuleServiceClassByNoSqlStaticDb {
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
exports.GmModuleServiceClassCreateByNoSqlStaticDb = GmModuleServiceClassCreateByNoSqlStaticDb;
class GmModuleServiceClassUpdateByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb_1.GmModuleServiceClassByNoSqlStaticDb {
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
exports.GmModuleServiceClassUpdateByNoSqlStaticDb = GmModuleServiceClassUpdateByNoSqlStaticDb;
class GmModuleServiceClassDeleteByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb_1.GmModuleServiceClassByNoSqlStaticDb {
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
exports.GmModuleServiceClassDeleteByNoSqlStaticDb = GmModuleServiceClassDeleteByNoSqlStaticDb;
class GmModuleServiceClassGetByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb_1.GmModuleServiceClassByNoSqlStaticDb {
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
exports.GmModuleServiceClassGetByNoSqlStaticDb = GmModuleServiceClassGetByNoSqlStaticDb;
class GmModuleServiceClassGetAllByNoSqlStaticDb extends GmModuleServiceClassByNoSqlStaticDb_1.GmModuleServiceClassByNoSqlStaticDb {
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
exports.GmModuleServiceClassGetAllByNoSqlStaticDb = GmModuleServiceClassGetAllByNoSqlStaticDb;
//# sourceMappingURL=index.js.map