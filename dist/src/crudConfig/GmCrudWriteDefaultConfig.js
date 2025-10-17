"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmCrudWriteDefaultConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sync_1 = __importDefault(require("@prettier/sync"));
const GmObjectStringifyHelper_1 = require("../helpers/GmObjectStringifyHelper");
const gmCrudDefaultConfig_1 = require("./gmCrudDefaultConfig");
class GmCrudWriteDefaultConfig {
    static write() {
        const outputPath = path_1.default.resolve(process.cwd(), 'gCrudConfig.ts');
        fs_1.default.writeFileSync(outputPath, this.buildDefaultConfig(), 'utf-8');
    }
    static buildDefaultConfig() {
        const baseInfo = `
    
    const sqlByStaticDb:GmCrudSqlRepositoryConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig_1.gmCrudDefaultConfig.sqlByStaticDbConnection)}
    
    const noSqlByStaticDb:GmCrudNoSqlRepositoryConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig_1.gmCrudDefaultConfig.noSqlByStaticDbConnection)}
   
    const sqlByDynamicDomain:GmCrudSqlRepositoryConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig_1.gmCrudDefaultConfig.sqlByDynamicDomain)}
    
    const sqlByLeId:GmCrudSqlRepositoryConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig_1.gmCrudDefaultConfig.sqlByDynamicLeId)}
    
    const noSqlByYearAndMonth:GmCrudNoSqlRepositoryConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig_1.gmCrudDefaultConfig.noSqlByYearAndMonth)}
    
    `;
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
                    endpoints:${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmCrudDefaultConfig_1.gmCrudDefaultConfig.baseEndpoints)},
                    rootDir:'src',
                }
    }
    `;
        return sync_1.default.format(file, {
            parser: 'typescript',
            semi: false,
            singleQuote: true,
            bracketSpacing: false,
            arrowParens: 'avoid',
            trailingComma: 'all',
            tabWidth: 4,
            printWidth: 100,
            alignProps: true,
        });
    }
}
exports.GmCrudWriteDefaultConfig = GmCrudWriteDefaultConfig;
//# sourceMappingURL=GmCrudWriteDefaultConfig.js.map