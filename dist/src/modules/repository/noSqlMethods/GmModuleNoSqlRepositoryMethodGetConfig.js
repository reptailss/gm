"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleNoSqlRepositoryMethodGetConfig = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
class GmModuleNoSqlRepositoryMethodGetConfig extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
    }
    getPropertyName() {
        return 'getConfig';
    }
    init() {
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.getConfig()`,
        });
        this.setReturnType(`{
                database: string
                host: string
                port: string
                dbType: 'mongodb'
                tableName: string
            }`);
    }
}
exports.GmModuleNoSqlRepositoryMethodGetConfig = GmModuleNoSqlRepositoryMethodGetConfig;
//# sourceMappingURL=GmModuleNoSqlRepositoryMethodGetConfig.js.map