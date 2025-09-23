import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmServiceThrowAppError} from '@services/errors/GmServiceThrowAppError'
import {GmServiceActionsLoggerService} from '@services/sendActionSystemLog/GmServiceActionsLoggerService'
import {IGmModuleModel} from '@modules/model/interfaces/gmModuleModel'
import {GmConfig} from 'os-core-ts'
import {GmConfigChecker} from '@config/GmConfigChecker'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


const PROPS_VAR_NAMES = {
    initiatorOpenUserId: 'initiatorOpenUserId',
    id: 'id',
}

export  class GmModuleServiceMethodDelete extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleDto: GmModuleDto
    private readonly gmServiceThrowAppError: GmServiceThrowAppError
    private readonly gmServiceSendActionSystemLog: GmServiceActionsLoggerService
    private readonly gmModuleModel: IGmModuleModel
    private readonly callVarNames:typeof PROPS_VAR_NAMES
    
    constructor(
        config: GmConfig,
        gmModuleModel: IGmModuleModel,
        gmServiceSendActionSystemLog: GmServiceActionsLoggerService,
        callVarNames:typeof PROPS_VAR_NAMES
    ) {
        super(config)

        this.gmModuleDto = new GmModuleDto(config)
        this.gmServiceThrowAppError = new GmServiceThrowAppError()
        this.gmServiceSendActionSystemLog = new GmServiceActionsLoggerService()
        this.gmServiceSendActionSystemLog = gmServiceSendActionSystemLog
        this.gmModuleModel = gmModuleModel
        this.callVarNames = callVarNames
    }

    public getPropertyName(): string {
        return `delete${this.getConfig().dtoName.singular}ById`
    }

    public init(): void {

        this.addModule(this.gmModuleDto)
        this.addService(this.gmServiceThrowAppError)

        this.setMethodScope('public')
        this.setAsyncType('async')

        if (GmConfigChecker.hasActionLogger(this.getConfig(), 'delete')) {
            this.addProp({
                varName: PROPS_VAR_NAMES.initiatorOpenUserId,
                callVarName:this.callVarNames.initiatorOpenUserId,
                type: 'number',
                decorator: null,
            })
        }

        this.setPropsType('object')

        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName:this.callVarNames.id,
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        })
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()}>`)

        this.checkHasOldDto()

        this.deleteRow()
    }


    private checkHasOldDto() {
        this.appendBodyElement({
            name: 'foundRow',
            value: `const ${this.getOldDtoVarName()} = await ${this.gmModuleModel.api.findOne({
                filters: {
                    [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
            })}`,
        })
        this.appendBodyElement({
            name: 'errorFoundRow',
            value: this.gmServiceThrowAppError.throwAppError({
                message: 'Not found',
                errorKey: 'NOT_FOUND_ERROR',
                ifConstruction: `!${this.getOldDtoVarName()}`,
            }),
        })
    }

    private deleteRow() {

        this.appendBodyElement({
            name: 'deleteRow',
            value: `await ${this.gmModuleModel.api.destroy({
                filters: {
                    [GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key]: PROPS_VAR_NAMES.id,
                },
            })}`,
            hasEmptyLineAtEnd: true,
        })

        if (GmConfigChecker.hasActionLogger(this.getConfig(), 'delete')) {

            this.appendBodyElement({
                name: 'SendActionSystemLogService',
                value: `await ${this.gmServiceSendActionSystemLog.logDeleteAction({
                    rowId: PROPS_VAR_NAMES.id,
                    oldValue: this.getOldDtoVarName(),
                    config: this.gmModuleModel.api.getConfig(),
                    initiatorOpenUserId: PROPS_VAR_NAMES.initiatorOpenUserId,
                })}`,
                hasEmptyLineAtEnd: true,
            })
        }

        this.appendBodyElement({
            name: 'return oldDto',
            value: `return ${this.getOldDtoVarName()}`,
        })
    }


    private getOldDtoVarName(): string {
        return 'oldDto'
    }

}
