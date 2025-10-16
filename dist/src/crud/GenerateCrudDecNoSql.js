"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGenerateCrudDecNoSql = void 0;
const GmGenerateAbstractCrudDec_1 = require("./GmGenerateAbstractCrudDec");
const byMonthAndYear_1 = require("../modules/controllers/classes/noSql/byMonthAndYear");
const byStaticDb_1 = require("../modules/controllers/classes/noSql/byStaticDb");
class GmGenerateCrudDecNoSql extends GmGenerateAbstractCrudDec_1.GmGenerateAbstractCrudDec {
    constructor(config) {
        const controllers = [];
        if (config.hasSeparated) {
            switch (config.repository.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new byMonthAndYear_1.GmModuleControllerClassCreateByNoSqlMonthAndYear(config));
                    controllers.push(new byMonthAndYear_1.GmModuleControllerClassGetAllByNoSqlMonthAndYear(config));
                    break;
                }
                case 'staticByDbConnection': {
                    controllers.push(new byStaticDb_1.GmModuleControllerClassCreateByNoSqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassUpdateByNoSqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassDeleteByNoSqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassGetByNoSqlStaticDb(config));
                    controllers.push(new byStaticDb_1.GmModuleControllerClassGetAllByNoSqlStaticDb(config));
                    break;
                }
            }
        }
        else {
            switch (config.repository.type) {
                case 'staticByDbConnection': {
                    controllers.push(new byStaticDb_1.GmModuleControllerClassCrudByNoSqlStaticDb(config));
                    break;
                }
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new byMonthAndYear_1.GmModuleControllerClassCrudByNoSqlMonthAndYear(config));
                    break;
                }
            }
        }
        super(config, controllers);
    }
}
exports.GmGenerateCrudDecNoSql = GmGenerateCrudDecNoSql;
//# sourceMappingURL=GenerateCrudDecNoSql.js.map