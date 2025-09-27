"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleClassRepositorySql = void 0;
const GmAbstractModuleClass_1 = require("../../abstractModule/GmAbstractModuleClass");
const GmModuleRepositoryMethodFindAll_1 = require("../methods/GmModuleRepositoryMethodFindAll");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
const GmModuleRepositoryMethodFindOne_1 = require("../methods/GmModuleRepositoryMethodFindOne");
const GmModuleRepositoryMethodFindByPk_1 = require("../methods/GmModuleRepositoryMethodFindByPk");
const GmModuleRepositoryMethodCreate_1 = require("../methods/GmModuleRepositoryMethodCreate");
const GmModuleRepositoryMethodUpdate_1 = require("../methods/GmModuleRepositoryMethodUpdate");
const GmModuleRepositoryMethodGetConfig_1 = require("../methods/GmModuleRepositoryMethodGetConfig");
const GmModuleRepositoryMethodPagination_1 = require("../methods/GmModuleRepositoryMethodPagination");
const GmModuleRepositoryMethodDestroy_1 = require("../methods/GmModuleRepositoryMethodDestroy");
class GmAbstractModuleClassRepositorySql extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getDirName() {
        return 'repository';
    }
    getFileName() {
        return 'index.ts';
    }
    getEntityInstance() {
        return `new ${this.gmModuleEntity.getPropertyName()}()`;
    }
    getEntityName() {
        return this.gmModuleEntity.getPropertyName();
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addMethod(new GmModuleRepositoryMethodCreate_1.GmModuleRepositoryMethodCreate(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleRepositoryMethodUpdate_1.GmModuleRepositoryMethodUpdate(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleRepositoryMethodDestroy_1.GmModuleRepositoryMethodDestroy(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleRepositoryMethodFindOne_1.GmModuleRepositoryMethodFindOne(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleRepositoryMethodFindByPk_1.GmModuleRepositoryMethodFindByPk(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleRepositoryMethodFindAll_1.GmModuleRepositoryMethodFindAll(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleRepositoryMethodPagination_1.GmModuleRepositoryMethodPagination(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleRepositoryMethodGetConfig_1.GmModuleRepositoryMethodGetConfig(this.getConfig(), this.repositoryVarName));
    }
}
exports.GmAbstractModuleClassRepositorySql = GmAbstractModuleClassRepositorySql;
//# sourceMappingURL=GmAbstractModuleClassRepositorySql.js.map