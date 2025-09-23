import {GmGenerateAbstractCrudDec} from '@crud/GmGenerateAbstractCrudDec'
import {GmConfig} from 'os-core-ts'
import {IGmModuleClass} from '@modules/interfaces/gmModule'
import {
    GmModuleControllerClassCreateBySqlStaticDb, GmModuleControllerClassCrudBySqlStaticDb,
    GmModuleControllerClassDeleteBySqlStaticDb,
    GmModuleControllerClassGetAllBySqlStaticDb, GmModuleControllerClassGetBySqlStaticDb,
    GmModuleControllerClassUpdateBySqlStaticDb,
} from '@modules/controllers/classes/sql/byStaticDb'
import {
    GmModuleControllerClassCreateBySqlDynamicDomain, GmModuleControllerClassCrudBySqlDynamicDomain,
    GmModuleControllerClassDeleteBySqlDynamicDomain, GmModuleControllerClassGetAllBySqlDynamicDomain,
    GmModuleControllerClassGetBySqlDynamicDomain,
    GmModuleControllerClassUpdateBySqlDynamicDomain,
} from '@modules/controllers/classes/sql/byDynamicDomain'
import {
    GmModuleControllerClassCreateBySqlDynamicLeId, GmModuleControllerClassCrudBySqlDynamicLeId,
    GmModuleControllerClassDeleteBySqlDynamicLeId, GmModuleControllerClassGetAllBySqlDynamicLeId,
    GmModuleControllerClassGetBySqlDynamicLeId,
    GmModuleControllerClassUpdateBySqlDynamicLeId,
} from '@modules/controllers/classes/sql/byDynamicLeId'


export class GmGenerateCrudDecSql extends GmGenerateAbstractCrudDec {

    constructor(config: GmConfig) {

        const controllers: IGmModuleClass[] = []

        if (config.hasSeparated) {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new GmModuleControllerClassCreateBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassUpdateBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassDeleteBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassGetBySqlStaticDb(config))
                    controllers.push(new GmModuleControllerClassGetAllBySqlStaticDb(config))
                    break
                }
                case 'dynamicByDomain': {
                    controllers.push(new GmModuleControllerClassCreateBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassUpdateBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassDeleteBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassGetBySqlDynamicDomain(config))
                    controllers.push(new GmModuleControllerClassGetAllBySqlDynamicDomain(config))
                    break
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new GmModuleControllerClassCreateBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassUpdateBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassDeleteBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassGetBySqlDynamicLeId(config))
                    controllers.push(new GmModuleControllerClassGetAllBySqlDynamicLeId(config))
                    break
                }
            }

        } else {
            switch (config.model.type) {
                case 'staticByDbConnection': {
                    controllers.push(new GmModuleControllerClassCrudBySqlStaticDb(config))
                    break
                }
                case 'dynamicByDomain': {
                    controllers.push(new GmModuleControllerClassCrudBySqlDynamicDomain(config))
                    break
                }
                case 'dynamicDbConfigByLegalEntityId': {
                    controllers.push(new GmModuleControllerClassCrudBySqlDynamicLeId(config))
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
