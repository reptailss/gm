"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGenerateCrudDecSql = void 0;
const GmGenerateAbstractCrudDec_1 = require("./GmGenerateAbstractCrudDec");
const byStaticDb_1 = require("../modules/controllers/classes/sql/byStaticDb");
const byDynamicDomain_1 = require("../modules/controllers/classes/sql/byDynamicDomain");
const byDynamicLeId_1 = require("../modules/controllers/classes/sql/byDynamicLeId");
class GmGenerateCrudDecSql extends GmGenerateAbstractCrudDec_1.GmGenerateAbstractCrudDec {
    constructor(config) {
        const controllers = [];
        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new byStaticDb_1.GmModuleControllerClassCreateBySqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassUpdateBySqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassDeleteBySqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassGetBySqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassGetAllBySqlStaticDb(config));
                    break;
                }
                case 'dynamicByDomain': {
                    controllers.push(new byDynamicDomain_1.GmModuleControllerClassCreateBySqlDynamicDomain(config));
                    controllers.push(new byDynamicDomain_1.GmModuleControllerClassUpdateBySqlDynamicDomain(config));
                    controllers.push(new byDynamicDomain_1.GmModuleControllerClassDeleteBySqlDynamicDomain(config));
                    controllers.push(new byDynamicDomain_1.GmModuleControllerClassGetBySqlDynamicDomain(config));
                    controllers.push(new byDynamicDomain_1.GmModuleControllerClassGetAllBySqlDynamicDomain(config));
                    break;
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new byDynamicLeId_1.GmModuleControllerClassCreateBySqlDynamicLeId(config));
                    controllers.push(new byDynamicLeId_1.GmModuleControllerClassUpdateBySqlDynamicLeId(config));
                    controllers.push(new byDynamicLeId_1.GmModuleControllerClassDeleteBySqlDynamicLeId(config));
                    controllers.push(new byDynamicLeId_1.GmModuleControllerClassGetBySqlDynamicLeId(config));
                    controllers.push(new byDynamicLeId_1.GmModuleControllerClassGetAllBySqlDynamicLeId(config));
                    break;
                }
            }
        }
        else {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new byStaticDb_1.GmModuleControllerClassCrudBySqlStaticDb(config));
                    break;
                }
                case 'dynamicByDomain': {
                    controllers.push(new byDynamicDomain_1.GmModuleControllerClassCrudBySqlDynamicDomain(config));
                    break;
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new byDynamicLeId_1.GmModuleControllerClassCrudBySqlDynamicLeId(config));
                    break;
                }
            }
        }
        super(config, controllers);
    }
}
exports.GmGenerateCrudDecSql = GmGenerateCrudDecSql;
//# sourceMappingURL=GenerateCrudDecSql.js.map