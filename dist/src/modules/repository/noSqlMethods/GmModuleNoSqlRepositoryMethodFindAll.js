"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleNoSqlRepositoryMethodFindAll = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
class GmModuleNoSqlRepositoryMethodFindAll extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
    }
    getPropertyName() {
        return `findAll<ReturnAttributes extends Array<keyof ${this.gmModuleEntity.getPropertyName()}> | undefined = undefined>`;
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
            propertyName: 'WhereNoSql',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'WhereParams',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'OrderParams',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'NoSqlRow',
        });
        const entity = this.gmModuleEntity.getPropertyName();
        this.addProp({
            type: `
            {
                where?: WhereNoSql<${entity}>
                clientWhere?: WhereParams<Entity<${entity}>>
                order?: OrderParams<Entity<${entity}>>
                offset?: number
                limit?: number
                attributes?: ReturnAttributes
            }
            `,
            varName: 'findOptions',
            callVarName: 'findOptions',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.findAll(findOptions)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<NoSqlRow<${this.gmModuleEntity.getPropertyName()},ReturnAttributes>[]>`);
    }
}
exports.GmModuleNoSqlRepositoryMethodFindAll = GmModuleNoSqlRepositoryMethodFindAll;
//# sourceMappingURL=GmModuleNoSqlRepositoryMethodFindAll.js.map