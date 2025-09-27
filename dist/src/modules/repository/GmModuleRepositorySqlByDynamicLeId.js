"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleRepositorySqlByDynamicLeId = void 0;
const GmModuleRepositoryApiSql_1 = require("./api/GmModuleRepositoryApiSql");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
const GmAbstractModuleClassRepositorySql_1 = require("./abstractRepository/GmAbstractModuleClassRepositorySql");
const GmAbstractModuleClassMethod_1 = require("../abstractModule/GmAbstractModuleClassMethod");
const GmModuleEntity_1 = require("../entity/GmModuleEntity");
const GmInjectableDec_1 = require("../../decorators/controllerDecorators/GmInjectableDec");
const GmAbstractModuleClass_1 = require("../abstractModule/GmAbstractModuleClass");
const PROP_VAR_NAMES = {
    legalEntityId: 'legalEntityId',
    repository: 'repository',
    loaderSqlRepository: 'loaderSqlRepository',
};
class SqlRepository extends GmAbstractModuleClassRepositorySql_1.GmAbstractModuleClassRepositorySql {
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
            propertyName: 'ISqlRepository',
            isLibImport: true,
        });
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.repository,
            privateReadOnly: true,
            type: `ISqlRepository<${this.getEntityName()}>`,
            defaultValue: null,
        });
    }
}
class LoaderRepository extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, loaderSqlRepository) {
        super(config);
        this.loaderSqlRepository = loaderSqlRepository;
        this.gmModuleEntity = new GmModuleEntity_1.GmModuleEntity(config);
        this.sqlRepository = new SqlRepository(config, `this.${PROP_VAR_NAMES.repository}`);
    }
    getPropertyName() {
        return 'load';
    }
    init() {
        this.addModule(this.gmModuleEntity);
        this.addModule(this.sqlRepository);
        this.addProp({
            type: 'number',
            varName: PROP_VAR_NAMES.legalEntityId,
            callVarName: PROP_VAR_NAMES.legalEntityId,
            decorator: null,
        });
        this.appendBodyElement({
            name: 'get repository',
            value: `
            const ${PROP_VAR_NAMES.repository} = await ${this.loaderSqlRepository}.dynamicDbConfigByLegalEntityId({
                entity:new ${this.gmModuleEntity.getPropertyName()}(),
                tableName:'${StringCaseHelper_1.StringCaseHelper.toSnakeCase(this.getConfig().moduleName)}',
                ${PROP_VAR_NAMES.legalEntityId},
            })
            `,
        });
        this.appendBodyElement({
            name: 'return repository',
            value: `return new ${this.sqlRepository.getPropertyName()}(${PROP_VAR_NAMES.repository})`,
        });
        this.setAsyncType('async');
        this.setReturnType(`Promise<${this.sqlRepository.getPropertyName()}>`);
    }
}
class GmModuleRepositorySqlByDynamicLeId extends GmAbstractModuleClass_1.GmAbstractModuleClass {
    constructor(config, { repositoryVarName, getRepositoryCbVarName, leIdVarName, }) {
        super(config);
        this.getRepositoryCbVarName = getRepositoryCbVarName;
        this.leIdVarName = leIdVarName;
        this.api = new GmModuleRepositoryApiSql_1.GmModuleRepositoryApiSql(repositoryVarName);
        this.loaderRepository = new LoaderRepository(this.getConfig(), `this.${PROP_VAR_NAMES.loaderSqlRepository}`);
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
        return `${this.getRepositoryCbVarName}.${this.loaderRepository.getPropertyName()}(${this.leIdVarName})`;
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderSqlRepository',
            isLibImport: true,
        });
        this.addConstructorProp({
            varName: PROP_VAR_NAMES.loaderSqlRepository,
            privateReadOnly: true,
            type: 'LoaderSqlRepository',
            defaultValue: null,
        });
        this.addMethod(this.loaderRepository);
        this.addDecorator(new GmInjectableDec_1.GmInjectableDec());
    }
}
exports.GmModuleRepositorySqlByDynamicLeId = GmModuleRepositorySqlByDynamicLeId;
//# sourceMappingURL=GmModuleRepositorySqlByDynamicLeId.js.map