"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassGetAllByNoSqlMonthAndYear = exports.GmModuleServiceClassCreateByNoSqlMonthAndYear = exports.GmModuleServiceClassCrudByNoSqlMonthAndYear = void 0;
const GmModuleServiceClassByNoSqlMonthAndYear_1 = require("../../bases/GmModuleServiceClassByNoSqlMonthAndYear");
const GmServiceActionsLoggerService_1 = require("../../../../../services/sendActionSystemLog/GmServiceActionsLoggerService");
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmModuleServiceMethodCreate_1 = require("../../../methods/GmModuleServiceMethodCreate");
const GmModuleServiceMethodGetPaginationNoSql_1 = require("../../../methods/GmModuleServiceMethodGetPaginationNoSql");
const GmModuleServiceClassCurdApi_1 = require("../../api/GmModuleServiceClassCurdApi");
class GmModuleServiceClassCrudByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear_1.GmModuleServiceClassByNoSqlMonthAndYear {
    constructor(config, serviceVarName, allCallVarNames) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.allCallVarNames = allCallVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService);
        this.addAndInitMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.allCallVarNames.create), this.allCallVarNames.create.month, this.allCallVarNames.create.year);
        this.addMethod(new GmModuleServiceMethodGetPaginationNoSql_1.GmModuleServiceMethodGetPaginationNoSql(this.getConfig(), this.getModuleRepository(), this.allCallVarNames.getPagination, this.getLoaderRepositoryVarName()));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiAll(this.serviceVarName, this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(1), this.getMethodByIndex(1), this.getMethodByIndex(1));
    }
}
exports.GmModuleServiceClassCrudByNoSqlMonthAndYear = GmModuleServiceClassCrudByNoSqlMonthAndYear;
class GmModuleServiceClassCreateByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear_1.GmModuleServiceClassByNoSqlMonthAndYear {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
        this.actionsLoggerService = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
    }
    init() {
        super.init();
        this.addService(this.actionsLoggerService)
            .addAndInitMethod(new GmModuleServiceMethodCreate_1.GmModuleServiceMethodCreate(this.getConfig(), this.getModuleRepository(), this.actionsLoggerService, this.callVarNames), this.callVarNames.month, this.callVarNames.year);
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiCreate(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassCreateByNoSqlMonthAndYear = GmModuleServiceClassCreateByNoSqlMonthAndYear;
class GmModuleServiceClassGetAllByNoSqlMonthAndYear extends GmModuleServiceClassByNoSqlMonthAndYear_1.GmModuleServiceClassByNoSqlMonthAndYear {
    constructor(config, serviceVarName, callVarNames) {
        super(config, `GetAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Service`);
        this.serviceVarName = serviceVarName;
        this.callVarNames = callVarNames;
    }
    init() {
        super.init();
        this.addMethod(new GmModuleServiceMethodGetPaginationNoSql_1.GmModuleServiceMethodGetPaginationNoSql(this.getConfig(), this.getModuleRepository(), this.callVarNames, this.getLoaderRepositoryVarName()));
        this.api = new GmModuleServiceClassCurdApi_1.GmModuleServiceClassApiGetPagination(this.serviceVarName, this.getMethodByIndex(0));
    }
}
exports.GmModuleServiceClassGetAllByNoSqlMonthAndYear = GmModuleServiceClassGetAllByNoSqlMonthAndYear;
//# sourceMappingURL=index.js.map