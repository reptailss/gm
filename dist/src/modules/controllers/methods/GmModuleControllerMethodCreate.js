"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleControllerMethodCreate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmServiceBuildResponseFormat_1 = require("../../../services/buildResponseFormat/GmServiceBuildResponseFormat");
const GmServiceMutateRowResultType_1 = require("../../../services/resultTypes/GmServiceMutateRowResultType");
const GmModuleCreateDto_1 = require("../../dto/GmModuleCreateDto");
const GmServiceUserInfoType_1 = require("../../../services/userInfo/GmServiceUserInfoType");
const GmModuleRoutePaths_1 = require("../../routePaths/GmModuleRoutePaths");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const GmSwaggerInfoDec_1 = require("../../../decorators/controllerDecorators/GmSwaggerInfoDec");
const GmPostDec_1 = require("../../../decorators/controllerDecorators/GmPostDec");
const GmBodyDec_1 = require("../../../decorators/controllerDecorators/GmBodyDec");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmAuthDec_1 = require("../../../decorators/controllerDecorators/GmAuthDec");
class GmModuleControllerMethodCreate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, api, varNames) {
        super(config);
        this.api = api;
        this.varNames = varNames;
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat_1.GmServiceBuildResponseFormat();
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType_1.GmServiceMutateRowResultType();
        this.gmServiceUserInfoType = new GmServiceUserInfoType_1.GmServiceUserInfoType();
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmModuleRoutePaths = new GmModuleRoutePaths_1.GmModuleRoutePaths(config);
    }
    getPropertyName() {
        return `create${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`;
    }
    init() {
        this.addModule(this.gmModuleCreateDto);
        this.addModule(this.gmModuleRoutePaths);
        this.addService(this.gmServiceBuildResponseFormat);
        this.addService(this.gmServiceMutateRowResultType);
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type)}>`);
        this.appendDecorator(new GmSwaggerInfoDec_1.GmSwaggerInfoDec(`Add new ${StringCaseHelper_1.StringCaseHelper.toKebabCase(this.getConfig().dtoName.singular)}`));
        this.appendDecorator(new GmPostDec_1.GmPostDec(this.gmModuleRoutePaths.getRoutePathPropertyName('add')));
        this.setAsyncType('async');
        this.setMethodScope('public');
        this.addProp({
            type: this.varNames.createDtoType || this.gmModuleCreateDto.getPropertyName(),
            varName: this.varNames.createDto,
            callVarName: this.varNames.createDto,
            decorator: new GmBodyDec_1.GmBodyDec(this.varNames.createDtoSchema),
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasAuth(this.getConfig(), 'add')) {
            this.addService(this.gmServiceUserInfoType);
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new GmAuthDec_1.GmAuthDec(),
            });
        }
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.api.create()}`,
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
exports.GmModuleControllerMethodCreate = GmModuleControllerMethodCreate;
//# sourceMappingURL=GmModuleControllerMethodCreate.js.map