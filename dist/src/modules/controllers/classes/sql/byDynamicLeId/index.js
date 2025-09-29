"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerClassGetAllBySqlDynamicLeId = exports.GmModuleControllerClassGetBySqlDynamicLeId = exports.GmModuleControllerClassDeleteBySqlDynamicLeId = exports.GmModuleControllerClassUpdateBySqlDynamicLeId = exports.GmModuleControllerClassCreateBySqlDynamicLeId = exports.GmModuleControllerClassCrudBySqlDynamicLeId = void 0;
const GmAccessStructureMethodProcessor_1 = require("../../../../structure/GmAccessStructureMethodProcessor");
const GmModuleAbstractControllerClass_1 = require("../../abstract/GmModuleAbstractControllerClass");
const GmModuleValidator_1 = require("../../../../validator/GmModuleValidator");
const byDynamicLeId_1 = require("../../../../services/classes/sql/byDynamicLeId");
const GmModuleCreateDto_1 = require("../../../../dto/GmModuleCreateDto");
const GmModuleUpdateDto_1 = require("../../../../dto/GmModuleUpdateDto");
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmModuleControllerMethodCreate_1 = require("../../../methods/GmModuleControllerMethodCreate");
const GmCrudConfigChecker_1 = require("../../../../../crudConfig/GmCrudConfigChecker");
const GmModuleControllerMethodUpdate_1 = require("../../../methods/GmModuleControllerMethodUpdate");
const GmModuleControllerMethodDelete_1 = require("../../../methods/GmModuleControllerMethodDelete");
const GmQueryParamDec_1 = require("../../../../../decorators/controllerDecorators/GmQueryParamDec");
const GmModuleControllerMethodGetById_1 = require("../../../methods/GmModuleControllerMethodGetById");
const GmModuleControllerMethodGetPagination_1 = require("../../../methods/GmModuleControllerMethodGetPagination");
const GmBodyParamDec_1 = require("../../../../../decorators/controllerDecorators/GmBodyParamDec");
const CREATE_VAR_NAMES = {
    body: 'body',
    createDtoSchema: 'createDtoSchema',
    userDto: 'userDto',
    legalEntityId: 'legalEntityId',
};
const UPDATE_VAR_NAMES = {
    body: 'body',
    updateDtoSchema: 'createDtoSchema',
    userDto: 'userDto',
    id: 'id',
    legalEntityId: 'legalEntityId',
};
const DELETE_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userDto: 'userDto',
    id: 'id',
};
const GET_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    userDto: 'userDto',
    id: 'id',
};
const GET_ALL_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    params: 'params',
    userDto: 'userDto',
};
class GmAccessStructureMethodProcessorByDynamicLeId extends GmAccessStructureMethodProcessor_1.GmAccessStructureMethodProcessor {
    constructor(config) {
        const hasLeIdColumn = 'legal_entity_id' in config.repository.columns;
        super(config, {
            add: {
                openUserId: `${CREATE_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: hasLeIdColumn ? `${CREATE_VAR_NAMES.body}.legal_entity_id` : CREATE_VAR_NAMES.legalEntityId,
            },
            update: {
                openUserId: `${UPDATE_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: hasLeIdColumn ? `${UPDATE_VAR_NAMES.body}.legal_entity_id` : UPDATE_VAR_NAMES.legalEntityId,
            },
            delete: {
                openUserId: `${DELETE_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
            },
            get: {
                openUserId: `${GET_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: GET_VAR_NAMES.legalEntityId,
            },
            list: {
                openUserId: `${GET_ALL_VAR_NAMES.userDto}.open_user_id`,
                legalEntityId: GET_ALL_VAR_NAMES.legalEntityId,
            },
        });
    }
}
class GmModuleControllerClassCrudBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns;
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassCrudBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            create: {
                legalEntityId: hasLeIdColumn ? `${CREATE_VAR_NAMES.body}.legal_entity_id` : CREATE_VAR_NAMES.legalEntityId,
                createDto: CREATE_VAR_NAMES.body,
                initiatorOpenUserId: `${CREATE_VAR_NAMES.userDto}.open_user_id`,
            },
            update: {
                legalEntityId: hasLeIdColumn ? `${UPDATE_VAR_NAMES.body}.legal_entity_id` : UPDATE_VAR_NAMES.legalEntityId,
                id: UPDATE_VAR_NAMES.id,
                updateDto: UPDATE_VAR_NAMES.body,
                initiatorOpenUserId: `${UPDATE_VAR_NAMES.userDto}.open_user_id`,
            },
            delete: {
                legalEntityId: DELETE_VAR_NAMES.legalEntityId,
                id: DELETE_VAR_NAMES.id,
                initiatorOpenUserId: `${DELETE_VAR_NAMES.userDto}.open_user_id`,
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
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addModule(this.gmModuleCreateDto);
        this.addModule(this.gmModuleUpdateDto);
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns;
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: CREATE_VAR_NAMES.body,
            userDto: CREATE_VAR_NAMES.userDto,
            createDtoSchema: this.getValidatorCreateBodyVarName(),
        });
        if (!hasLeIdColumn) {
            methodCreate.addProp({
                type: 'number',
                varName: CREATE_VAR_NAMES.legalEntityId,
                callVarName: CREATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamDec_1.GmBodyParamNumDec('legal_entity_id'),
            });
        }
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate);
        }
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: UPDATE_VAR_NAMES.body,
            userDto: UPDATE_VAR_NAMES.userDto,
            updateDtoSchema: this.getValidatorUpdateBodyVarName(),
            id: UPDATE_VAR_NAMES.id,
        });
        if (!hasLeIdColumn) {
            methodUpdate.addProp({
                type: 'number',
                varName: UPDATE_VAR_NAMES.legalEntityId,
                callVarName: UPDATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamDec_1.GmBodyParamNumDec('legal_entity_id'),
            });
        }
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate);
        }
        const methodDelete = new GmModuleControllerMethodDelete_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userDto: DELETE_VAR_NAMES.userDto,
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
            userDto: GET_VAR_NAMES.userDto,
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
            userDto: GET_ALL_VAR_NAMES.userDto,
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
            defaultValue: null,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorCreateBodyVarName()} = ${this.validator.api.getCreateDtoSchema()}
             
            const ${this.getValidatorUpdateBodyVarName()} = ${this.validator.api.getUpdateDtoSchema()}
             
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `);
    }
    getValidatorCreateBodyVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`;
    }
    getValidatorUpdateBodyVarName() {
        return `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`;
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
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns;
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassCreateBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${CREATE_VAR_NAMES.userDto}.open_user_id`,
            createDto: CREATE_VAR_NAMES.body,
            legalEntityId: hasLeIdColumn ? `${CREATE_VAR_NAMES.body}.legal_entity_id` : CREATE_VAR_NAMES.legalEntityId,
        });
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addModule(this.gmModuleCreateDto);
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns;
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: CREATE_VAR_NAMES.body,
            userDto: CREATE_VAR_NAMES.userDto,
            createDtoSchema: this.getValidatorCreateBodyVarName(),
        });
        if (!hasLeIdColumn) {
            methodCreate.addProp({
                type: 'number',
                varName: CREATE_VAR_NAMES.legalEntityId,
                callVarName: CREATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamDec_1.GmBodyParamNumDec('legal_entity_id'),
            });
        }
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.add(methodCreate);
        }
        this.addMethod(methodCreate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorCreateBodyVarName()} = ${this.validator.api.getCreateDtoSchema()}
        `);
    }
    getValidatorCreateBodyVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`;
    }
    getServiceVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCreateBySqlDynamicLeId = GmModuleControllerClassCreateBySqlDynamicLeId;
class GmModuleControllerClassUpdateBySqlDynamicLeId extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns;
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.serviceCrud = new byDynamicLeId_1.GmModuleServiceClassUpdateBySqlDynamicLeId(config, `this.${this.getServiceVarName()}`, {
            initiatorOpenUserId: `${UPDATE_VAR_NAMES.userDto}.open_user_id`,
            updateDto: UPDATE_VAR_NAMES.body,
            legalEntityId: hasLeIdColumn ? `${UPDATE_VAR_NAMES.body}.legal_entity_id` : UPDATE_VAR_NAMES.legalEntityId,
            id: UPDATE_VAR_NAMES.id,
        });
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addModule(this.gmModuleUpdateDto);
        const hasLeIdColumn = 'legal_entity_id' in this.getConfig().repository.columns;
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: UPDATE_VAR_NAMES.body,
            userDto: UPDATE_VAR_NAMES.userDto,
            updateDtoSchema: this.getValidatorUpdateBodyVarName(),
            id: UPDATE_VAR_NAMES.id,
        });
        if (!hasLeIdColumn) {
            methodUpdate.addProp({
                type: 'number',
                varName: UPDATE_VAR_NAMES.legalEntityId,
                callVarName: UPDATE_VAR_NAMES.legalEntityId,
                decorator: new GmBodyParamDec_1.GmBodyParamNumDec('legal_entity_id'),
            });
        }
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByDynamicLeId.update(methodUpdate);
        }
        this.addMethod(methodUpdate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorUpdateBodyVarName()} = ${this.validator.api.getUpdateDtoSchema()}
        `);
    }
    getValidatorUpdateBodyVarName() {
        return `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Schema`;
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
            initiatorOpenUserId: `${DELETE_VAR_NAMES.userDto}.open_user_id`,
            legalEntityId: DELETE_VAR_NAMES.legalEntityId,
            id: DELETE_VAR_NAMES.id,
        });
        this.gmAccessStructureMethodProcessorByDynamicLeId = new GmAccessStructureMethodProcessorByDynamicLeId(config);
    }
    init() {
        super.init();
        this.addModule(this.serviceCrud);
        const methodDelete = new GmModuleControllerMethodDelete_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userDto: DELETE_VAR_NAMES.userDto,
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
            defaultValue: null,
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
            userDto: GET_VAR_NAMES.userDto,
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
            defaultValue: null,
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
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
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
            userDto: GET_ALL_VAR_NAMES.userDto,
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
            defaultValue: null,
        });
        this.addElementBeforeClass(`
            const ${this.getValidatorParamsDtoVarName()} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}
        `);
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