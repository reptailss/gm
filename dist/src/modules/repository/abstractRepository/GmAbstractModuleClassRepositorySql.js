"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleClassRepositorySql = void 0;
const GmAbstractModuleClass_1 = require("../../abstractModule/GmAbstractModuleClass");
const GmModuleSqlRepositoryMethodFindAll_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodFindAll");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
const GmModuleSqlRepositoryMethodFindOne_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodFindOne");
const GmModuleSqlRepositoryMethodFindByPk_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodFindByPk");
const GmModuleSqlRepositoryMethodCreate_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodCreate");
const GmModuleSqlRepositoryMethodUpdate_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodUpdate");
const GmModuleSqlRepositoryMethodGetConfig_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodGetConfig");
const GmModuleSqlRepositoryMethodPagination_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodPagination");
const GmModuleSqlRepositoryMethodDestroy_1 = require("../sqlMethods/GmModuleSqlRepositoryMethodDestroy");
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
        this.addMethod(new GmModuleSqlRepositoryMethodCreate_1.GmModuleSqlRepositoryMethodCreate(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleSqlRepositoryMethodUpdate_1.GmModuleSqlRepositoryMethodUpdate(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleSqlRepositoryMethodDestroy_1.GmModuleSqlRepositoryMethodDestroy(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleSqlRepositoryMethodFindOne_1.GmModuleSqlRepositoryMethodFindOne(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleSqlRepositoryMethodFindByPk_1.GmModuleSqlRepositoryMethodFindByPk(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleSqlRepositoryMethodFindAll_1.GmModuleSqlRepositoryMethodFindAll(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleSqlRepositoryMethodPagination_1.GmModuleSqlRepositoryMethodPagination(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleSqlRepositoryMethodGetConfig_1.GmModuleSqlRepositoryMethodGetConfig(this.getConfig(), this.repositoryVarName));
    }
}
exports.GmAbstractModuleClassRepositorySql = GmAbstractModuleClassRepositorySql;
//# sourceMappingURL=GmAbstractModuleClassRepositorySql.js.map