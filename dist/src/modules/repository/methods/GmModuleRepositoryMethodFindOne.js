"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryMethodFindOne = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
class GmModuleRepositoryMethodFindOne extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getPropertyName() {
        return 'findOne';
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
            propertyName: 'WhereSql',
        });
        this.addProp({
            type: `WhereSql<Entity<${this.gmModuleEntity.getPropertyName()}>>`,
            varName: 'where',
            callVarName: 'where',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.findOne({where})`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<Entity<${this.gmModuleEntity.getPropertyName()}> | null>`);
    }
}
exports.GmModuleRepositoryMethodFindOne = GmModuleRepositoryMethodFindOne;
//# sourceMappingURL=GmModuleRepositoryMethodFindOne.js.map