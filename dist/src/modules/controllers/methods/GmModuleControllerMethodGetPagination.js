"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodGetPagination = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmServiceBuildResponseFormat_1 = require("../../../services/buildResponseFormat/GmServiceBuildResponseFormat");
const GmServicePaginationResultType_1 = require("../../../services/resultTypes/GmServicePaginationResultType");
const GmServicePaginationQueryParamsType_1 = require("../../../services/paginationTypes/GmServicePaginationQueryParamsType");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmServiceUserDtoType_1 = require("../../../services/userDto/GmServiceUserDtoType");
const GmModuleRoutePaths_1 = require("../../routePaths/GmModuleRoutePaths");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmSwaggerInfoDec_1 = require("../../../decorators/controllerDecorators/GmSwaggerInfoDec");
const GmGetDec_1 = require("../../../decorators/controllerDecorators/GmGetDec");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmAuthDec_1 = require("../../../decorators/controllerDecorators/GmAuthDec");
const GmPaginationQueryParamsDec_1 = require("../../../decorators/controllerDecorators/GmPaginationQueryParamsDec");
class GmModuleControllerMethodGetPagination extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat_1.GmServiceBuildResponseFormat();
        this.gmServicePaginationValues = new GmServicePaginationResultType_1.GmServicePaginationValues();
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType_1.GmServicePaginationQueryParamsType();
        this.gmServiceUserInfoType = new GmServiceUserDtoType_1.GmServiceUserDtoType();
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleRoutePaths = new GmModuleRoutePaths_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return 'pagination';
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServicePaginationValues);
        this.addService(this.gmServicePaginationQueryParamsType);
        this.setReturnType(`Promise<${this.gmServicePaginationValues.getPaginationResultType(this.gmModuleDto.getPropertyName())}>`);
        this.appendDecorator(new GmSwaggerInfoDec_1.GmSwaggerInfoDec(`Get ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural)} list`));
        this.appendDecorator(new GmGetDec_1.GmGetDec(this.gmModuleRoutePaths.getRoutePathPropertyName('list')));
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasAuth(this.getConfig(), 'list')) {
            this.addService(this.gmServiceUserInfoType);
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userDto,
                callVarName: this.varNames.userDto,
                decorator: new GmAuthDec_1.GmAuthDec(),
            });
        }
        this.addProp({
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: new GmPaginationQueryParamsDec_1.GmPaginationQueryParamsDec(this.varNames.paramsSchema),
            callVarName: this.varNames.params,
            varName: this.varNames.params,
        });
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getPaginationValuesVarName()} = await ${this.api.getPagination()}`,
        });
        this.appendBodyElement({
            name: 'return pagination',
            value: `return ${this.gmServiceBuildResponseFormat.pagination(this.getPaginationValuesVarName())}`,
        });
    }
    getPaginationValuesVarName() {
        return 'paginationValues';
    }
}
exports.GmModuleControllerMethodGetPagination = GmModuleControllerMethodGetPagination;
//# sourceMappingURL=GmModuleControllerMethodGetPagination.js.map