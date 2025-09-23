"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleModelType = void 0;
const GmAbstractModuleType_1 = require("../abstractModule/GmAbstractModuleType");
const StringCaseHelper_1 = require("../../helpers/StringCaseHelper");
class GmModuleModelType extends GmAbstractModuleType_1.GmAbstractModuleType {
    getPropertyName() {
        switch (this.getConfig().model.type) {
            case 'staticByDbConnection':
                return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Model`;
            case 'dynamicByDomain':
                return `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}ModelCb`;
            case 'dynamicDbConfigByLegalEntityId':
                return `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}ModelCb`;
            case 'byDatabaseNameAndYearMonth':
                return `Get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}ModelCb`;
            default:
                return '';
        }
    }
    getDirName() {
        return 'model';
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
                    propertyName: 'IModelNoSql',
                    isLibImport: true,
                });
                break;
            }
            case 'sql': {
                this.addImport({
                    path: 'os-core-ts',
                    propertyName: 'IModelSql',
                    isLibImport: true,
                });
                break;
            }
        }
        switch (this.getConfig().model.type) {
            case 'staticByDbConnection': {
                this.setBody(`IModelSql<${this.getDtoName()}>`);
                break;
            }
            case 'dynamicByDomain': {
                this.setBody(`(domain:string)=>Promise<IModelSql<${this.getDtoName()}>>`);
                break;
            }
            case 'dynamicDbConfigByLegalEntityId': {
                this.setBody(`(legalEntityId:number)=>Promise<IModelSql<${this.getDtoName()}>>`);
                break;
            }
            case 'byDatabaseNameAndYearMonth': {
                this.setBody(`(props:{month:number,year:number})=>Promise<IModelNoSql<${this.getDtoName()}>>`);
                break;
            }
        }
    }
    getDtoName() {
        return `${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
    }
}
exports.GmModuleModelType = GmModuleModelType;
//# sourceMappingURL=GmModuleModelType.js.map