"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerClassGetAllBySqlDynamicLeId = exports.GmModuleControllerClassGetBySqlDynamicLeId = exports.GmModuleControllerClassDeleteBySqlDynamicLeId = exports.GmModuleControllerClassUpdateBySqlDynamicLeId = exports.GmModuleControllerClassCreateBySqlDynamicLeId = exports.GmModuleControllerClassCrudBySqlDynamicLeId = void 0;
const GmAccessStructureMethodProcessor_1 = require("../../../../structure/GmAccessStructureMethodProcessor");
const GmModuleAbstractControllerClass_1 = require("../../abstract/GmModuleAbstractControllerClass");
const GmModuleValidator_1 = require("../../../../validator/GmModuleValidator");
const byDynamicLeId_1 = require("../../../../services/classes/sql/byDynamicLeId");
const GmModuleCreateDto_1 = require("../../../../dto/GmModuleCreateDto");
const GmServiceSchemaValidatorType_1 = require("../../../../../services/schemaValidator/GmServiceSchemaValidatorType");
const GmServiceValidator_1 = require("../../../../../services/validator/GmServiceValidator");
const GmModuleUpdateDto_1 = require("../../../../dto/GmModuleUpdateDto");
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmModuleControllerMethodCreate_1 = require("../../../methods/GmModuleControllerMethodCreate");
const GmCrudConfigChecker_1 = require("../../../../../crudConfig/GmCrudConfigChecker");
const GmModuleControllerMethodUpdate_1 = require("../../../methods/GmModuleControllerMethodUpdate");
const GmModuleControllerMethodDelete_1 = require("../../../methods/GmModuleControllerMethodDelete");
const GmQueryParamDec_1 = require("../../../../../decorators/controllerDecorators/GmQueryParamDec");
const GmModuleControllerMethodGetById_1 = require("../../../methods/GmModuleControllerMethodGetById");
const GmModuleControllerMethodGetPagination_1 = require("../../../methods/GmModuleControllerMethodGetPagination");
const CREATE_VAR_NAMES = {
    body: 'body',
    createDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
};
const UPDATE_VAR_NAMES = {
    body: 'body',
    updateDtoSchema: 'createDtoSchema',
    userInfo: 'userInfo',
    id: 'id',
};
const DELETE_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userInfo: 'userInfo',
    id: 'id',
};
const GET_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userInfo: 'userInfo',
    id: 'id',
};
const GET_ALL_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    params: 'params',
    userInfo: 'userInfo',
};
class GmAccessStructureMethodProcessorByDynamicLeId extends GmAccessStructureMethodProcessor_1.GmAccessStructureMethodProcessor {
    constructor(config) {
        super(config, {
            add: {
                openUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: `${CREATE_VAR_NAMES.body}.legal_entity_id`,
            },
            update: {
                openUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: `${UPDATE_VAR_NAMES.body}.legal_entity_id`,
            },
            delete: {
                openUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
            },
            get: {
                openUserId: `${GET_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: GET_VAR_NAMES.legalEntityId,
            },
            list: {
                openUserId: `${GET_ALL_VAR_NAMES.userInfo}.open_user_id`,
                legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
            },
        });
    }
}
class GmModuleControllerClassCrudBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassCrudBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            create: {
                legalEntityId: `${CREATE_VAR_NAMES.body}.legal_entity_id`,
                createDto: CREATE_VAR_NAMES.body,
                initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
            },
            update: {
                legalEntityId: `${UPDATE_VAR_NAMES.body}.legal_entity_id`,
                id: UPDATE_VAR_NAMES.id,
                updateDto: UPDATE_VAR_NAMES.body,
                initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
            },
            delete: {
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
                id: DELETE_VAR_NAMES.id,
                initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
            },
            getById: {
                legalEntityId: GET_VAR_NAMES.legalEntityId,
                id: GET_VAR_NAMES.id,
            },
            getPagination: {
                legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
                params: GET_ALL_VAR_NAMES.params,
            },
        });
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType();
        this.gmServiceValidator = new GmServiceValidator_1.GmServiceValidator();
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addModule(this.gmModuleCreateDto);
        this.addModule(this.gmModuleUpdateDto);
        this.addService(this.gmServiceSchemaValidatorType);
        this.addService(this.gmServiceValidator);
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: CREATE_VAR_NAMES.body,
            userInfo: CREATE_VAR_NAMES.userInfo,
            createDtoSchema: this.getValidatorCreateBodyVarName(),
            createDtoType: this.getValidatorCreateBodyTypeVarName(),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate);
        }
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: UPDATE_VAR_NAMES.body,
            userInfo: UPDATE_VAR_NAMES.userInfo,
            updateDtoSchema: this.getValidatorUpdateBodyVarName(),
            updateDtoType: this.getValidatorUpdateBodyTypeVarName(),
            id: UPDATE_VAR_NAMES.id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate);
        }
        const methodDelete = new GmModuleControllerMethodDelete_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userInfo: DELETE_VAR_NAMES.userInfo,
            id: DELETE_VAR_NAMES.id,
        }).addProp({
            varName: DELETE_VAR_NAMES.legalEntityId,
            callVarName: DELETE_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.delete(methodDelete);
        }
        const methodGetById = new GmModuleControllerMethodGetById_1.GmModuleControllerMethodGetById(this.getConfig(), this.serviceCrud.api, {
            userInfo: GET_VAR_NAMES.userInfo,
            id: GET_VAR_NAMES.id,
        }).addProp({
            varName: GET_VAR_NAMES.legalEntityId,
            callVarName: GET_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.get(methodGetById);
        }
        const methodPagination = new GmModuleControllerMethodGetPagination_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: GET_ALL_VAR_NAMES.params,
            userInfo: GET_ALL_VAR_NAMES.userInfo,
            paramsSchema: this.getValidatorParamsDtoVarName(),
        }).addProp({
            varName: GET_ALL_VAR_NAMES.legalEntityId,
            callVarName: GET_ALL_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.list(methodPagination);
        }
        this.addMethod(methodCreate);
        this.addMethod(methodUpdate);
        this.addMethod(methodDelete);
        this.addMethod(methodGetById);
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            type ${this.getValidatorCreateBodyTypeVarName()} = ${this.gmModuleCreateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            type ${this.getValidatorUpdateBodyTypeVarName()} = ${this.gmModuleUpdateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
            
            const ${this.getValidatorCreateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorCreateBodyTypeVarName())} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
             
            const ${this.getValidatorUpdateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorUpdateBodyTypeVarName())} = ${this.validator.api.getUpdateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
             
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorCreateBodyVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`;
    }
    getValidatorCreateBodyTypeVarName() {
        return `Create${this.getConfig().dtoName.singular}Body`;
    }
    getValidatorUpdateBodyVarName() {
        return `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`;
    }
    getValidatorUpdateBodyTypeVarName() {
        return `Update${this.getConfig().dtoName.singular}Body`;
    }
    getValidatorParamsDtoVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`;
    }
    getServiceVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCrudBySqlDynamicLeId = GmModuleControllerClassCrudBySqlDynamicLeId;
class GmModuleControllerClassCreateBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassCreateBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${CREATE_VAR_NAMES.userInfo}.open_user_id`,
            createDto: CREATE_VAR_NAMES.body,
            legalEntityId: `${CREATE_VAR_NAMES.body}.legal_entity_id`,
        });
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType();
        this.gmServiceValidator = new GmServiceValidator_1.GmServiceValidator();
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addModule(this.gmModuleCreateDto);
        this.addService(this.gmServiceSchemaValidatorType);
        this.addService(this.gmServiceValidator);
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: CREATE_VAR_NAMES.body,
            userInfo: CREATE_VAR_NAMES.userInfo,
            createDtoSchema: this.getValidatorCreateBodyVarName(),
            createDtoType: this.getValidatorCreateBodyTypeVarName(),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate);
        }
        this.addMethod(methodCreate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `);
        this.addElementBeforeClass(`
            type ${this.getValidatorCreateBodyTypeVarName()} = ${this.gmModuleCreateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            const ${this.getValidatorCreateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorCreateBodyTypeVarName())} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorCreateBodyVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`;
    }
    getValidatorCreateBodyTypeVarName() {
        return `Create${this.getConfig().dtoName.singular}Body`;
    }
    getServiceVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCreateBySqlDynamicLeId = GmModuleControllerClassCreateBySqlDynamicLeId;
class GmModuleControllerClassUpdateBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassUpdateBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${UPDATE_VAR_NAMES.userInfo}.open_user_id`,
            updateDto: UPDATE_VAR_NAMES.body,
            legalEntityId: `${UPDATE_VAR_NAMES.body}.legal_entity_id`,
            id: UPDATE_VAR_NAMES.id,
        });
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType();
        this.gmServiceValidator = new GmServiceValidator_1.GmServiceValidator();
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addModule(this.gmModuleUpdateDto);
        this.addService(this.gmServiceSchemaValidatorType);
        this.addService(this.gmServiceValidator);
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: UPDATE_VAR_NAMES.body,
            userInfo: UPDATE_VAR_NAMES.userInfo,
            updateDtoSchema: this.getValidatorUpdateBodyVarName(),
            updateDtoType: this.getValidatorUpdateBodyTypeVarName(),
            id: UPDATE_VAR_NAMES.id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate);
        }
        this.addMethod(methodUpdate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `);
        this.addElementBeforeClass(`
            type ${this.getValidatorUpdateBodyTypeVarName()} = ${this.gmModuleUpdateDto.getPropertyName()} & {
                legal_entity_id:number
            }
            const ${this.getValidatorUpdateBodyVarName()}:${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.getValidatorUpdateBodyTypeVarName())} = ${this.validator.api.getUpdateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorUpdateBodyVarName() {
        return `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}BodySchema`;
    }
    getValidatorUpdateBodyTypeVarName() {
        return `Update${this.getConfig().dtoName.singular}Body`;
    }
    getServiceVarName() {
        return `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassUpdateBySqlDynamicLeId = GmModuleControllerClassUpdateBySqlDynamicLeId;
class GmModuleControllerClassDeleteBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Delete${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassDeleteBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${DELETE_VAR_NAMES.userInfo}.open_user_id`,
            legalEntityId: DELETE_VAR_NAMES.legalEntityId,
            id: DELETE_VAR_NAMES.id,
        });
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.serviceCrud);
        const methodDelete = new GmModuleControllerMethodDelete_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userInfo: DELETE_VAR_NAMES.userInfo,
            id: DELETE_VAR_NAMES.id,
        }).addProp({
            varName: DELETE_VAR_NAMES.legalEntityId,
            callVarName: DELETE_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.delete(methodDelete);
        }
        this.addMethod(methodDelete);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
    }
    getServiceVarName() {
        return `delete${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassDeleteBySqlDynamicLeId = GmModuleControllerClassDeleteBySqlDynamicLeId;
class GmModuleControllerClassGetBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassGetBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            legalEntityId: GET_VAR_NAMES.legalEntityId,
            id: GET_VAR_NAMES.id,
        });
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.serviceCrud);
        const methodGetById = new GmModuleControllerMethodGetById_1.GmModuleControllerMethodGetById(this.getConfig(), this.serviceCrud.api, {
            userInfo: GET_VAR_NAMES.userInfo,
            id: GET_VAR_NAMES.id,
        }).addProp({
            varName: GET_VAR_NAMES.legalEntityId,
            callVarName: GET_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.get(methodGetById);
        }
        this.addMethod(methodGetById);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
    }
    getServiceVarName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassGetBySqlDynamicLeId = GmModuleControllerClassGetBySqlDynamicLeId;
class GmModuleControllerClassGetAllBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `GetAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassGetAllBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            params: GET_ALL_VAR_NAMES.params,
            legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
        });
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodPagination = new GmModuleControllerMethodGetPagination_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: GET_ALL_VAR_NAMES.params,
            userInfo: GET_ALL_VAR_NAMES.userInfo,
            paramsSchema: this.getValidatorParamsDtoVarName(),
        }).addProp({
            varName: GET_ALL_VAR_NAMES.legalEntityId,
            callVarName: GET_ALL_VAR_NAMES.legalEntityId,
            type: 'number',
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.list(methodPagination);
        }
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorVarName()} = new ${this.validator.getPropertyName()}()
        `);
        this.addElementBeforeClass(`
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getValidatorParamsDtoVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}DtoPaginationQueryParamsSchema`;
    }
    getServiceVarName() {
        return `getAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassGetAllBySqlDynamicLeId = GmModuleControllerClassGetAllBySqlDynamicLeId;
//# sourceMappingURL=index.js.map