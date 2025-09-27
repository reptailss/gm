"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryMethodUpdate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleUpdateDto_1 = require("../../dto/GmModuleUpdateDto");
class GmModuleRepositoryMethodUpdate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
    }
    getPropertyName() {
        return 'update';
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleUpdateDto);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        });
        this.addProp({
            type: this.gmModuleUpdateDto.getPropertyName(),
            varName: 'updateDto',
            callVarName: 'updateDto',
            decorator: null,
        });
        this.addProp({
            type: `WhereSql<Entity<${this.gmModuleEntity.getPropertyName()}>>`,
            varName: 'where',
            callVarName: 'where',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.update(updateDto,{where},true)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`);
    }
}
exports.GmModuleRepositoryMethodUpdate = GmModuleRepositoryMethodUpdate;
//# sourceMappingURL=GmModuleRepositoryMethodUpdate.js.map