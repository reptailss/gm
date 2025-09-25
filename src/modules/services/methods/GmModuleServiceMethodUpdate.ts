import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleUpdateDto} from '@modules/dto/GmModuleUpdateDto'
import {GmServiceThrowAppError} from '@services/errors/GmServiceThrowAppError'
import {GmServiceActionsLoggerService} from '@services/sendActionSystemLog/GmServiceActionsLoggerService'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    updateDto: 'updateDto',
    id: 'id',
}

export class GmModuleServiceMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmServiceThrowAppError: GmServiceThrowAppError
    private readonly gmServiceSendActionSystemLog: GmServiceActionsLoggerService
    private readonly gmModuleRepository: IGmModuleRepository
    private readonly callVarNames: typeof PROPS_VAR_NAMES
    
    constructor(
        config: GmCrudConfig,
        gmModuleRepository: IGmModuleRepository,
        gmServiceSendActionSystemLog: GmServiceActionsLoggerService,
        callVarNames: typeof PROPS_VAR_NAMES,
    ) {
        super(config)
        
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmServiceThrowAppError = new GmServiceThrowAppError()
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog
        this.gmModuleRepository = gmModuleRepository
        this.callVarNames = callVarNames
    }
    
    
    public getPropertyName(): string {
        return `update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`
    }
    
    public init(): void {
        
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleUpdateDto)
        this.addService(this.gmServiceThrowAppError)
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        
        if (GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'update')) {
            this.addService(this.gmServiceSendActionSystemLog)
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            })
        }
        
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`)
        this.setPropsType('object')
        
        this.addProp({
            varName: PROPS_VAR_NAMES.updateDto,
            callVarName: this.callVarNames.updateDto,
            type: this.gmModuleUpdateDto.getPropertyName(),
            decorator: null,
        })
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        })
        
        this.checkHasRow()
        
        this.updateRow()
        
    }
    
    private checkHasRow(): void {
        
        this.appendBodyElement({
            name: 'getOldRow',
            value: `const ${this.getOldEntityVarName()}  = await ${this.gmModuleRepository.api.findByPk(PROPS_VAR_NAMES.id)}`,
        })
        
        this.appendBodyElement({
            name: 'checkOldRow',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found.',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getOldEntityVarName()}`,
            }),
            hasEmptyLineAtEnd: true,
        })
    }
    
    
    private updateRow() {
        if (!GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.appendBodyElement({
                name: 'returnNewRow',
                value: `return ${this.gmModuleRepository.api.update(PROPS_VAR_NAMES.updateDto, {
                    where: {
                        [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                    },
                    returning: true,
                })}`,
            })
            return
        }
        
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `const ${this.getNewEntityVarName()} = await ${this.gmModuleRepository.api.update(PROPS_VAR_NAMES.updateDto, {
                where: {
                    [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
                returning: true,
            })}`,
        })
        
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
        })
        
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.getNewEntityVarName()}`,
        })
    }
    
    private getNewEntityVarName(): string {
        return 'newEntity'
    }
    
    private getOldEntityVarName(): string {
        return 'oldEntity'
    }
}
