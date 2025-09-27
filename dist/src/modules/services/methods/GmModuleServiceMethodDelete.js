"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodDelete = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmServiceThrowAppError_1 = require("../../../services/errors/GmServiceThrowAppError");
const GmServiceActionsLoggerService_1 = require("../../../services/sendActionSystemLog/GmServiceActionsLoggerService");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    id: 'id',
};
class GmModuleServiceMethodDelete extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleRepository, gmServiceSendActionSystemLog, callVarNames) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmServiceThrowAppError = new GmServiceThrowAppError_1.GmServiceThrowAppError();
        this.gmServiceSendActionSystemLog = new GmServiceActionsLoggerService_1.GmServiceActionsLoggerService();
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog;
        this.gmModuleRepository = gmModuleRepository;
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return 'delete';
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addService(this.gmServiceThrowAppError);
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'delete')) {
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            });
        }
        this.setPropsType('object');
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        });
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`);
        this.checkHasOldDto();
        this.deleteRow();
    }
    checkHasOldDto() {
        this.appendBodyElement({
            name: 'foundRow',
            value: `const ${this.getOldDtoVarName()} = await ${this.gmModuleRepository.api.findOne({
                where: {
                    [GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
            })}`,
        });
        this.appendBodyElement({
            name: 'errorFoundRow',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getOldDtoVarName()}`,
            }),
        });
    }
    deleteRow() {
        this.appendBodyElement({
            name: 'deleteRow',
            value: `await ${this.gmModuleRepository.api.destroy({
                where: {
                    [GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
            })}`,
            hasEmptyLineAtEnd: true,
        });
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'delete')) {
            this.appendBodyElement({
                name: 'SendActionSystemLogService',
                value: `await ${this.gmServiceSendActionSystemLog.logDeleteAction({
                    rowId: PROPS_VAR_NAMES.id,
                    oldValue: this.getOldDtoVarName(),
                    config: this.gmModuleRepository.api.getConfig(),
                    initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
                })}`,
                hasEmptyLineAtEnd: true,
            });
        }
        this.appendBodyElement({
            name: 'return oldDto',
            value: `return ${this.getOldDtoVarName()}`,
        });
    }
    getOldDtoVarName() {
        return 'oldDto';
    }
}
exports.GmModuleServiceMethodDelete = GmModuleServiceMethodDelete;
//# sourceMappingURL=GmModuleServiceMethodDelete.js.map