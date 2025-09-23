import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmServicePaginationQueryParamsType} from '@services/paginationTypes/GmServicePaginationQueryParamsType'
import {GmServicePaginationValuesType} from '@services/paginationTypes/GmServicePaginationValuesType'
import {IGmModuleModel} from '@modules/model/interfaces/gmModuleModel'
import {GmConfig} from 'os-core-ts'
import {StringCaseHelper} from '@helpers/StringCaseHelper'


const PROPS_VAR_NAMES = {
    params: 'params',
}

export  class GmModuleServiceMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmModuleDto: GmModuleDto
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmServicePaginationValuesType: GmServicePaginationValuesType
    private readonly gmModuleModel: IGmModuleModel
    private readonly callVarNames:typeof PROPS_VAR_NAMES
    
    constructor(
        config: GmConfig,
        gmModuleModel: IGmModuleModel,
        callVarNames:typeof PROPS_VAR_NAMES
    ) {
        super(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleModel = gmModuleModel
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServicePaginationValuesType = new GmServicePaginationValuesType()
        this.callVarNames = callVarNames
    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Pagination`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addService(this.gmServicePaginationQueryParamsType)
        this.addService(this.gmServicePaginationValuesType)

        this.setMethodScope('public')
        this.setAsyncType('async')

        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName:this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: null,
        })

        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`)

        this.appendBodyElement({
            name: 'returnPagination',
            value: `return ${this.gmModuleModel.api.pagination(PROPS_VAR_NAMES.params)}`,
        })
    }
}
