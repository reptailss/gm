import {GmGenerateAbstractCrudDec} from '@crud/GmGenerateAbstractCrudDec'
import {GmConfig} from 'os-core-ts'
import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {
    GmModuleControllerClassCreateByNoSqlMonthAndYear, GmModuleControllerClassCrudByNoSqlMonthAndYear,
    GmModuleControllerClassGetAllByNoSqlMonthAndYear,
} from '@modules/controllers/classes/noSql/byMonthAndYear'


export class GmGenerateCrudDecNoSql extends GmGenerateAbstractCrudDec {


    constructor(config: GmConfig) {

        const controllers: IGmModuleClass[] = []
        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new GmModuleControllerClassCreateByNoSqlMonthAndYear(config))
                    controllers.push(new GmModuleControllerClassGetAllByNoSqlMonthAndYear(config))
                    break
                }
            }
        } else {
            switch (config.model.type) {
                case 'byDatabaseNameAndYearMonth': {
                    controllers.push(new GmModuleControllerClassCrudByNoSqlMonthAndYear(config))
                    break
                }
            }
        }

        super(
            config,
            controllers,
        )
    }

}
