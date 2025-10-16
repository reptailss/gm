"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppGCrudConfigModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CreateAppGCrudConfigModule {
    constructor(packageName) {
        this.packageName = packageName;
    }
    create() {
        const rootDir = process.cwd();
        const packageJsonPath = path_1.default.join(rootDir, this.packageName, 'gCrudConfig.ts');
        const content = `

import { GmCrudConfig, GmCrudNoSqlRepositoryConfig, GmCrudSqlRepositoryConfig,GmCrudNoSqlRepositoryConfig } from 'os-core-ts'

const sqlByStaticDb: GmCrudNoSqlRepositoryConfig = {
    dbType: 'sql',
    type: 'staticByDbConnection',
    columns: { title: { type: 'STRING' }, description: { type: 'STRING' } }
}

const noSqlByStaticDb: GmCrudSqlRepositoryConfig = {
    dbType: 'noSql',
    type: 'staticByDbConnection',
    columns: { title: { type: 'STRING' }, description: { type: 'STRING' } }
}

const sqlByDynamicDomain: GmCrudSqlRepositoryConfig = {
    dbType: 'sql',
    type: 'dynamicByDomain',
    columns: { name: { type: 'STRING' }, age: { type: 'INTEGER' } }
}

const sqlByLeId: GmCrudSqlRepositoryConfig = {
    dbType: 'sql',
    type: 'dynamicDbConfigByLegalEntityId',
    columns: { title: { type: 'STRING' }, user_id: { type: 'INTEGER' } }
}

const noSqlByYearAndMonth: GmCrudNoSqlRepositoryConfig = {
    dbType: 'noSql',
    type: 'byDatabaseNameAndYearMonth',
    columns: { name: { type: 'STRING' }, price: { type: 'INTEGER' } }
}

export default function buildGmCrudConfig(): GmCrudConfig {
    return {
        dtoName: {
            singular: 'Post',
            plural: 'Posts'
        },
        moduleName: 'Posts',
        repository: sqlByDynamicDomain,
        hasSeparated: true,
        endpoints: {
            add: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            update: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            delete: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            get: { hasAuth: false, hasStructureAccess: false },
            list: { hasAuth: false, hasStructureAccess: false }
        }
    }
}
        `;
        fs_1.default.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        });
    }
}
exports.CreateAppGCrudConfigModule = CreateAppGCrudConfigModule;
//# sourceMappingURL=CreateAppGCrudConfigModule.js.map