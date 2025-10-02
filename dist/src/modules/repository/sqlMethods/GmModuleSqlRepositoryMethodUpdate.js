"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleSqlRepositoryMethodUpdate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
class GmModuleSqlRepositoryMethodUpdate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getPropertyName() {
        return 'update';
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'UpdateEntity',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'WhereSql',
        });
        this.addProp({
            type: `UpdateEntity<${this.gmModuleEntity.getPropertyName()}>`,
            varName: 'updateEntity',
            callVarName: 'updateEntity',
            decorator: null,
        });
        this.addProp({
            type: `WhereSql<${this.gmModuleEntity.getPropertyName()}>`,
            varName: 'where',
            callVarName: 'where',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.update(updateEntity,{where},true)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<Entity<${this.gmModuleEntity.getPropertyName()}>>`);
    }
}
exports.GmModuleSqlRepositoryMethodUpdate = GmModuleSqlRepositoryMethodUpdate;
//# sourceMappingURL=GmModuleSqlRepositoryMethodUpdate.js.map