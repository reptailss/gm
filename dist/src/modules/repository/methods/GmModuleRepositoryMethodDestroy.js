"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryMethodDestroy = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
class GmModuleRepositoryMethodDestroy extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
    }
    getPropertyName() {
        return 'destroy';
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addModule(this.gmModuleDto);
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
            value: `return ${this.repositoryVarName}.destroy({where})`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<number>`);
    }
}
exports.GmModuleRepositoryMethodDestroy = GmModuleRepositoryMethodDestroy;
//# sourceMappingURL=GmModuleRepositoryMethodDestroy.js.map