"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleSqlRepositoryMethodGetConfig = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
class GmModuleSqlRepositoryMethodGetConfig extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
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
                dbType: 'mysql'
                tableName: string
            }`);
    }
}
exports.GmModuleSqlRepositoryMethodGetConfig = GmModuleSqlRepositoryMethodGetConfig;
//# sourceMappingURL=GmModuleSqlRepositoryMethodGetConfig.js.map