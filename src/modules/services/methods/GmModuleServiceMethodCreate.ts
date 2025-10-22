import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmModuleCreateDto} from '@modules/dto/GmModuleCreateDto'
import {GmServiceThrowAppError} from '@services/errors/GmServiceThrowAppError'
import {GmServiceActionsLoggerService} from '@services/sendActionSystemLog/GmServiceActionsLoggerService'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmCrudConfig} from 'os-core-ts'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'
import {GmModuleMapper} from '@modules/mapper/GmModuleMapper'


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
    private readonly gmModuleMapper: GmModuleMapper
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
        this.gmModuleMapper = new GmModuleMapper(config, {
            createDto: PROPS_VAR_NAMES.createDto,
            entity: this.getNewEntityPropertyVarName(),
            updateDto: '',
        })
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
        if (this.getConfig().hasMapper) {
            this.addModule(this.gmModuleMapper)
        }
        
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
            if(this.getConfig().hasMapper) {
                this.appendBodyElement({
                    name: 'createRow',
                    value: `const ${this.getNewEntityPropertyVarName()} = await ${this.gmModuleRepository.api.create(this.getCreateEntityPropertyVarName())}`,
                    hasEmptyLineAtEnd: false,
                })
                this.appendBodyElement({
                    name:'return row',
                    value:`return ${this.gmModuleMapper.api.entityToDto()}`
                })
                return
            }
            this.appendBodyElement({
                name: 'createRow',
                value: `return ${this.gmModuleRepository.api.create(this.getCreateEntityPropertyVarName())}`,
                hasEmptyLineAtEnd: false,
            })
            return
        }
        
        this.appendBodyElement({
            name: 'createRow',
            value: `const ${this.getNewEntityPropertyVarName()} = await ${this.gmModuleRepository.api.create(this.getCreateEntityPropertyVarName())}`,
            hasEmptyLineAtEnd: false,
        })
        
        if (this.getConfig().hasMapper) {
            this.appendBodyElement({
                name: 'entity to dto',
                value: `const ${this.getNewDtoVarName()} = ${this.gmModuleMapper.api.entityToDto()}`,
            })
        }
        
        this.appendBodyElement({
            name: 'SendActionSystemLogService',
            value: `await ${this.gmServiceSendActionSystemLog.logCreateAction({
                rowId: `${this.getDtoPropVarName()}.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`,
                value: this.getDtoPropVarName(),
                config: this.gmModuleRepository.api.getConfig(),
                initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
            })}`,
            hasEmptyLineAtEnd: true,
        })
        
        this.appendBodyElement({
            name: 'returnNewRow',
            value: `return ${this.getDtoPropVarName()}`,
        })
        
    }
    
    private getCreateEntityPropertyVarName(): string {
        if (this.getConfig().hasMapper) {
            return this.gmModuleMapper.api.createDtoToEntity()
        }
        return PROPS_VAR_NAMES.createDto
    }
    
    private getDtoPropVarName(): string {
        if (this.getConfig().hasMapper) {
            return this.getNewDtoVarName()
        }
        return this.getNewEntityPropertyVarName()
    }
    
    private getNewDtoVarName(): string {
        return  'newDto'
    }
    
    private getNewEntityPropertyVarName(): string {
        return 'newEntity'
    }
}
