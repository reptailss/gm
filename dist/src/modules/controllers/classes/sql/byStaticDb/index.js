"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerClassGetAllBySqlStaticDb = exports.GmModuleControllerClassGetBySqlStaticDb = exports.GmModuleControllerClassDeleteBySqlStaticDb = exports.GmModuleControllerClassUpdateBySqlStaticDb = exports.GmModuleControllerClassCreateBySqlStaticDb = exports.GmModuleControllerClassCrudBySqlStaticDb = void 0;
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmCrudConfigChecker_1 = require("../../../../../crudConfig/GmCrudConfigChecker");
const GmAccessStructureMethodProcessor_1 = require("../../../../structure/GmAccessStructureMethodProcessor");
const GmQueryParamDec_1 = require("../../../../../decorators/controllerDecorators/GmQueryParamDec");
const GmServiceValidator_1 = require("../../../../../services/validator/GmServiceValidator");
const GmServiceSchemaValidatorType_1 = require("../../../../../services/schemaValidator/GmServiceSchemaValidatorType");
const GmModuleValidator_1 = require("../../../../validator/GmModuleValidator");
const GmModuleAbstractControllerClass_1 = require("../../abstract/GmModuleAbstractControllerClass");
const byStaticDb_1 = require("../../../../services/classes/sql/byStaticDb");
const GmModuleCreateDto_1 = require("../../../../dto/GmModuleCreateDto");
const GmModuleUpdateDto_1 = require("../../../../dto/GmModuleUpdateDto");
const GmModuleControllerMethodCreate_1 = require("../../../methods/GmModuleControllerMethodCreate");
const GmModuleControllerMethodUpdate_1 = require("../../../methods/GmModuleControllerMethodUpdate");
const GmModuleControllerMethodDelete_1 = require("../../../methods/GmModuleControllerMethodDelete");
const GmModuleControllerMethodGetById_1 = require("../../../methods/GmModuleControllerMethodGetById");
const GmModuleControllerMethodGetPagination_1 = require("../../../methods/GmModuleControllerMethodGetPagination");
class GmGetVarNamesByStaticDb {
    constructor(config) {
        this.config = config;
    }
    userInfo() {
        return 'userInfo';
    }
    add() {
        const createBody = 'body';
        return {
            openUserId: `${this.userInfo()}.open_user_id`,
            createBody,
            createBodySchema: `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            legalEntityId: `${createBody}.legal_entity_id`,
            createBodyType: !GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.config, 'add') ||
                GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.config, 'add') && this.checkHasLeIdColumn()
                ? undefined : `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body`,
        };
    }
    update() {
        const updateBody = 'body';
        return {
            updateBody,
            updateBodySchema: `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}BodySchema`,
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: `${updateBody}.legal_entity_id`,
            updateBodyType: GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.config, 'update') ? `Update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.config.dtoName.singular)}Body` : undefined,
        };
    }
    delete() {
        return {
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    get() {
        return {
            id: 'id',
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    list() {
        return {
            params: 'params',
            paramsSchema: `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.config.dtoName.singular)}DtoPaginationQueryParamsSchema`,
            openUserId: `${this.userInfo()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
    checkHasLeIdColumn() {
        return 'legal_entity_id' in this.config.repository.columns &&
            (this.config.repository.columns.legal_entity_id.type === 'INTEGER' ||
                this.config.repository.columns.legal_entity_id.type === 'BIGINT');
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
    constructor(config, validatorVarName, validator) {
        this.config = config;
        this.validatorVarName = validatorVarName;
        this.validator = validator;
        this.gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.gmServiceValidator = new GmServiceValidator_1.GmServiceValidator();
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType();
    }
    initValidator() {
        return `const ${this.validatorVarName} = new ${this.validator.getPropertyName()}()`;
    }
    add() {
        const schemaTypeStr = this.gmGetVarNames.add().createBodyType ? ` :${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmGetVarNames.add().createBodyType || '')}` : '';
        if (!GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.config, 'add')) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`;
        }
        if (this.gmGetVarNames.checkHasLeIdColumn()) {
            return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}`;
        }
        return `const ${this.gmGetVarNames.add().createBodySchema}${schemaTypeStr} = ${this.validator.api.getCreateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})`;
    }
    update() {
        const schemaTypeStr = this.gmGetVarNames.update().updateBodyType ? ` :${this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmGetVarNames.update().updateBodyType || '')}` : '';
        if (!GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.config, 'update')) {
            return `const ${this.gmGetVarNames.update().updateBodySchema}${schemaTypeStr} = ${this.validator.api.getUpdateDtoSchema()}`;
        }
        return `const ${this.gmGetVarNames.update().updateBodySchema}${schemaTypeStr} = ${this.validator.api.getUpdateDtoSchema()}.merge(${this.gmServiceValidator.object({
            legal_entity_id: this.gmServiceValidator.number(),
        })})`;
    }
    list() {
        return `const ${this.gmGetVarNames.list().paramsSchema} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}`;
    }
    checkHasAddValidatorService(type) {
        if (type === 'update') {
            return GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.config, type);
        }
        return GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.config, type) && !this.gmGetVarNames.checkHasLeIdColumn();
    }
}
class GmModuleControllerClassCrudBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.plural)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.getValidatorVarName(), this.validator);
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
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        if (this.gmValidatorBuilder.checkHasAddValidatorService('add') ||
            this.gmValidatorBuilder.checkHasAddValidatorService('update')) {
            this.addService(new GmServiceValidator_1.GmServiceValidator());
            this.addService(new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType());
        }
        if (this.gmValidatorBuilder.checkHasAddValidatorService('add')) {
            this.addModule(this.gmModuleCreateDto);
        }
        if (this.gmValidatorBuilder.checkHasAddValidatorService('update')) {
            this.addModule(this.gmModuleUpdateDto);
        }
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            createDtoType: this.gmGetVarNames.add().createBodyType,
            userInfo: this.gmGetVarNames.userInfo(),
            createDtoSchema: this.gmGetVarNames.add().createBodySchema,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByStaticDb.add(methodCreate);
        }
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: this.gmGetVarNames.update().updateBody,
            updateDtoType: this.gmGetVarNames.update().updateBodyType,
            userInfo: this.gmGetVarNames.userInfo(),
            updateDtoSchema: this.gmGetVarNames.update().updateBodySchema,
            id: this.gmGetVarNames.update().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'update')) {
            this.gmAccessStructureMethodProcessorByStaticDb.update(methodUpdate);
        }
        const methodDelete = new GmModuleControllerMethodDelete_1.GmModuleControllerMethodDelete(this.getConfig(), this.serviceCrud.api, {
            userInfo: this.gmGetVarNames.userInfo(),
            id: this.gmGetVarNames.delete().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'delete')) {
            this.gmAccessStructureMethodProcessorByStaticDb.delete(methodDelete);
        }
        const methodGetById = new GmModuleControllerMethodGetById_1.GmModuleControllerMethodGetById(this.getConfig(), this.serviceCrud.api, {
            userInfo: this.gmGetVarNames.userInfo(),
            id: this.gmGetVarNames.get().id,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'get')) {
            this.gmAccessStructureMethodProcessorByStaticDb.get(methodGetById);
        }
        const methodPagination = new GmModuleControllerMethodGetPagination_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: this.gmGetVarNames.list().params,
            userInfo: this.gmGetVarNames.userInfo(),
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
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `);
        }
        if (this.gmGetVarNames.update().updateBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.update().updateBodyType} = ${this.gmModuleUpdateDto.getPropertyName()} & {legal_entity_id:number}
            `);
        }
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            
            ${this.gmValidatorBuilder.add()}
            
            ${this.gmValidatorBuilder.update()}
            
            ${this.gmValidatorBuilder.list()}
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getServiceVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCrudBySqlStaticDb = GmModuleControllerClassCrudBySqlStaticDb;
class GmModuleControllerClassCreateBySqlStaticDb extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.getValidatorVarName(), this.validator);
        const gmGetVarNames = new GmGetVarNamesByStaticDb(config);
        this.serviceCrud = new byStaticDb_1.GmModuleServiceClassCreateBySqlStaticDb(config, `this.${this.getServiceVarName()}`, {
            createDto: gmGetVarNames.add().createBody,
            initiatorOpenUserId: gmGetVarNames.add().openUserId,
        });
        this.gmAccessStructureMethodProcessorByStaticDb = new GmAccessStructureMethodProcessorByStaticDb(config);
        this.gmGetVarNames = gmGetVarNames;
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        if (this.gmValidatorBuilder.checkHasAddValidatorService('add')) {
            this.addService(new GmServiceValidator_1.GmServiceValidator());
            this.addService(new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType());
            this.addModule(this.gmModuleCreateDto);
        }
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            createDtoType: this.gmGetVarNames.add().createBodyType,
            userInfo: this.gmGetVarNames.userInfo(),
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
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        if (this.gmGetVarNames.add().createBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.add().createBodyType} = ${this.gmModuleCreateDto.getPropertyName()} & {legal_entity_id:number}
            `);
        }
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            
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
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.getValidatorVarName(), this.validator);
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
        if (this.gmValidatorBuilder.checkHasAddValidatorService('update')) {
            this.addService(new GmServiceValidator_1.GmServiceValidator());
            this.addService(new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType());
        }
        const methodUpdate = new GmModuleControllerMethodUpdate_1.GmModuleControllerMethodUpdate(this.getConfig(), this.serviceCrud.api, {
            updateDto: this.gmGetVarNames.update().updateBody,
            updateDtoType: this.gmGetVarNames.update().updateBodyType,
            userInfo: this.gmGetVarNames.userInfo(),
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
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        if (this.gmGetVarNames.update().updateBodyType) {
            this.addElementBeforeClass(`
                type ${this.gmGetVarNames.update().updateBodyType} = ${this.gmModuleUpdateDto.getPropertyName()} & {legal_entity_id:number}
            `);
        }
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            
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
            userInfo: this.gmGetVarNames.userInfo(),
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
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
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
            userInfo: this.gmGetVarNames.userInfo(),
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
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
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
        this.validator = new GmModuleValidator_1.GmModuleValidator(config, this.getValidatorVarName());
        this.gmValidatorBuilder = new GmValidatorBuilderByStaticDb(config, this.getValidatorVarName(), this.validator);
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
            userInfo: this.gmGetVarNames.userInfo(),
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
            defaultValue: `new ${this.serviceCrud.getPropertyName()}()`,
        });
        this.addElementBeforeClass(`
            ${this.gmValidatorBuilder.initValidator()}
            ${this.gmValidatorBuilder.list()}
        `);
    }
    getValidatorVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getServiceVarName() {
        return `getAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassGetAllBySqlStaticDb = GmModuleControllerClassGetAllBySqlStaticDb;
//# sourceMappingURL=index.js.map