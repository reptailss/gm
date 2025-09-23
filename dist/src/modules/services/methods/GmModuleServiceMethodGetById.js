"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodGetById = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const PROPS_VAR_NAMES = {
    id: 'id',
};
class GmModuleServiceMethodGetById extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleModel, callVarNames) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleModel = gmModuleModel;
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}ById`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()} | null>`);
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        });
        this.initGetRow();
    }
    initGetRow() {
        this.appendBodyElement({
            name: 'getRow',
            value: `return ${this.gmModuleModel.api.findByPk(PROPS_VAR_NAMES.id)}`,
        });
    }
}
exports.GmModuleServiceMethodGetById = GmModuleServiceMethodGetById;
//# sourceMappingURL=GmModuleServiceMethodGetById.js.map