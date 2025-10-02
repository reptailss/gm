"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositoryByNoSqlMonthAndYear = void 0;
const GmModuleRepositoryApiNoSql_1 = require("./api/GmModuleRepositoryApiNoSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmAbstractModuleClass_1 = require("../abstractModule/GmAbstractModuleClass");
const GmInjectableDec_1 = require("../../decorators/controllerDecorators/GmInjectableDec");
const GmAbstractModuleClassMethod_1 = require("../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../entity/GmModuleEntity");
const GmAbstractModuleClassRepositoryNoSql_1 = require("./abstractRepository/GmAbstractModuleClassRepositoryNoSql");
const PROP_VAR_NAMES = {
    month: 'month',
    year: 'year',
    loaderNoSqlRepository: 'loaderNoSqlRepository',
    repository: 'repository',
    entity: 'entity',
};
class NoSqlRepository extends GmAbstractModuleClassRepositoryNoSql_1.GmAbstractModuleClassRepositoryNoSql {
    constructor(config, repositoryVarName) {
        super(config, repositoryVarName);
    }
    getPropertyName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    getExport() {
        return null;
    }
    init() {
        super.init();
        this.setFileWriteMode('appendAfter');
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'INoSqlRepository',
            isLibImport: true,
        });
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.repository,
            privateReadOnly: true,
            type: `INoSqlRepository<${this.getEntityName()}>`,
            defaultValue: null,
        });
    }
}
class LoaderRepository extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, loaderNoSqlRepository, entityVarName) {
        super(config);
        this.loaderNoSqlRepository = loaderNoSqlRepository;
        this.entityVarName = entityVarName;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.noSqlRepository = new NoSqlRepository(config, `this.${PROP_VAR_NAMES.repository}`);
    }
    getPropertyName() {
        return 'load';
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addModule(this.noSqlRepository);
        this.addProp({
            varName: PROP_VAR_NAMES.month,
            type: 'number',
            callVarName: PROP_VAR_NAMES.month,
            decorator: null,
        });
        this.addProp({
            varName: PROP_VAR_NAMES.year,
            type: 'number',
            callVarName: PROP_VAR_NAMES.year,
            decorator: null,
        });
        this.appendBodyElement({
            name: 'get repository',
            value: `
            const ${PROP_VAR_NAMES.repository} = await ${this.loaderNoSqlRepository}.byDatabaseNameAndYearMonth({
                 entity:${this.entityVarName},
                 collectionName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                 databaseName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                 ${PROP_VAR_NAMES.month},
                 ${PROP_VAR_NAMES.year},
            })
            `,
        });
        this.appendBodyElement({
            name: 'return repository',
            value: `return new ${this.noSqlRepository.getPropertyName()}(${PROP_VAR_NAMES.repository})`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<${this.noSqlRepository.getPropertyName()}>`);
    }
}
class GmModuleRepositoryByNoSqlMonthAndYear extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    constructor(config, { repositoryVarName, loaderRepositoryVarName, monthVarName, yearVarName, }) {
        super(config);
        this.loaderRepositoryVarName = loaderRepositoryVarName;
        this.monthVarName = monthVarName;
        this.yearVarName = yearVarName;
        this.api = new GmModuleRepositoryApiNoSql_1.GmModuleRepositoryApiNoSql(repositoryVarName);
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.loaderRepository = new LoaderRepository(this.getConfig(), `this.${PROP_VAR_NAMES.loaderNoSqlRepository}`, `this.${PROP_VAR_NAMES.entity}`);
    }
    getDirName() {
        return 'repository';
    }
    getFileName() {
        return 'index.ts';
    }
    getPropertyName() {
        return `Loader${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
    }
    getInitRepository() {
        const monthStr = this.monthVarName === PROP_VAR_NAMES.month ? PROP_VAR_NAMES.month : `${PROP_VAR_NAMES.month}:${this.monthVarName}`;
        const yearStr = this.yearVarName === PROP_VAR_NAMES.year ? PROP_VAR_NAMES.year : `${PROP_VAR_NAMES.month}:${this.yearVarName}`;
        return `${this.loaderRepositoryVarName}.load(${monthStr},${yearStr})`;
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addModule(this.gmModuleEntity);
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderNoSqlRepository',
            isLibImport: true,
        });
        this.addVar({
            type: null,
            defaultValue: `new ${this.gmModuleEntity.getPropertyName()}()`,
            varName: PROP_VAR_NAMES.entity,
            readonly: true,
            scope: 'public',
        });
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.loaderNoSqlRepository,
            privateReadOnly: true,
            type: 'LoaderNoSqlRepository',
            defaultValue: null,
        });
        this.addMethod(this.loaderRepository);
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleRepositoryByNoSqlMonthAndYear = GmModuleRepositoryByNoSqlMonthAndYear;
//# sourceMappingURL=GmModuleRepositoryByNoSqlMonthAndYear.js.map