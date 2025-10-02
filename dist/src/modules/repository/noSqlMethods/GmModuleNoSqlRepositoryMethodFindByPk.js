"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleNoSqlRepositoryMethodFindByPk = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
class GmModuleNoSqlRepositoryMethodFindByPk extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getPropertyName() {
        return 'findByPk';
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        });
        this.addProp({
            type: `string`,
            varName: 'id',
            callVarName: 'id',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.findByPk(id)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<Entity<${this.gmModuleEntity.getPropertyName()}> | null>`);
    }
}
exports.GmModuleNoSqlRepositoryMethodFindByPk = GmModuleNoSqlRepositoryMethodFindByPk;
//# sourceMappingURL=GmModuleNoSqlRepositoryMethodFindByPk.js.map