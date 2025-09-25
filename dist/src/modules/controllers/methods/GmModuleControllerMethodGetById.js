"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodGetById = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmServiceBuildResponseFormat_1 = require("../../../services/buildResponseFormat/GmServiceBuildResponseFormat");
const GmServiceRowResultType_1 = require("../../../services/resultTypes/GmServiceRowResultType");
const GmServiceThrowAppError_1 = require("../../../services/errors/GmServiceThrowAppError");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmServiceUserInfoType_1 = require("../../../services/userInfo/GmServiceUserInfoType");
const GmModuleRoutePaths_1 = require("../../routePaths/GmModuleRoutePaths");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmSwaggerInfoDec_1 = require("../../../decorators/controllerDecorators/GmSwaggerInfoDec");
const GmGetDec_1 = require("../../../decorators/controllerDecorators/GmGetDec");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmAuthDec_1 = require("../../../decorators/controllerDecorators/GmAuthDec");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const GmParamDec_1 = require("../../../decorators/controllerDecorators/GmParamDec");
class GmModuleControllerMethodGetById extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat_1.GmServiceBuildResponseFormat();
        this.gmServiceRowResultType = new GmServiceRowResultType_1.GmServiceRowResultType();
        this.gmServiceUserInfoType = new GmServiceUserInfoType_1.GmServiceUserInfoType();
        this.gmServiceThrowAppError = new GmServiceThrowAppError_1.GmServiceThrowAppError();
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleRoutePaths = new GmModuleRoutePaths_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `get${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}ById`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceRowResultType);
        this.addService(this.gmServiceThrowAppError);
        this.setReturnType(`Promise<${this.gmServiceRowResultType.getRowResultType(this.gmModuleDto.getPropertyName())}>`);
        this.appendDecorator(new GmSwaggerInfoDec_1.GmSwaggerInfoDec(`Get ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.singular)} by id`));
        this.appendDecorator(new GmGetDec_1.GmGetDec(this.gmModuleRoutePaths.getRoutePathPropertyName('get')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasAuth(this.getConfig(), 'get')) {
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
            decorator: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ? new GmParamDec_1.GmParamDec('id') : new GmParamDec_1.GmParamNumDec('id'),
        });
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getDtoPropertyVarName()} = await ${this.api.getById()}`,
        });
        this.appendBodyElement({
            name: 'check has row',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getDtoPropertyVarName()}`,
            }),
        });
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.row(this.getDtoPropertyVarName())}`,
        });
    }
    getDtoPropertyVarName() {
        return 'dto';
    }
}
exports.GmModuleControllerMethodGetById = GmModuleControllerMethodGetById;
//# sourceMappingURL=GmModuleControllerMethodGetById.js.map