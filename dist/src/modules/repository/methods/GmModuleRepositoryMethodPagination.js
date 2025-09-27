"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryMethodPagination = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
class GmModuleRepositoryMethodPagination extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
    }
    getPropertyName() {
        return 'pagination';
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
            propertyName: 'PaginationQueryParams',
        });
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'PaginationValues',
        });
        this.addProp({
            type: `PaginationQueryParams<Entity<${this.gmModuleEntity.getPropertyName()}>>`,
            varName: 'params',
            callVarName: 'params',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.pagination(params)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<PaginationValues<${this.gmModuleDto.getPropertyName()}>>`);
    }
}
exports.GmModuleRepositoryMethodPagination = GmModuleRepositoryMethodPagination;
//# sourceMappingURL=GmModuleRepositoryMethodPagination.js.map