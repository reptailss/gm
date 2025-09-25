import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmServiceBuildResponseFormat} from '@services/buildResponseFormat/GmServiceBuildResponseFormat'
import {GmServiceMutateRowResultType} from '@services/resultTypes/GmServiceMutateRowResultType'
import {GmServiceUserInfoType} from '@services/userInfo/GmServiceUserInfoType'
import {GmModuleRoutePaths} from '@modules/routePaths/GmModuleRoutePaths'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleServiceApiDelete} from '@modules/services/interfaces/gmModuleServiceClassCurdApi'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'
import {GmSwaggerInfoDec} from '@decorators/controllerDecorators/GmSwaggerInfoDec'
import {GmDeleteDec} from '@decorators/controllerDecorators/GmDeleteDec'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmAuthDec} from '@decorators/controllerDecorators/GmAuthDec'
import {GmParamDec, GmParamNumDec} from '@decorators/controllerDecorators/GmParamDec'


export class GmModuleControllerMethodDelete extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {

    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServiceMutateRowResultType: GmServiceMutateRowResultType
    private readonly gmServiceUserInfoType: GmServiceUserInfoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths

    constructor(
        config: GmCrudConfig,
        private readonly api: IGmModuleServiceApiDelete,
        private readonly varNames: {
            userInfo: string
            id: string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType()
        this.gmServiceUserInfoType = new GmServiceUserInfoType()
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)


    }

    public getPropertyName(): string {
        return `delete${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}`
    }

    public init(): void {

        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServiceMutateRowResultType)
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type as 'string')}>`)
        this.appendDecorator(new GmSwaggerInfoDec(`Delete ${StringCaseHelper.toKebabCase(this.getConfig().dtoName.singular)}`))
        this.appendDecorator(new GmDeleteDec(this.gmModuleRoutePaths.getRoutePathPropertyName('delete')))



        this.setMethodScope('public')
        this.setAsyncType('async')

        if (GmCrudConfigChecker.hasAuth(this.getConfig(), 'delete')) {
            this.addService(this.gmServiceUserInfoType)
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userInfo,
                callVarName: this.varNames.userInfo,
                decorator: new GmAuthDec(),
            })
        }
        this.addProp({
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            varName: this.varNames.id,
            callVarName: this.varNames.id,
            decorator: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ?  new GmParamDec('id') : new GmParamNumDec('id')
        })
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getOldDtoPropertyVarName()} = await ${this.api.delete()}`,
        })

        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getOldDtoPropertyVarName()}.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        })
    }


    private getOldDtoPropertyVarName(): string {
        return 'oldDto'
    }
}
