"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodCreate = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleCreateDto_1 = require("../../dto/GmModuleCreateDto");
const GmServiceThrowAppError_1 = require("../../../services/errors/GmServiceThrowAppError");
const GmCrudConfigChecker_1 = require("../../../crudConfig/GmCrudConfigChecker");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const GmModuleMapper_1 = require("../../mapper/GmModuleMapper");
const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    createDto: 'createDto',
};
class GmModuleServiceMethodCreate extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleRepository, gmServiceSendActionSystemLog, callVarNames) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleCreateDto = new GmModuleCreateDto_1.GmModuleCreateDto(config);
        this.gmServiceThrowAppError = new GmServiceThrowAppError_1.GmServiceThrowAppError();
        this.gmModuleMapper = new GmModuleMapper_1.GmModuleMapper(config, {
            createDto: PROPS_VAR_NAMES.createDto,
            entity: this.getNewEntityPropertyVarName(),
            updateDto: '',
        });
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog;
        this.gmModuleRepository = gmModuleRepository;
        this.callVarNames = callVarNames;
    }
    getPropertyName() {
        return 'create';
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleCreateDto);
        this.addService(this.gmServiceThrowAppError);
        if (this.getConfig().hasMapper) {
            this.addModule(this.gmModuleMapper);
        }
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`);
        this.setPropsType('object');
        if (GmCrudConfigChecker_1.GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            });
        }
        this.addProp({
            varName: PROPS_VAR_NAMES.createDto,
            callVarName: this.callVarNames.createDto,
            type: this.gmModuleCreateDto.getPropertyName(),
            decorator: null,
        });
        this.createRow();
    }
    createRow() {
        if (!GmCrudConfigChecker_1.GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            if (this.getConfig().hasMapper) {
                this.appendBodyElement({
                    name: 'createRow',
                    value: `const ${this.getNewEntityPropertyVarName()} = await ${this.gmModuleRepository.api.create(this.getCreateEntityPropertyVarName())}`,
                    hasEmptyLineAtEnd: false,
                });
                this.appendBodyElement({
                    name: 'return row',
                    value: `return ${this.gmModuleMapper.api.entityToDto()}`
                });
                return;
            }
            this.appendBodyElement({
                name: 'createRow',
                value: `return ${this.gmModuleRepository.api.create(this.getCreateEntityPropertyVarName())}`,
                hasEmptyLineAtEnd: false,
            });
            return;
        }
        this.appendBodyElement({
            name: 'createRow',
            value: `const ${this.getNewEntityPropertyVarName()} = await ${this.gmModuleRepository.api.create(this.getCreateEntityPropertyVarName())}`,
            hasEmptyLineAtEnd: false,
        });
        if (this.getConfig().hasMapper) {
            this.appendBodyElement({
                name: 'entity to dto',
                value: `const ${this.getNewDtoVarName()} = ${this.gmModuleMapper.api.entityToDto()}`,
            });
        }
        this.appendBodyElement({
            name: 'SendActionSystemLogService',
            value: `await ${this.gmServiceSendActionSystemLog.logCreateAction({
                rowId: `${this.getDtoPropVarName()}.${GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`,
                value: this.getDtoPropVarName(),
                config: this.gmModuleRepository.api.getConfig(),
                initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
            })}`,
            hasEmptyLineAtEnd: true,
        });
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `return ${this.getDtoPropVarName()}`,
        });
    }
    getCreateEntityPropertyVarName() {
        if (this.getConfig().hasMapper) {
            return this.gmModuleMapper.api.createDtoToEntity();
        }
        return PROPS_VAR_NAMES.createDto;
    }
    getDtoPropVarName() {
        if (this.getConfig().hasMapper) {
            return this.getNewDtoVarName();
        }
        return this.getNewEntityPropertyVarName();
    }
    getNewDtoVarName() {
        return 'newDto';
    }
    getNewEntityPropertyVarName() {
        return 'newEntity';
    }
}
exports.GmModuleServiceMethodCreate = GmModuleServiceMethodCreate;
//# sourceMappingURL=GmModuleServiceMethodCreate.js.map