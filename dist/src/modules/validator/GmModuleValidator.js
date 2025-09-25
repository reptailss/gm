"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleValidator = void 0;
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmAbstractModuleClass_1 = require("../abstractModule/GmAbstractModuleClass");
const GmAbstractModuleClassMethod_1 = require("../abstractModule/GmAbstractModuleClassMethod");
const GmModuleCreateDto_1 = require("../dto/GmModuleCreateDto");
const GmServiceValidator_1 = require("../../services/validator/GmServiceValidator");
const GmServiceObjectSchemaValidatorType_1 = require("../../services/schemaValidator/GmServiceObjectSchemaValidatorType");
const GmModuleUpdateDto_1 = require("../dto/GmModuleUpdateDto");
const GmModuleDto_1 = require("../dto/GmModuleDto");
const GmServiceSchemaValidatorType_1 = require("../../services/schemaValidator/GmServiceSchemaValidatorType");
const GmModuleDtoHelper_1 = require("../dto/helper/GmModuleDtoHelper");
const GmServicePaginationQueryParamsType_1 = require("../../services/paginationTypes/GmServicePaginationQueryParamsType");
const GmServicePaginationQueryParamsValidator_1 = require("../../services/validator/GmServicePaginationQueryParamsValidator");
class GmModuleValidator extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    constructor(config, schemaVarName) {
        super(config);
        this.schemaVarName = schemaVarName;
        this.api = {
            getCreateDtoSchema: () => {
                return `${this.schemaVarName}.${this.getMethodByIndex(0).renderMethodCall()}`;
            },
            getUpdateDtoSchema: () => {
                return `${this.schemaVarName}.${this.getMethodByIndex(1).renderMethodCall()}`;
            },
            getDtoPaginationQueryParamsSchema: () => {
                return `${this.schemaVarName}.${this.getMethodByIndex(3).renderMethodCall()}`;
            },
        };
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Validator`;
    }
    getDirName() {
        return 'validator';
    }
    getFileName() {
        return `${this.getPropertyName()}.ts`;
    }
    init() {
        this
            .addMethod(new GmModuleValidatorGetCreateDtoMethod(this.getConfig()))
            .addMethod(new GmModuleValidatorGetUpdateDtoMethod(this.getConfig()))
            .addMethod(new GmModuleValidatorGetDtoMethod(this.getConfig()))
            .addMethod(new GmModuleValidatorGetPaginationMethod(this.getConfig()));
    }
}
exports.GmModuleValidator = GmModuleValidator;
class GmModuleValidatorGetCreateDtoMethod extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config) {
        super(config);
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmServiceObjectSchemaValidatorType = new GmServiceObjectSchemaValidatorType_1.GmServiceObjectSchemaValidatorType();
        this.gmServiceValidator = new GmServiceValidator_1.GmServiceValidator();
    }
    getPropertyName() {
        return `get${this.gmModuleCreateDto.getPropertyName()}Schema`;
    }
    init() {
        this.addModule(this.gmModuleCreateDto);
        this.addService(this.gmServiceObjectSchemaValidatorType);
        this.addService(this.gmServiceValidator);
        this.setReturnType(this.gmServiceObjectSchemaValidatorType.getSchemaValidatorType(this.gmModuleCreateDto.getPropertyName()));
        this.appendBodyElement({
            name: 'return validator',
            value: `return ${this.gmServiceValidator.object(this.buildSchemaByColumns())}`,
        });
    }
    buildSchemaByColumns() {
        const res = {};
        for (const key in this.getConfig().repository.columns) {
            switch (this.getConfig().repository.columns[key].type) {
                case 'INTEGER':
                    res[key] = this.gmServiceValidator.number();
                    break;
                case 'BIGINT':
                    res[key] = this.gmServiceValidator.number();
                    break;
                case 'FLOAT':
                    res[key] = this.gmServiceValidator.number();
                    break;
                case 'BOOLEAN':
                    res[key] = this.gmServiceValidator.boolean();
                    break;
                case 'STRING':
                    res[key] = this.gmServiceValidator.string(0, 255);
                    break;
                case 'TEXT':
                    res[key] = this.gmServiceValidator.string();
                    break;
                case 'DATETIME':
                    res[key] = this.gmServiceValidator.date();
                    break;
                case 'JSON':
                    res[key] = this.gmServiceValidator.object({});
                    break;
                case 'OBJECT':
                    res[key] = this.gmServiceValidator.object({});
                    break;
            }
        }
        return res;
    }
}
class GmModuleValidatorGetUpdateDtoMethod extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config) {
        super(config);
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmServiceObjectSchemaValidatorType = new GmServiceObjectSchemaValidatorType_1.GmServiceObjectSchemaValidatorType();
    }
    getPropertyName() {
        return `get${this.gmModuleUpdateDto.getPropertyName()}Schema`;
    }
    getCreatePropertyName() {
        return `get${this.gmModuleCreateDto.getPropertyName()}Schema`;
    }
    init() {
        this.addModule(this.gmModuleUpdateDto);
        this.addModule(this.gmModuleCreateDto);
        this.addService(this.gmServiceObjectSchemaValidatorType);
        this.setReturnType(this.gmServiceObjectSchemaValidatorType.getSchemaValidatorType(this.gmModuleUpdateDto.getPropertyName()));
        this.appendBodyElement({
            name: 'return schema',
            value: `return this.${this.getCreatePropertyName()}().partial()`,
        });
    }
}
class GmModuleValidatorGetDtoMethod extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType();
        this.gmServiceValidator = new GmServiceValidator_1.GmServiceValidator();
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
    }
    getPropertyName() {
        return `get${this.gmModuleDto.getPropertyName()}Schema`;
    }
    getCreatePropertyName() {
        return `get${this.gmModuleCreateDto.getPropertyName()}Schema`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addService(this.gmServiceSchemaValidatorType);
        this.setReturnType(this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmModuleDto.getPropertyName()));
        this.appendBodyElement({
            name: 'return schema',
            value: `return this.${this.getCreatePropertyName()}().merge(${this.gmServiceValidator.object({
                date_add: this.gmServiceValidator.date(),
                date_update: this.gmServiceValidator.date(),
                [GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'number' ? this.gmServiceValidator.number() : this.gmServiceValidator.string(),
            })})`,
        });
    }
}
class GmModuleValidatorGetPaginationMethod extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmServiceSchemaValidatorType = new GmServiceSchemaValidatorType_1.GmServiceSchemaValidatorType();
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType_1.GmServicePaginationQueryParamsType();
        this.gmServicePaginationQueryParamsValidator = new GmServicePaginationQueryParamsValidator_1.GmServicePaginationQueryParamsValidator();
    }
    getPropertyName() {
        return `get${this.gmModuleDto.getPropertyName()}PaginationQueryParamsSchema`;
    }
    getDtoPropertyName() {
        return `get${this.gmModuleDto.getPropertyName()}Schema`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addService(this.gmServicePaginationQueryParamsType);
        this.addService(this.gmServiceSchemaValidatorType);
        this.addService(this.gmServicePaginationQueryParamsValidator);
        this.setReturnType(this.gmServiceSchemaValidatorType.getSchemaValidatorType(this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName())));
        this.appendBodyElement({
            name: 'return schema',
            value: `return ${this.gmServicePaginationQueryParamsValidator.getSchema(`this.${this.getDtoPropertyName()}()`)}`,
        });
    }
}
//# sourceMappingURL=GmModuleValidator.js.map