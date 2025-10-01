import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmServiceThrowAppError} from '@services/errors/GmServiceThrowAppError'
import {GmServiceActionsLoggerService} from '@services/sendActionSystemLog/GmServiceActionsLoggerService'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmCrudConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    createDto: 'createDto',
}

export class GmModuleServiceMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleCreateDto: GmModuleCreateDto
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
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
        this.gmServiceThrowAppError = new GmServiceThrowAppError()
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog
        this.gmModuleRepository = gmModuleRepository
        this.callVarNames = callVarNames
        
    }
    
    public getPropertyName(): string {
        return 'create'
    }
    
    public init(): void {
        
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleCreateDto)
        this.addService(this.gmServiceThrowAppError)
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`)
        this.setPropsType('object')
        
        if (GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName: this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            })
        }
        this.addProp({
            varName: PROPS_VAR_NAMES.createDto,
            callVarName: this.callVarNames.createDto,
            type: this.gmModuleCreateDto.getPropertyName(),
            decorator: null,
        })
        
        this.createRow()
        
    }
    
    private createRow(): void {
        if (!GmCrudConfigChecker.hasActionLogger(this.getConfig(), 'add')) {
            this.appendBodyElement({
                name: 'createRow',
                value: `return ${this.gmModuleRepository.api.create(PROPS_VAR_NAMES.createDto)}`,
                hasEmptyLineAtEnd: false,
            })
            return
        }
        
        this.appendBodyElement({
            name: 'createRow',
            value: `const ${this.getNewEntityPropertyVarName()} = await ${this.gmModuleRepository.api.create(PROPS_VAR_NAMES.createDto)}`,
            hasEmptyLineAtEnd: false,
        })
        
        this.appendBodyElement({
            name: 'SendActionSystemLogService',
            value: `await ${this.gmServiceSendActionSystemLog.logCreateAction({
                rowId: `${this.getNewEntityPropertyVarName()}.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`,
                value: this.getNewEntityPropertyVarName(),
                config: this.gmModuleRepository.api.getConfig(),
                initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
            })}`,
            hasEmptyLineAtEnd: true,
        })
        
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `return ${this.getNewEntityPropertyVarName()}`,
        })
        
    }
    
    private getNewEntityPropertyVarName(): string {
        return 'newEntity'
    }
}
