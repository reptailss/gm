"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerClassGetAllByNoSqlMonthAndYear = exports.GmModuleControllerClassCreateByNoSqlMonthAndYear = exports.GmModuleControllerClassCrudByNoSqlMonthAndYear = void 0;
const StringCaseHelper_1 = require("../../../../../helpers/StringCaseHelper");
const GmCrudConfigChecker_1 = require("../../../../../crudConfig/GmCrudConfigChecker");
const GmAccessStructureMethodProcessor_1 = require("../../../../structure/GmAccessStructureMethodProcessor");
const GmQueryParamDec_1 = require("../../../../../decorators/controllerDecorators/GmQueryParamDec");
const GmModuleValidator_1 = require("../../../../validator/GmModuleValidator");
const GmModuleAbstractControllerClass_1 = require("../../abstract/GmModuleAbstractControllerClass");
const byMonthAndYear_1 = require("../../../../services/classes/noSql/byMonthAndYear");
const GmServiceDateHelper_1 = require("../../../../../services/dateHelper/GmServiceDateHelper");
const GmModuleCreateDto_1 = require("../../../../dto/GmModuleCreateDto");
const GmModuleControllerMethodCreate_1 = require("../../../methods/GmModuleControllerMethodCreate");
const GmModuleControllerMethodGetPagination_1 = require("../../../methods/GmModuleControllerMethodGetPagination");
const GmBodyParamDec_1 = require("../../../../../decorators/controllerDecorators/GmBodyParamDec");
class GmGetVarNamesByMonthAndYear {
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
            dateStart: 'dateStart',
            dateEnd: 'dateEnd',
            paramsSchema: `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.config.dtoName.singular)}DtoPaginationParamsSchema`,
            openUserId: `${this.userDto()}.open_user_id`,
            legalEntityId: 'legalEntityId',
        };
    }
}
class GmAccessStructureMethodProcessorByMonthAndYear extends GmAccessStructureMethodProcessor_1.GmAccessStructureMethodProcessor {
    constructor(config) {
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
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
class GmValidatorBuilderByMonthAndYear {
    constructor(config, validator) {
        this.config = config;
        this.validator = validator;
        this.gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
    }
    add() {
        return `const ${this.gmGetVarNames.add().createBodySchema} = ${this.validator.api.getCreateDtoSchema()}`;
    }
    list() {
        return `const ${this.gmGetVarNames.list().paramsSchema} = ${this.validator.api.getDtoPaginationQueryParamsSchema()}`;
    }
}
class GmModuleControllerClassCrudByNoSqlMonthAndYear extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.gmServiceDateHelper = new GmServiceDateHelper_1.GmServiceDateHelper();
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(config, this.validator);
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        this.serviceCrud = new byMonthAndYear_1.GmModuleServiceClassCrudByNoSqlMonthAndYear(config, `this.${this.getServiceVarName()}`, {
            create: {
                createDto: gmGetVarNames.add().createBody,
                initiatorOpenUserId: gmGetVarNames.add().openUserId,
                month: this.gmServiceDateHelper.getCurrentMonth(),
                year: this.gmServiceDateHelper.getCurrentYear(),
            },
            getPagination: {
                params: gmGetVarNames.list().params,
                dateStart: gmGetVarNames.list().dateStart,
                dateEnd: gmGetVarNames.list().dateEnd,
            },
        });
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config);
        this.gmGetVarNames = gmGetVarNames;
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addService(this.gmServiceDateHelper);
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            userDto: this.gmGetVarNames.userDto(),
            createDtoSchema: this.gmGetVarNames.add().createBodySchema,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.add(methodCreate);
        }
        const methodPagination = new GmModuleControllerMethodGetPagination_1.GmModuleControllerMethodGetPagination(this.getConfig(), this.serviceCrud.api, {
            params: this.gmGetVarNames.list().params,
            userDto: this.gmGetVarNames.userDto(),
            paramsSchema: this.gmGetVarNames.list().paramsSchema,
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateStart,
            callVarName: this.gmGetVarNames.list().dateStart,
            decorator: new GmQueryParamDec_1.GmQueryParamDateDec('date_start'),
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateEnd,
            callVarName: this.gmGetVarNames.list().dateEnd,
            decorator: new GmQueryParamDec_1.GmQueryParamDateDec('date_end'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.list(methodPagination);
        }
        this.addMethod(methodCreate);
        this.addMethod(methodPagination);
        this.addConstructorProp({
            varName: this.getServiceVarName(),
            type: this.serviceCrud.getPropertyName(),
            privateReadOnly: true,
            defaultValue: null,
        });
        this.addElementBeforeClass(`
       
            ${this.gmValidatorBuilder.add()}
              
            ${this.gmValidatorBuilder.list()}
        `);
    }
    getServiceVarName() {
        return `${StringCaseHelper_1.StringCaseHelper.toCamelCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCrudByNoSqlMonthAndYear = GmModuleControllerClassCrudByNoSqlMonthAndYear;
class GmModuleControllerClassCreateByNoSqlMonthAndYear extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `Create${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.gmServiceDateHelper = new GmServiceDateHelper_1.GmServiceDateHelper();
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(config, this.validator);
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        this.serviceCrud = new byMonthAndYear_1.GmModuleServiceClassCreateByNoSqlMonthAndYear(config, `this.${this.getServiceVarName()}`, {
            createDto: gmGetVarNames.add().createBody,
            initiatorOpenUserId: gmGetVarNames.add().openUserId,
            month: this.gmServiceDateHelper.getCurrentMonth(),
            year: this.gmServiceDateHelper.getCurrentYear(),
        });
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config);
        this.gmGetVarNames = gmGetVarNames;
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    init() {
        super.init();
        this.addModule(this.validator);
        this.addModule(this.serviceCrud);
        this.addService(this.gmServiceDateHelper);
        const methodCreate = new GmModuleControllerMethodCreate_1.GmModuleControllerMethodCreate(this.getConfig(), this.serviceCrud.api, {
            createDto: this.gmGetVarNames.add().createBody,
            userDto: this.gmGetVarNames.userDto(),
            createDtoSchema: this.gmGetVarNames.add().createBodySchema,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'add')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.add(methodCreate);
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
    getServiceVarName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Service`;
    }
}
exports.GmModuleControllerClassCreateByNoSqlMonthAndYear = GmModuleControllerClassCreateByNoSqlMonthAndYear;
class GmModuleControllerClassGetAllByNoSqlMonthAndYear extends GmModuleAbstractControllerClass_1.GmModuleAbstractControllerClass {
    constructor(config) {
        super(config, `GetAll${StringCaseHelper_1.StringCaseHelper.toPascalCase(config.dtoName.singular)}Controller`);
        this.validator = new GmModuleValidator_1.GmModuleValidator(config);
        this.gmValidatorBuilder = new GmValidatorBuilderByMonthAndYear(config, this.validator);
        const gmGetVarNames = new GmGetVarNamesByMonthAndYear(config);
        this.serviceCrud = new byMonthAndYear_1.GmModuleServiceClassGetAllByNoSqlMonthAndYear(config, `this.${this.getServiceVarName()}`, {
            params: gmGetVarNames.list().params,
            dateStart: gmGetVarNames.list().dateStart,
            dateEnd: gmGetVarNames.list().dateEnd,
        });
        this.gmAccessStructureMethodProcessorByMonthAndYear = new GmAccessStructureMethodProcessorByMonthAndYear(config);
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
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateStart,
            callVarName: this.gmGetVarNames.list().dateStart,
            decorator: new GmQueryParamDec_1.GmQueryParamDateDec('date_start'),
        }).addProp({
            type: 'Date',
            varName: this.gmGetVarNames.list().dateEnd,
            callVarName: this.gmGetVarNames.list().dateEnd,
            decorator: new GmQueryParamDec_1.GmQueryParamDateDec('date_end'),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasStructureAccess(this.getConfig(), 'list')) {
            this.gmAccessStructureMethodProcessorByMonthAndYear.list(methodPagination);
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
exports.GmModuleControllerClassGetAllByNoSqlMonthAndYear = GmModuleControllerClassGetAllByNoSqlMonthAndYear;
//# sourceMappingURL=index.js.map