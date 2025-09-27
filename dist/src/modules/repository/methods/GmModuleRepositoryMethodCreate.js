"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryMethodCreate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../../entity/GmModuleEntity");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleCreateDto_1 = require("../../dto/GmModuleCreateDto");
class GmModuleRepositoryMethodCreate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, repositoryVarName) {
        super(config);
        this.repositoryVarName = repositoryVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    getPropertyName() {
        return 'create';
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleCreateDto);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        });
        this.addProp({
            type: this.gmModuleCreateDto.getPropertyName(),
            varName: 'createDto',
            callVarName: 'where',
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return ${this.repositoryVarName}.create(createDto)`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`);
    }
}
exports.GmModuleRepositoryMethodCreate = GmModuleRepositoryMethodCreate;
//# sourceMappingURL=GmModuleRepositoryMethodCreate.js.map