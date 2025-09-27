"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassByNoSqlMonthAndYear = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositoryByNoSqlMonthAndYear_1 = require("../../../repository/GmModuleRepositoryByNoSqlMonthAndYear");
const GmModuleEntityType_1 = require("../../../repository/GmModuleEntityType");
const GmInjectableDec_1 = require("../../../../decorators/controllerDecorators/GmInjectableDec");
const PROP_NAMES = {
    repository: 'repository',
    getRepositoryCb: 'loaderRepository',
    month: 'month',
    year: 'year',
};
class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.repository = new GmModuleRepositoryByNoSqlMonthAndYear_1.GmModuleRepositoryByNoSqlMonthAndYear(config, {
            repositoryVarName: PROP_NAMES.repository,
            getRepositoryCbVarName: `this.${PROP_NAMES.getRepositoryCb}`,
            monthVarName: PROP_NAMES.month,
            yearVarName: PROP_NAMES.year,
        });
        this.entityType = new GmModuleEntityType_1.GmModuleEntityType(config);
    }
    getModuleRepository() {
        return this.repository;
    }
    addAndInitMethod(method, monthVarName, yearVarName) {
        method.prependBodyElement({
            name: 'init repository',
            value: this.renderInitRepository(),
        });
        method.addProp({
            varName: PROP_NAMES.year,
            callVarName: monthVarName,
            decorator: null,
            type: 'number',
        });
        method.addProp({
            varName: PROP_NAMES.month,
            callVarName: yearVarName,
            decorator: null,
            type: 'number',
        });
        method.setPropsType('object');
        this.addMethod(method);
        return this;
    }
    renderInitRepository() {
        return `const ${PROP_NAMES.repository} = await ${this.repository.getInitRepository()}`;
    }
    init() {
        this.addModule(this.repository);
        this.addModule(this.entityType);
        this.addConstructorProp({
            varName: PROP_NAMES.getRepositoryCb,
            type: this.entityType.getPropertyName(),
            defaultValue: this.repository.getPropertyName(),
            privateReadOnly: true,
        });
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleServiceClassByNoSqlMonthAndYear = GmModuleServiceClassByNoSqlMonthAndYear;
//# sourceMappingURL=GmModuleServiceClassByNoSqlMonthAndYear.js.map