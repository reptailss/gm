import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmServiceBuildResponseFormat} from '@services/buildResponseFormat/GmServiceBuildResponseFormat'
import {GmServicePaginationValues} from '@services/resultTypes/GmServicePaginationResultType'
import {GmServicePaginationQueryParamsType} from '@services/paginationTypes/GmServicePaginationQueryParamsType'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmServiceUserInfoType} from '@services/userInfo/GmServiceUserInfoType'
import {GmModuleRoutePaths} from '@modules/routePaths/GmModuleRoutePaths'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleServiceApiGetPagination} from '@modules/services/interfaces/gmModuleServiceClassCurdApi'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmSwaggerInfoDec} from '@decorators/controllerDecorators/GmSwaggerInfoDec'
import {GmGetDec} from '@decorators/controllerDecorators/GmGetDec'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmAuthDec} from '@decorators/controllerDecorators/GmAuthDec'
import {GmPaginationQueryParamsDec} from '@decorators/controllerDecorators/GmPaginationQueryParamsDec'


export class GmModuleControllerMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServicePaginationValues: GmServicePaginationValues
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmModuleDto: GmModuleDto
    private readonly gmServiceUserInfoType: GmServiceUserInfoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmCrudConfig,
        private readonly api: IGmModuleServiceApiGetPagination,
        private readonly varNames: {
            userInfo: string
            params: string
            paramsSchema: string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServicePaginationValues = new GmServicePaginationValues()
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServiceUserInfoType = new GmServiceUserInfoType()
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)


    }

    public getPropertyName(): string {
        return `get${StringCaseHelper.toPascalCase(this.getConfig().dtoName.plural)}Pagination`
    }

    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServicePaginationValues)
        this.addService(this.gmServicePaginationQueryParamsType)
        this.setReturnType(`Promise<${this.gmServicePaginationValues.getPaginationResultType(this.gmModuleDto.getPropertyName())}>`)

        this.appendDecorator(new GmSwaggerInfoDec(`Get ${StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural)} list`))
        this.appendDecorator(new GmGetDec(this.gmModuleRoutePaths.getRoutePathPropertyName('list')))

        this.setMethodScope('public')
        this.setAsyncType('async')

        if (GmCrudConfigChecker.hasAuth(this.getConfig(), 'list')) {
            this.addService(this.gmServiceUserInfoType)
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new GmAuthDec(),
            })
        }
        this.addProp({
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: new GmPaginationQueryParamsDec(this.varNames.paramsSchema),
            callVarName: this.varNames.params,
            varName: this.varNames.params,
        })
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getPaginationValuesVarName()} = await ${this.api.getPagination()}`,
        })

        this.appendBodyElement({
            name: 'return pagination',
            value: `return ${this.gmServiceBuildResponseFormat.pagination(this.getPaginationValuesVarName())}`,
        })
    }


    private getPaginationValuesVarName(): string {
        return 'paginationValues'
    }
}
