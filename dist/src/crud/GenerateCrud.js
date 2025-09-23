"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateCrud = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const GetGmConfig_1 = require("../config/GetGmConfig");
const StringCaseHelper_1 = require("../helpers/StringCaseHelper");
const GenerateCrudDecSql_1 = require("./GenerateCrudDecSql");
const GenerateCrudDecNoSql_1 = require("./GenerateCrudDecNoSql");
class GenerateCrud {
    async run() {
        const config = await GetGmConfig_1.GetGmConfig.getConfig();
        const dirName = StringCaseHelper_1.StringCaseHelper.toCamelCase(config.moduleName);
        const rootDir = config.rootDir || 'src';
        const rootDirArray = rootDir.split('/');
        const rootPath = path_1.default.resolve(process.cwd(), ...rootDirArray, 'modules', dirName);
        if (fs_1.default.existsSync(rootPath)) {
            throw new Error(`the folder ${dirName} already exists`);
        }
        switch (config.model.dbType) {
            case 'sql': {
                new GenerateCrudDecSql_1.GmGenerateCrudDecSql(config).run();
                break;
            }
            case 'noSql': {
                new GenerateCrudDecNoSql_1.GmGenerateCrudDecNoSql(config).run();
                break;
            }
        }
    }
}
exports.GenerateCrud = GenerateCrud;
//# sourceMappingURL=GenerateCrud.js.map