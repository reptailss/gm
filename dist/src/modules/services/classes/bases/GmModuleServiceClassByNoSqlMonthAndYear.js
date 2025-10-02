"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceClassByNoSqlMonthAndYear = void 0;
const GmModuleAbstractServiceClass_1 = require("../abstract/GmModuleAbstractServiceClass");
const GmModuleRepositoryByNoSqlMonthAndYear_1 = require("../../../repository/GmModuleRepositoryByNoSqlMonthAndYear");
const GmInjectableDec_1 = require("../../../../decorators/controllerDecorators/GmInjectableDec");
const PROP_NAMES = {
    repository: 'repository',
    loaderRepository: 'loaderRepository',
    month: 'month',
    year: 'year',
};
class GmModuleServiceClassByNoSqlMonthAndYear extends GmModuleAbstractServiceClass_1.GmModuleAbstractServiceClass {
    constructor(config, className) {
        super(config, className);
        this.gmModuleRepositoryByNoSqlMonthAndYear = new GmModuleRepositoryByNoSqlMonthAndYear_1.GmModuleRepositoryByNoSqlMonthAndYear(config, {
            repositoryVarName: PROP_NAMES.repository,
            loaderRepositoryVarName: `this.${PROP_NAMES.loaderRepository}`,
            monthVarName: PROP_NAMES.month,
            yearVarName: PROP_NAMES.year,
        });
    }
    getModuleRepository() {
        return this.gmModuleRepositoryByNoSqlMonthAndYear;
    }
    getLoaderRepositoryVarName() {
        return `this.${PROP_NAMES.loaderRepository}`;
    }
    addAndInitMethod(method, monthVarName, yearVarName) {
        method.prependBodyElement({
            name: 'init repository',
            value: this.renderInitRepository(),
        });
        method.addProp({
            varName: PROP_NAMES.month,
            callVarName: monthVarName,
            decorator: null,
            type: 'number',
        });
        method.addProp({
            varName: PROP_NAMES.year,
            callVarName: yearVarName,
            decorator: null,
            type: 'number',
        });
        method.setPropsType('object');
        this.addMethod(method);
        return this;
    }
    renderInitRepository() {
        return `const ${PROP_NAMES.repository} = await ${this.gmModuleRepositoryByNoSqlMonthAndYear.getInitRepository()}`;
    }
    init() {
        this.addModule(this.gmModuleRepositoryByNoSqlMonthAndYear);
        this.addConstructorProp({
            varName: PROP_NAMES.loaderRepository,
            type: this.gmModuleRepositoryByNoSqlMonthAndYear.getPropertyName(),
            defaultValue: null,
            privateReadOnly: true,
        });
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleServiceClassByNoSqlMonthAndYear = GmModuleServiceClassByNoSqlMonthAndYear;
//# sourceMappingURL=GmModuleServiceClassByNoSqlMonthAndYear.js.map