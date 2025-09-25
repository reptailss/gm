"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleEntityType = void 0;
const GmAbstractModuleType_1 = require("../abstractModule/GmAbstractModuleType");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmModuleEntityType extends GmAbstractModuleType_1.GmAbstractModuleType {
    getPropertyName() {
        switch (this.getConfig().model.type) {
            case 'staticByDbConnection':
                return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Repository`;
            case 'dynamicByDomain':
                return `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}RepositoryCb`;
            case 'dynamicDbConfigByLegalEntityId':
                return `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}RepositoryCb`;
            case 'byDatabaseNameAndYearMonth':
                return `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}RepositoryCb`;
            default:
                return '';
        }
    }
    getDirName() {
        return 'repository';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        this.setFileWriteMode('appendAfter');
        switch (this.getConfig().model.dbType) {
            case 'noSql': {
                this.addImport({
                    path: 'os-core-ts',
                    propertyName: 'INoSqlRepository',
                    isLibImport: true,
                });
                break;
            }
            case 'sql': {
                this.addImport({
                    path: 'os-core-ts',
                    propertyName: 'ISqlRepository',
                    isLibImport: true,
                });
                break;
            }
        }
        switch (this.getConfig().model.type) {
            case 'staticByDbConnection': {
                this.setBody(`ISqlRepository<${this.getEntityName()}>`);
                break;
            }
            case 'dynamicByDomain': {
                this.setBody(`(domain:string)=>Promise<ISqlRepository<${this.getEntityName()}>>`);
                break;
            }
            case 'dynamicDbConfigByLegalEntityId': {
                this.setBody(`(legalEntityId:number)=>Promise<ISqlRepository<${this.getEntityName()}>>`);
                break;
            }
            case 'byDatabaseNameAndYearMonth': {
                this.setBody(`(props:{month:number,year:number})=>Promise<INoSqlRepository<${this.getEntityName()}>>`);
                break;
            }
        }
    }
    getEntityName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Entity`;
    }
}
exports.GmModuleEntityType = GmModuleEntityType;
//# sourceMappingURL=GmModuleEntityType.js.map