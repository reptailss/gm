"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerClassGetAllBySqlStaticDb = exports.GmModuleControllerClassGetBySqlStaticDb = exports.GmModuleControllerClassDeleteBySqlStaticDb = exports.GmModuleControllerClassUpdateBySqlStaticDb = exports.GmModuleControllerClassCreateBySqlStaticDb = exports.GmModuleControllerClassCrudBySqlStaticDb = void 0;
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmCrudConfigChecker_1 = require("../../../../../crudConfig/GmCrudConfigChecker");
const GmAccessStructureMethodProcessor_1 = require("../../../../structure/GmAccessStructureMethodProcessor");
const GmModuleValidator_1 = require("../../../../validator/GmModuleValidator");
const GmModuleAbstractControllerClass_1 = require("../../abstract/GmModuleAbstractControllerClass");
const byStaticDb_1 = require("../../../../services/classes/sql/byStaticDb");
const GmModuleUpdateDto_1 = require("../../../../dto/GmModuleUpdateDto");
const GmModuleControllerMethodCreate_1 = require("../../../methods/GmModuleControllerMethodCreate");
const GmModuleControllerMethodUpdate_1 = require("../../../methods/GmModuleControllerMethodUpdate");
const GmModuleControllerMethodDelete_1 = require("../../../methods/GmModuleControllerMethodDelete");
const GmModuleControllerMethodGetById_1 = require("../../../methods/GmModuleControllerMethodGetById");
const GmModuleControllerMethodGetPagination_1 = require("../../../methods/GmModuleControllerMethodGetPagination");
const GmBodyParamDec_1 = require("../../../../../decorators/controllerDecorators/GmBodyParamDec");
const GmQueryParamDec_1 = require("../../../../../decorators/controllerDecorators/GmQueryParamDec");
class GmGetVarNamesByStaticDb {
    constructor(config) {
        this.config = config;
    }
    userDto() {
        return 'userDto';
    }
    add() {
        const createBody = 'body';
        return {
            openUserId: `${this.userDto()}.open_user_id`,
            createBody,
            createBodySchema: `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Schema`,
            legalEntityId: 'legalEntityId',
        };
    }
    update() {
        const updateBody = 'body';
        return {
            updateBody,
            updateBodySchema: `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Schema`,
            id: 'id',
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    delete() {
        return {
            id: 'id',
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    get() {
        return {
            id: 'id',
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    list() {
        return {
            params: 'params',
            paramsSchema: `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.config.dtoName.plural)}PaginationParamsSchema`,
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
}
class GmAccessStructureMethodProcessorByStaticDb extends GmAccessStructureMethodProcessor_1.GmAccessStructureMethodProcessor {
    constructor(config) {
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        super(config, {
            add: {
                openUserId: gmGetVarNames.add().openUserId,
                legalEntityId: gmGetVarNames.add().legalEntityId,
            },
            update: {
                openUserId: gmGetVarNames.update().openUserId,
                legalEntityId: gmGetVarNames.update().legalEntityId,
            },
            delete: {
                openUserId: gmGetVarNames.delete().openUserId,
                legalEntityId: gmGetVarNames.delete().legalEntityId,
            },
            get: {
                openUserId: gmGetVarNames.get().openUserId,
                legalEntityId: gmGetVarNames.get().legalEntityId,
            },
            list: {
                openUserId: gmGetVarNames.list().openUserId,
                legalEntityId: gmGetVarNames.list().legalEntityId,
            },
        });
    }
    add(method) {
        super.add(method);
        method.appendPropDecorator({
            decorator: new GmBodyParamDec_1.GmBodyParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        });
    }
    update(method) {
        super.update(method);
        method.appendPropDecorator({
            decorator: new GmBodyParamDec_1.GmBodyParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        });
    }
    delete(method) {
        super.delete(method);
        method.appendPropDecorator({
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        });
    }
    get(method) {
        super.get(method);
        method.appendPropDecorator({
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        });
    }
    list(method) {
        super.list(method);
        method.appendPropDecorator({
            decorator: new GmQueryParamDec_1.GmQueryParamNumDec('legal_entity_id'),
            type: 'number',
            varName: 'legalEntityId',
        });
    }
}
class GmValidatorBuilderByStaticDb {
    constructor(config, validator) {
        this.config = config;
        this.validator = validator;
        this.gmGetVarNames = new GmGetVarNamesByStaticDb(config);
    }
    add() {
        return `const ${this.gmGetVarNames.add().createBodySchema} = ${this.validator.api.getCreateDtoSchema()}`;
    }
    update() {
        return `const ${this.gmGetVarNames.update().updateBodySchema} = ${this.validator.api.getUpdateDtoSchema()}`;
    }
    list() {
        return `const ${this.gmGetVarNames.list().paramsSchema} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}`;
    }
}
class GmModuleControllerClassCrudBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.validator);
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.serviceCrud = new byStaticDb_1.GmModuleServiceClassCrudBySqlStaticDb(config, `this.${this.getServiceVarName()}`, {
            create: {
                createDto: gmGetVarNames.add().createBody,
                initiatorOpenUserId: gmGetVarNames.add().openUserId,
            },
            update: {
                id: gmGetVarNames.update().id,
                updateDto: gmGetVarNames.update().updateBody,
                initiatorOpenUserId: gmGetVarNames.update().openUserId,
            },
            delete: {
                id: gmGetVarNames.delete().id,
                initiatorOpenUserId: gmGetVarNames.delete().openUserId,
            },
            getById: {
                id: gmGetVarNames.get().id,
            },
            getPagination: {
                params: gmGetVarNames.list().params,
            },
        });
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config);
        this.gmGetVarNames = gmGetVarNames;
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            userDto: this.gmGetVarNames.userDto(),
            createDtoSchema: this.gmGetVarNames.add().createBodySchema,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByStaticDb.add(methodCreate);
        }
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: this.gmGetVarNames.update().updateBody,
            userDto: this.gmGetVarNames.userDto(),
            updateDtoSchema: this.gmGetVarNames.update().updateBodySchema,
            id: this.gmGetVarNames.update().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByStaticDb.update(methodUpdate);
        }
        const methodDelete = new GmModuleControllerMethodDelete_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userDto: this.gmGetVarNames.userDto(),
            id: this.gmGetVarNames.delete().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByStaticDb.delete(methodDelete);
        }
        const methodGetById = new GmModuleControllerMethodGetById_1.GmModuleControllerMethodGetById(this.getConfig(), this.serviceCrud.api, {
            userDto: this.gmGetVarNames.userDto(),
            id: this.gmGetVarNames.get().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByStaticDb.get(methodGetById);
        }
        const methodPagination = new GmModuleControllerMethodGetPagination_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: this.gmGetVarNames.list().params,
            userDto: this.gmGetVarNames.userDto(),
            paramsSchema: this.gmGetVarNames.list().paramsSchema,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByStaticDb.list(methodPagination);
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
            ${this.gmValidatorBuilder.add()}
            
            ${this.gmValidatorBuilder.update()}
            
            ${this.gmValidatorBuilder.list()}
        `);
    }
    getServiceVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCrudBySqlStaticDb = GmModuleControllerClassCrudBySqlStaticDb;
class GmModuleControllerClassCreateBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.validator);
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.serviceCrud = new byStaticDb_1.GmModuleServiceClassCreateBySqlStaticDb(config, `this.${this.getServiceVarName()}`, {
            createDto: gmGetVarNames.add().createBody,
            initiatorOpenUserId: gmGetVarNames.add().openUserId,
        });
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config);
        this.gmGetVarNames = gmGetVarNames;
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            userDto: this.gmGetVarNames.userDto(),
            createDtoSchema: this.gmGetVarNames.add().createBodySchema,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByStaticDb.add(methodCreate);
        }
        this.addMethod(methodCreate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        });
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.add()}
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getServiceVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCreateBySqlStaticDb = GmModuleControllerClassCreateBySqlStaticDb;
class GmModuleControllerClassUpdateBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.validator);
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.serviceCrud = new byStaticDb_1.GmModuleServiceClassUpdateBySqlStaticDb(config, `this.${this.getServiceVarName()}`, {
            id: gmGetVarNames.update().id,
            updateDto: gmGetVarNames.update().updateBody,
            initiatorOpenUserId: gmGetVarNames.update().openUserId,
        });
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config);
        this.gmGetVarNames = gmGetVarNames;
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: this.gmGetVarNames.update().updateBody,
            userDto: this.gmGetVarNames.userDto(),
            updateDtoSchema: this.gmGetVarNames.update().updateBodySchema,
            id: this.gmGetVarNames.update().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByStaticDb.update(methodUpdate);
            this.addModule(this.gmModuleUpdateDto);
        }
        this.addMethod(methodUpdate);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        });
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.update()}
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getServiceVarName() {
        return `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassUpdateBySqlStaticDb = GmModuleControllerClassUpdateBySqlStaticDb;
class GmModuleControllerClassDeleteBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Delete${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.serviceCrud = new byStaticDb_1.GmModuleServiceClassDeleteBySqlStaticDb(config, `this.${this.getServiceVarName()}`, {
            id: gmGetVarNames.delete().id,
            initiatorOpenUserId: gmGetVarNames.delete().openUserId,
        });
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config);
        this.gmGetVarNames = gmGetVarNames;
    }
    init() {
        super.init();
        this.addModule(this.serviceCrud);
        const methodDelete = new GmModuleControllerMethodDelete_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userDto: this.gmGetVarNames.userDto(),
            id: this.gmGetVarNames.delete().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByStaticDb.delete(methodDelete);
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
exports.GmModuleControllerClassDeleteBySqlStaticDb = GmModuleControllerClassDeleteBySqlStaticDb;
class GmModuleControllerClassGetBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.serviceCrud = new byStaticDb_1.GmModuleServiceClassGetBySqlStaticDb(config, `this.${this.getServiceVarName()}`, {
            id: gmGetVarNames.get().id,
        });
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config);
        this.gmGetVarNames = gmGetVarNames;
    }
    init() {
        super.init();
        this.addModule(this.serviceCrud);
        const methodGetById = new GmModuleControllerMethodGetById_1.GmModuleControllerMethodGetById(this.getConfig(), this.serviceCrud.api, {
            userDto: this.gmGetVarNames.userDto(),
            id: this.gmGetVarNames.get().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByStaticDb.get(methodGetById);
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
exports.GmModuleControllerClassGetBySqlStaticDb = GmModuleControllerClassGetBySqlStaticDb;
class GmModuleControllerClassGetAllBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `GetAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.validator);
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.serviceCrud = new byStaticDb_1.GmModuleServiceClassGetAllBySqlStaticDb(config, `this.${this.getServiceVarName()}`, {
            params: gmGetVarNames.list().params,
        });
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config);
        this.gmGetVarNames = gmGetVarNames;
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        const methodPagination = new GmModuleControllerMethodGetPagination_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: this.gmGetVarNames.list().params,
            userDto: this.gmGetVarNames.userDto(),
            paramsSchema: this.gmGetVarNames.list().paramsSchema,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByStaticDb.list(methodPagination);
        }
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        });
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.list()}
        `);
    }
    getServiceVarName() {
        return `getAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassGetAllBySqlStaticDb = GmModuleControllerClassGetAllBySqlStaticDb;
//# sourceMappingURL=index.js.map