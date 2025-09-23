"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmWriteDefaultConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sync_1 = __importDefault(require("@prettier/sync"));
const GmObjectStringifyHelper_1 = require("../helpers/GmObjectStringifyHelper");
const gmDefaultConfig_1 = require("./gmDefaultConfig");
class GmWriteDefaultConfig {
    static write() {
        const outputPath = path_1.default.resolve(process.cwd(), 'gCrudConfig.ts');
        fs_1.default.writeFileSync(outputPath, this.buildDefaultConfig(), 'utf-8');
    }
    static buildDefaultConfig() {
        const baseInfo = `
    
    const sqlByStaticDb:GmSqlModelConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmDefaultConfig_1.gmDefaultConfig.sqlByStaticDbConnection)}
   
    const sqlByDynamicDomain:GmSqlModelConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmDefaultConfig_1.gmDefaultConfig.sqlByDynamicDomain)}
    
    const sqlByLeId:GmSqlModelConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmDefaultConfig_1.gmDefaultConfig.sqlByDynamicLeId)}
    
    const noSqlByYearAndMonth:GmNoSqlModelConfig = ${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmDefaultConfig_1.gmDefaultConfig.noSqlByYearAndMonth)}
    
    `;
        const file = `
    import {GmConfig, GmSqlModelConfig, GmNoSqlModelConfig, GmEndpointsConfig} from 'os-core-ts' \n${baseInfo}
    
  
    export default function buildGmConfig(): GmConfig {
                return {
                    dtoName: { 
                         singular:'User',
                         plural:'Users',
                    },
                    moduleName: 'Users',
                    model: sqlByDynamicDomain,
                    hasSeparated:true,
                    endpoints:${GmObjectStringifyHelper_1.GmObjectStringifyHelper.objectToString(gmDefaultConfig_1.gmDefaultConfig.baseEndpoints)},
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
exports.GmWriteDefaultConfig = GmWriteDefaultConfig;
//# sourceMappingURL=GmWriteDefaultConfig.js.map