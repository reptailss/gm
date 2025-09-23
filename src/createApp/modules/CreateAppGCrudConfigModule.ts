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
const sqlByStaticDb = {
    dbType: 'sql',
    type: 'staticByDbConnection',
    columns: { title: { type: 'STRING' }, description: { type: 'STRING' } }
}

const sqlByDynamicDomain = {
    dbType: 'sql',
    type: 'dynamicByDomain',
    columns: { name: { type: 'STRING' }, age: { type: 'INTEGER' } }
}

const sqlByLeId = {
    dbType: 'sql',
    type: 'dynamicDbConfigByLegalEntityId',
    columns: { title: { type: 'STRING' }, user_id: { type: 'INTEGER' } }
}

const noSqlByYearAndMonth = {
    dbType: 'noSql',
    type: 'byDatabaseNameAndYearMonth',
    columns: { name: { type: 'STRING' }, price: { type: 'INTEGER' } }
}

export default function buildGmConfig() {
    return {
        dtoName: {
            singular: 'User',
            plural: 'Users'
        },
        moduleName: 'Users',
        model: sqlByDynamicDomain,
        hasSeparated: true,
        endpoints: {
            add: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            update: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            delete: { hasActionLogger: true, hasAuth: true, hasStructureAccess: true },
            get: { hasAuth: false, hasStructureAccess: false },
            list: { hasAuth: false, hasStructureAccess: false }
        },
        rootDir: 'src'
    }
}

        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}
