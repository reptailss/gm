import fs from 'fs'
import path from 'path'

export class CreateAppGCrudConfigModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'gCrudConfig.ts')
        
        const content =
            `

import { GmCrudConfig, GmCrudNoSqlRepositoryConfig, GmCrudSqlRepositoryConfig } from 'os-core-ts'

const sqlByStaticDb: GmCrudSqlRepositoryConfig = {
    dbType: 'sql',
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
        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}
