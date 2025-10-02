"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleNoSqlRepositoryMethodCount = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
class GmModuleNoSqlRepositoryMethodCount extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getPropertyName() {
        return `count`;
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'WhereNoSql',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'WhereParams',
        });
        const entity = this.gmModuleEntity.getPropertyName();
        this.addProp({
            type: `
            {
                where?: WhereNoSql<${entity}>
                clientWhere?: WhereParams<Entity<${entity}>>
            }
            `,
            varName: 'findOptions',
            callVarName: 'findOptions',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.count(findOptions)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<number>`);
    }
}
exports.GmModuleNoSqlRepositoryMethodCount = GmModuleNoSqlRepositoryMethodCount;
//# sourceMappingURL=GmModuleNoSqlRepositoryMethodCount.js.map