import {GmCrudConfig, GmCrudNoSqlRepositoryConfig, GmCrudSqlRepositoryConfig} from 'os-core-ts'

const sqlByStaticDb: GmCrudSqlRepositoryConfig = {
    dbType: 'sql',
    type: 'staticByDbConnection',
    columns: {
        title: {
            type: 'STRING',
            defaultValue: 'test',
            allowNull: true,
            options:{
                length:1
            }
        }, description: {type: 'INTEGER'},
    },
}

const noSqlByStaticDb: GmCrudNoSqlRepositoryConfig = {
    dbType: 'noSql',
    type: 'staticByDbConnection',
    columns: {
        title: {
            type: 'STRING',
            defaultValue: 'test',
        }, description: {type: 'INTEGER'},
    },
}

const sqlByDynamicDomain: GmCrudSqlRepositoryConfig = {
    dbType: 'sql',
    type: 'dynamicByDomain',
    columns: {name: {type: 'STRING'}, age: {type: 'INTEGER'}},
}

const sqlByLeId: GmCrudSqlRepositoryConfig = {
    dbType: 'sql',
    type: 'dynamicDbConfigByLegalEntityId',
    columns: {title: {type: 'STRING'}, user_id: {type: 'INTEGER'}},
}

const noSqlByYearAndMonth: GmCrudNoSqlRepositoryConfig = {
    dbType: 'noSql',
    type: 'byDatabaseNameAndYearMonth',
    columns: {name: {type: 'STRING'}, price: {type: 'INTEGER'}},
}

export default function buildGmCrudConfig(): GmCrudConfig {
    return {
        dtoName: {
            singular: 'Test2',
            plural: 'Test2',
        },
        moduleName: 'Test2',
        repository: noSqlByStaticDb,
        hasSeparated: true,
        endpoints: {
            add: {hasActionLogger: true, hasAuth: true, hasStructureAccess: true},
            update: {hasActionLogger: true, hasAuth: true, hasStructureAccess: true},
            delete: {hasActionLogger: true, hasAuth: true, hasStructureAccess: true},
            get: {hasAuth: false, hasStructureAccess: true},
            list: {hasAuth: false, hasStructureAccess: true},
        },
        rootDir:'test'
    }
}
