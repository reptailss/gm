import fs from 'fs'
import path from 'path'

import prettier from '@prettier/sync'
import {GmObjectStringifyHelper} from '@helpers/GmObjectStringifyHelper'
import {gmCrudDefaultConfig} from '@crudConfig/gmCrudDefaultConfig'


export class GmCrudWriteDefaultConfig {
    static write() {
        const outputPath = path.resolve(process.cwd(), 'gCrudConfig.ts')

        fs.writeFileSync(outputPath, this.buildDefaultConfig(), 'utf-8')
    }

    private static buildDefaultConfig() {
        const baseInfo = `
    
    const sqlByStaticDb:GmCrudSqlRepositoryConfig = ${GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig.sqlByStaticDbConnection)}
    
    const noSqlByStaticDb:GmCrudNoSqlRepositoryConfig = ${GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig.noSqlByStaticDbConnection)}
   
    const sqlByDynamicDomain:GmCrudSqlRepositoryConfig = ${GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig.sqlByDynamicDomain)}
    
    const sqlByLeId:GmCrudSqlRepositoryConfig = ${GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig.sqlByDynamicLeId)}
    
    const noSqlByYearAndMonth:GmCrudNoSqlRepositoryConfig = ${GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig.noSqlByYearAndMonth)}
    
    `

        const file = `
    import {GmCrudConfig, GmCrudSqlRepositoryConfig, GmCrudNoSqlRepositoryConfig, GmCrudEndpointsConfig} from 'os-core-ts' \n${baseInfo}
    
  
    export default function buildGmCrudConfig(): GmCrudConfig {
                return {
                    dtoName: { 
                         singular:'User',
                         plural:'Users',
                    },
                    moduleName: 'Users',
                    repository: sqlByStaticDb,
                    hasSeparated:true,
                    endpoints:${GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig.baseEndpoints)},
                    rootDir:'src',
                }
    }
    `
        return prettier.format(file, {
            parser: 'typescript',
            semi: false,
            singleQuote: true,
            bracketSpacing: false,
            arrowParens: 'avoid',
            trailingComma: 'all',
            tabWidth: 4,
            printWidth: 100,
            alignProps: true,
        })
    }
}

