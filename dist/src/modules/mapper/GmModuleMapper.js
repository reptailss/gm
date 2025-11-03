"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleMapper = void 0;
const GmAbstractModuleClass_1 = require("../abstractModule/GmAbstractModuleClass");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmAbstractModuleClassMethod_1 = require("../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../entity/GmModuleEntity");
const GmModuleCreateDto_1 = require("../dto/GmModuleCreateDto");
const GmModuleUpdateDto_1 = require("../dto/GmModuleUpdateDto");
const GmModuleDto_1 = require("../dto/GmModuleDto");
const GmModuleDtoHelper_1 = require("../dto/helper/GmModuleDtoHelper");
class CreateDtoToEntity extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, callVarName) {
        super(config);
        this.callVarName = callVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    getPropertyName() {
        return 'createDtoToEntity';
    }
    init() {
        this.setMethodScope('static');
        this.addModule(this.gmModuleEntity);
        this.addModule(this.gmModuleCreateDto);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'CreateEntity',
        });
        this.addProp({
            type: this.gmModuleCreateDto.getPropertyName(),
            varName: 'createDto',
            callVarName: this.callVarName,
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return {
            ${Object.keys(this.getConfig().repository.columns).map((key) => {
                return `${key}:createDto.${key},`;
            }).join('\n')}
            }`,
        });
        this.setReturnType(`CreateEntity<${this.gmModuleEntity.getPropertyName()}>`);
    }
}
class UpdateDtoToEntity extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, callVarName) {
        super(config);
        this.callVarName = callVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
    }
    getPropertyName() {
        return 'updateDtoToEntity';
    }
    init() {
        this.setMethodScope('static');
        this.addModule(this.gmModuleEntity);
        this.addModule(this.gmModuleUpdateDto);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'UpdateEntity',
        });
        this.addProp({
            type: this.gmModuleUpdateDto.getPropertyName(),
            varName: 'updateDto',
            callVarName: this.callVarName,
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `
            const  updateEntity:UpdateEntity< ${this.gmModuleEntity.getPropertyName()}> = {}
            
             ${Object.keys(this.getConfig().repository.columns).map((key) => {
                return `if(typeof updateDto.${key} !== 'undefined'){
                    updateEntity.${key} = updateDto.${key}
                }`;
            }).join('\n')}
            
            return updateEntity
         `,
        });
        this.setReturnType(`UpdateEntity<${this.gmModuleEntity.getPropertyName()}>`);
    }
}
class EntityDtoToDto extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, callVarName) {
        super(config);
        this.callVarName = callVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
    }
    getPropertyName() {
        return 'entityToDTo';
    }
    init() {
        this.setMethodScope('static');
        this.addModule(this.gmModuleEntity);
        this.addModule(this.gmModuleDto);
        this.addImport({
            path: 'os-core-ts',
            isLibImport: true,
            propertyName: 'Entity',
        });
        this.addProp({
            type: `Entity<${this.gmModuleEntity.getPropertyName()}>`,
            varName: 'entity',
            callVarName: this.callVarName,
            decorator: null,
        });
        this.appendBodyElement({
            name: 'return res',
            value: `return {
            ${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}:entity.${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key},
            date_add:entity.date_add,
            date_update:entity.date_update,
            ${Object.keys(this.getConfig().repository.columns).map((key) => {
                return `${key}:entity.${key},`;
            }).join('\n')}
            }`,
        });
        this.setReturnType(this.gmModuleDto.getPropertyName());
    }
}
class Api {
    constructor(serviceVarName, createDtoToEntityMethod, updateDtoToEntityMethod, entityToDtoMethod) {
        this.serviceVarName = serviceVarName;
        this.createDtoToEntityMethod = createDtoToEntityMethod;
        this.updateDtoToEntityMethod = updateDtoToEntityMethod;
        this.entityToDtoMethod = entityToDtoMethod;
    }
    createDtoToEntity() {
        return `${this.serviceVarName}.${this.createDtoToEntityMethod.renderMethodCall()}`;
    }
    updateDtoToEntity() {
        return `${this.serviceVarName}.${this.updateDtoToEntityMethod.renderMethodCall()}`;
    }
    entityToDto() {
        return `${this.serviceVarName}.${this.entityToDtoMethod.renderMethodCall()}`;
    }
}
class GmModuleMapper extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    constructor(config, callVarNames) {
        super(config);
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Mapper`;
    }
    getDirName() {
        return 'mapper';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
    init() {
        this.addMethod(new CreateDtoToEntity(this.getConfig(), this.callVarNames.createDto));
        this.addMethod(new UpdateDtoToEntity(this.getConfig(), this.callVarNames.updateDto));
        this.addMethod(new EntityDtoToDto(this.getConfig(), this.callVarNames.entity));
        this.api = new Api(this.getPropertyName(), this.getMethodByIndex(0), this.getMethodByIndex(1), this.getMethodByIndex(2));
    }
}
exports.GmModuleMapper = GmModuleMapper;
//# sourceMappingURL=GmModuleMapper.js.map