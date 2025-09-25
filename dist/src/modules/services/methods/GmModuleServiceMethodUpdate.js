"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodUpdate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleUpdateDto_1 = require("../../dto/GmModuleUpdateDto");
const GmServiceThrowAppError_1 = require("../../../services/errors/GmServiceThrowAppError");
const StringCaseHelper_1 = require("../../../helpers/StringCaseHelper");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    updateDto: 'updateDto',
    id: 'id',
};
class GmModuleServiceMethodUpdate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleRepository, gmServiceSendActionSystemLog, callVarNames) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleUpdateDto = new GmModuleUpdateDto_1.GmModuleUpdateDto(config);
        this.gmServiceThrowAppError = new GmServiceThrowAppError_1.GmServiceThrowAppError();
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog;
        this.gmModuleRepository = gmModuleRepository;
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return `update${StringCaseHelper_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`;
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleUpdateDto);
        this.addService(this.gmServiceThrowAppError);
        this.setMethodScope('public');
        this.setAsyncType('async');
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'update')) {
            this.addService(this.gmServiceSendActionSystemLog);
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            });
        }
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`);
        this.setPropsType('object');
        this.addProp({
            varName: PROPS_VAR_NAMES.updateDto,
            callVarName: this.callVarNames.updateDto,
            type: this.gmModuleUpdateDto.getPropertyName(),
            decorator: null,
        });
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        });
        this.checkHasRow();
        this.updateRow();
    }
    checkHasRow() {
        this.appendBodyElement({
            name: 'getOldRow',
            value: `const ${this.getOldEntityVarName()}  = await ${this.gmModuleRepository.api.findByPk(PROPS_VAR_NAMES.id)}`,
        });
        this.appendBodyElement({
            name: 'checkOldRow',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found.',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getOldEntityVarName()}`,
            }),
            hasEmptyLineAtEnd: true,
        });
    }
    updateRow() {
        if (!GmCrudConfigChecker_1.GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.appendBodyElement({
                name: 'returnNewRow',
                value: `return ${this.gmModuleRepository.api.update(PROPS_VAR_NAMES.updateDto, {
                    where: {
                        [GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                    },
                    returning: true,
                })}`,
            });
            return;
        }
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `const ${this.getNewEntityVarName()} = await ${this.gmModuleRepository.api.update(PROPS_VAR_NAMES.updateDto, {
                where: {
                    [GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
                returning: true,
            })}`,
        });
        this.appendBodyElement({
            name: 'SendActionSystemLogService',
            value: `await ${this.gmServiceSendActionSystemLog.logUpdateAction({
                rowId: PROPS_VAR_NAMES.id,
                oldValue: this.getOldEntityVarName(),
                newValue: this.getNewEntityVarName(),
                config: this.gmModuleRepository.api.getConfig(),
                initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
            })}`,
            hasEmptyLineAtEnd: true,
        });
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.getNewEntityVarName()}`,
        });
    }
    getNewEntityVarName() {
        return 'newEntity';
    }
    getOldEntityVarName() {
        return 'oldEntity';
    }
}
exports.GmModuleServiceMethodUpdate = GmModuleServiceMethodUpdate;
//# sourceMappingURL=GmModuleServiceMethodUpdate.js.map