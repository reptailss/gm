"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleNoSqlRepositoryMethodCreate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
class GmModuleNoSqlRepositoryMethodCreate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getPropertyName() {
        return 'create';
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
            propertyName: 'CreateEntity',
        });
        this.addProp({
            type: `CreateEntity<${this.gmModuleEntity.getPropertyName()}>`,
            varName: 'createEntity',
            callVarName: 'createEntity',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.create(createEntity)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<Entity<${this.gmModuleEntity.getPropertyName()}>>`);
    }
}
exports.GmModuleNoSqlRepositoryMethodCreate = GmModuleNoSqlRepositoryMethodCreate;
//# sourceMappingURL=GmModuleNoSqlRepositoryMethodCreate.js.map