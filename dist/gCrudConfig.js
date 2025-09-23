"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlByStaticDb = {
    dbType: 'sql',
    type: 'staticByDbConnection',
    columns: { title: { type: 'STRING' }, description: { type: 'STRING' } }
};
const sqlByDynamicDomain = {
    dbType: 'sql',
    type: 'dynamicByDomain',
    columns: { name: { type: 'STRING' }, age: { type: 'INTEGER' } }
};
const sqlByLeId = {
    dbType: 'sql',
    type: 'dynamicDbConfigByLegalEntityId',
    columns: { title: { type: 'STRING' }, user_id: { type: 'INTEGER' } }
};
const noSqlByYearAndMonth = {
    dbType: 'noSql',
    type: 'byDatabaseNameAndYearMonth',
    columns: { name: { type: 'STRING' }, price: { type: 'INTEGER' } }
};
function buildGmConfig() {
    return {
        dtoName: {
            singular: 'Post',
            plural: 'Posts'
        },
        moduleName: 'Posts',
        model: sqlByDynamicDomain,
        hasSeparated: true,
        endpoints: {
            add: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            update: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            delete: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            get: { hasAuth: false, hasStructureAccess: false },
            list: { hasAuth: false, hasStructureAccess: false }
        }
    };
}
exports.default = buildGmConfig;
//# sourceMappingURL=gCrudConfig.js.map