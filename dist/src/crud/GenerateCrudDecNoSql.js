"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGenerateCrudDecNoSql = void 0;
const GmGenerateAbstractCrudDec_1 = require("./GmGenerateAbstractCrudDec");
const byMonthAndYear_1 = require("../modules/controllers/classes/noSql/byMonthAndYear");
class GmGenerateCrudDecNoSql extends GmGenerateAbstractCrudDec_1.GmGenerateAbstractCrudDec {
    constructor(config) {
        const controllers = [];
        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new byMonthAndYear_1.GmModuleControllerClassCreateByNoSqlMonthAndYear(config));
                    controllers.push(new byMonthAndYear_1.GmModuleControllerClassGetAllByNoSqlMonthAndYear(config));
                    break;
                }
            }
        }
        else {
            switch (config.model.type) {
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