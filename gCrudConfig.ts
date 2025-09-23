import {GmConfig, GmSqlModelConfig, GmNoSqlModelConfig, GmEndpointsConfig} from 'os-core-ts'

const sqlByStaticDb: GmSqlModelConfig = {
    dbType: 'sql',
    type: 'staticByDbConnection',
    columns: {title: {type: 'STRING'}, description: {type: 'STRING'}},
}

const sqlByDynamicDomain: GmSqlModelConfig = {
    dbType: 'sql',
    type: 'dynamicByDomain',
    columns: {name: {type: 'STRING'}, age: {type: 'INTEGER'}},
}

const sqlByLeId: GmSqlModelConfig = {
    dbType: 'sql',
    type: 'dynamicDbConfigByLegalEntityId',
    columns: {title: {type: 'STRING'}, user_id: {type: 'INTEGER'}},
}

const noSqlByYearAndMonth: GmNoSqlModelConfig = {
    dbType: 'noSql',
    type: 'byDatabaseNameAndYearMonth',
    columns: {name: {type: 'STRING'}, price: {type: 'INTEGER'}},
}

export default function buildGmConfig(): GmConfig {
    return {
        dtoName: {
            singular: 'User',
            plural: 'Users',
        },
        moduleName: 'Users',
        model: sqlByDynamicDomain,
        hasSeparated: true,
        endpoints: {
            add: {hasActionLogger: true, hasAuth: true, hasStructureAccess: true},
            update: {hasActionLogger: true, hasAuth: true, hasStructureAccess: true},
            delete: {hasActionLogger: true, hasAuth: true, hasStructureAccess: true},
            get: {hasAuth: false, hasStructureAccess: false},
            list: {hasAuth: false, hasStructureAccess: false},
        },
        rootDir: 'src',
    }
}
