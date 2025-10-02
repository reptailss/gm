"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleClassRepositoryNoSql = void 0;
const GmAbstractModuleClass_1 = require("../../abstractModule/GmAbstractModuleClass");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
const GmModuleNoSqlRepositoryMethodCreate_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodCreate");
const GmModuleNoSqlRepositoryMethodUpdate_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodUpdate");
const GmModuleNoSqlRepositoryMethodDestroy_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodDestroy");
const GmModuleNoSqlRepositoryMethodFindOne_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodFindOne");
const GmModuleNoSqlRepositoryMethodFindByPk_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodFindByPk");
const GmModuleNoSqlRepositoryMethodFindAll_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodFindAll");
const GmModuleNoSqlRepositoryMethodPagination_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodPagination");
const GmModuleNoSqlRepositoryMethodGetConfig_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodGetConfig");
const GmModuleNoSqlRepositoryMethodCount_1 = require("../noSqlMethods/GmModuleNoSqlRepositoryMethodCount");
class GmAbstractModuleClassRepositoryNoSql extends GmAbstractModuleClass_1.GmAbstractModuleClass {
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
        this.addMethod(new GmModuleNoSqlRepositoryMethodCreate_1.GmModuleNoSqlRepositoryMethodCreate(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodUpdate_1.GmModuleNoSqlRepositoryMethodUpdate(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodDestroy_1.GmModuleNoSqlRepositoryMethodDestroy(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodFindOne_1.GmModuleNoSqlRepositoryMethodFindOne(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodFindByPk_1.GmModuleNoSqlRepositoryMethodFindByPk(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodFindAll_1.GmModuleNoSqlRepositoryMethodFindAll(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodPagination_1.GmModuleNoSqlRepositoryMethodPagination(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodCount_1.GmModuleNoSqlRepositoryMethodCount(this.getConfig(), this.repositoryVarName));
        this.addMethod(new GmModuleNoSqlRepositoryMethodGetConfig_1.GmModuleNoSqlRepositoryMethodGetConfig(this.getConfig(), this.repositoryVarName));
    }
}
exports.GmAbstractModuleClassRepositoryNoSql = GmAbstractModuleClassRepositoryNoSql;
//# sourceMappingURL=GmAbstractModuleClassRepositoryNoSql.js.map