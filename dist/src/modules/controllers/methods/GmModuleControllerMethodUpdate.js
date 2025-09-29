"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodUpdate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmServiceBuildResponseFormat_1 = require("../../../services/buildResponseFormat/GmServiceBuildResponseFormat");
const GmServiceMutateRowResultType_1 = require("../../../services/resultTypes/GmServiceMutateRowResultType");
const GmModuleUpdateDto_1 = require("../../dto/GmModuleUpdateDto");
const GmServiceUserDtoType_1 = require("../../../services/userDto/GmServiceUserDtoType");
const GmModuleRoutePaths_1 = require("../../routePaths/GmModuleRoutePaths");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const GmSwaggerInfoDec_1 = require("../../../decorators/controllerDecorators/GmSwaggerInfoDec");
const GmPutDec_1 = require("../../../decorators/controllerDecorators/GmPutDec");
const GmBodyDec_1 = require("../../../decorators/controllerDecorators/GmBodyDec");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmAuthDec_1 = require("../../../decorators/controllerDecorators/GmAuthDec");
const GmParamDec_1 = require("../../../decorators/controllerDecorators/GmParamDec");
class GmModuleControllerMethodUpdate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat_1.GmServiceBuildResponseFormat();
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType_1.GmServiceMutateRowResultType();
        this.gmServiceUserInfoType = new GmServiceUserDtoType_1.GmServiceUserDtoType();
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
        this.gmModuleRoutePaths = new GmModuleRoutePaths_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return 'update';
    }
    init() {
        this.addModule(this.gmModuleUpdateDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceMutateRowResultType);
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type)}>`);
        this.appendDecorator(new GmSwaggerInfoDec_1.GmSwaggerInfoDec(`Update ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.singular)} by id`));
        this.appendDecorator(new GmPutDec_1.GmPutDec(this.gmModuleRoutePaths.getRoutePathPropertyName('update')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            type: this.varNames.updateDtoType || this.gmModuleUpdateDto.getPropertyName(),
            varName: this.varNames.updateDto,
            callVarName: this.varNames.updateDto,
            decorator: new GmBodyDec_1.GmBodyDec(this.varNames.updateDtoSchema),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasAuth(this.getConfig(), 'update')) {
            this.addService(this.gmServiceUserInfoType);
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userDto,
                callVarName: this.varNames.userDto,
                decorator: new GmAuthDec_1.GmAuthDec(),
            });
        }
        this.addProp({
            type: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            varName: this.varNames.id,
            callVarName: this.varNames.id,
            decorator: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ? new GmParamDec_1.GmParamDec('id') : new GmParamDec_1.GmParamNumDec('id'),
        });
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.api.update()}`,
        });
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getNewDtoPropertyVarName()}.${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        });
    }
    getNewDtoPropertyVarName() {
        return 'newDto';
    }
}
exports.GmModuleControllerMethodUpdate = GmModuleControllerMethodUpdate;
//# sourceMappingURL=GmModuleControllerMethodUpdate.js.map