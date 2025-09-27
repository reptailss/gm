import path from 'path'
import fs from 'fs'
import {GetGmCrudConfig} from '@crudConfig/GetGmCrudConfig'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmGenerateCrudDecSql} from '@crud/GenerateCrudDecSql'
import {GmGenerateCrudDecNoSql} from '@crud/GenerateCrudDecNoSql'


export class GenerateCrud {
    
    public async run() {
        const config = await GetGmCrudConfig.getConfig()
        const dirName = StringCaseHelper.toCamelCase(config.moduleName)
        const rootDir = config.rootDir || 'src'
        const rootDirArray = rootDir.split('/')
        const rootPath = path.resolve(process.cwd(), ...rootDirArray,config.modulesDir || 'modules', dirName)
        
        
        if (fs.existsSync(rootPath)) {
            throw new Error(`the folder ${dirName} already exists`)
        }
        
        switch (config.repository.dbType) {
            case 'sql' : {
                new GmGenerateCrudDecSql(config).run()
                break
            }
            case 'noSql' : {
                new GmGenerateCrudDecNoSql(config).run()
                break
            }
        }
    }
}