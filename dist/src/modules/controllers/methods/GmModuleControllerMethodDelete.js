"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodDelete = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmServiceBuildResponseFormat_1 = require("../../../services/buildResponseFormat/GmServiceBuildResponseFormat");
const GmServiceMutateRowResultType_1 = require("../../../services/resultTypes/GmServiceMutateRowResultType");
const GmServiceUserInfoType_1 = require("../../../services/userInfo/GmServiceUserInfoType");
const GmModuleRoutePaths_1 = require("../../routePaths/GmModuleRoutePaths");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const GmSwaggerInfoDec_1 = require("../../../decorators/controllerDecorators/GmSwaggerInfoDec");
const GmDeleteDec_1 = require("../../../decorators/controllerDecorators/GmDeleteDec");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmAuthDec_1 = require("../../../decorators/controllerDecorators/GmAuthDec");
const GmParamDec_1 = require("../../../decorators/controllerDecorators/GmParamDec");
class GmModuleControllerMethodDelete extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat_1.GmServiceBuildResponseFormat();
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType_1.GmServiceMutateRowResultType();
        this.gmServiceUserInfoType = new GmServiceUserInfoType_1.GmServiceUserInfoType();
        this.gmModuleRoutePaths = new GmModuleRoutePaths_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `delete${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`;
    }
    init() {
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceMutateRowResultType);
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type)}>`);
        this.appendDecorator(new GmSwaggerInfoDec_1.GmSwaggerInfoDec(`Delete ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.singular)}`));
        this.appendDecorator(new GmDeleteDec_1.GmDeleteDec(this.gmModuleRoutePaths.getRoutePathPropertyName('delete')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasAuth(this.getConfig(), 'delete')) {
            this.addService(this.gmServiceUserInfoType);
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new GmAuthDec_1.GmAuthDec(),
            });
        }
        this.addProp({
            type: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            varName: this.varNames.id,
            callVarName: this.varNames.id,
            decorator: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ? new GmParamDec_1.GmParamDec('id') : new GmParamDec_1.GmParamNumDec('id')
        });
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getOldDtoPropertyVarName()} = await ${this.api.delete()}`,
        });
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getOldDtoPropertyVarName()}.${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        });
    }
    getOldDtoPropertyVarName() {
        return 'oldDto';
    }
}
exports.GmModuleControllerMethodDelete = GmModuleControllerMethodDelete;
//# sourceMappingURL=GmModuleControllerMethodDelete.js.map