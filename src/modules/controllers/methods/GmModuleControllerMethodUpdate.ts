import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmServiceBuildResponseFormat} from '@services/buildResponseFormat/GmServiceBuildResponseFormat'
import {GmServiceMutateRowResultType} from '@services/resultTypes/GmServiceMutateRowResultType'
import {GmModuleUpdateDto} from '@modules/dto/GmModuleUpdateDto'
import {GmServiceUserDtoType} from '@services/userDto/GmServiceUserDtoType'
import {GmModuleRoutePaths} from '@modules/routePaths/GmModuleRoutePaths'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleServiceApiUpdate} from '@modules/services/interfaces/gmModuleServiceClassCurdApi'
import {StringCaseHelper} from '@helpers/StringCaseHelper'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'
import {GmSwaggerInfoDec} from '@decorators/controllerDecorators/GmSwaggerInfoDec'
import {GmPutDec} from '@decorators/controllerDecorators/GmPutDec'
import {GmBodyDec} from '@decorators/controllerDecorators/GmBodyDec'
import {GmCrudConfigChecker} from '@crudConfig/GmCrudConfigChecker'
import {GmAuthDec} from '@decorators/controllerDecorators/GmAuthDec'
import {GmParamDec, GmParamNumDec} from '@decorators/controllerDecorators/GmParamDec'


export class GmModuleControllerMethodUpdate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmServiceBuildResponseFormat: GmServiceBuildResponseFormat
    private readonly gmServiceMutateRowResultType: GmServiceMutateRowResultType
    private readonly gmModuleUpdateDto: GmModuleUpdateDto
    private readonly gmServiceUserInfoType: GmServiceUserDtoType
    private readonly gmModuleRoutePaths: GmModuleRoutePaths
    
    constructor(
        config: GmCrudConfig,
        private readonly api: IGmModuleServiceApiUpdate,
        private readonly varNames: {
            updateDto: string
            userDto: string
            updateDtoSchema: string
            id: string
            updateDtoType?: string
        },
    ) {
        super(config)
        this.gmServiceBuildResponseFormat = new GmServiceBuildResponseFormat()
        this.gmServiceMutateRowResultType = new GmServiceMutateRowResultType()
        this.gmServiceUserInfoType = new GmServiceUserDtoType()
        this.gmModuleUpdateDto = new GmModuleUpdateDto(config)
        this.gmModuleRoutePaths = new GmModuleRoutePaths(config)
        
        
    }
    
    public getPropertyName(): string {
        return 'update'
    }
    
    public init(): void {
        this.addModule(this.gmModuleUpdateDto)
        this.addModule(this.gmModuleRoutePaths)
        this.addService(this.gmServiceBuildResponseFormat)
        this.addService(this.gmServiceMutateRowResultType)
        this.setReturnType(`Promise<${this.gmServiceMutateRowResultType.getMutateRowResultType(GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type as 'string')}>`)
        
        this.appendDecorator(new GmSwaggerInfoDec(`Update ${StringCaseHelper.toKebabCase(this.getConfig().dtoName.singular)} by id`))
        this.appendDecorator(new GmPutDec(this.gmModuleRoutePaths.getRoutePathPropertyName('update')))
        
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        this.addProp({
            type: this.varNames.updateDtoType || this.gmModuleUpdateDto.getPropertyName(),
            varName: this.varNames.updateDto,
            callVarName: this.varNames.updateDto,
            decorator: new GmBodyDec(this.varNames.updateDtoSchema),
        })
        if (GmCrudConfigChecker.hasAuth(this.getConfig(), 'update')) {
            this.addService(this.gmServiceUserInfoType)
            this.addProp({
                type: this.gmServiceUserInfoType.getUserInfoType(),
                varName: this.varNames.userDto,
                callVarName: this.varNames.userDto,
                decorator: new GmAuthDec(),
            })
        }
        this.addProp({
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            varName: this.varNames.id,
            callVarName: this.varNames.id,
            decorator: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type === 'string' ? new GmParamDec('id') : new GmParamNumDec('id'),
        })
        this.appendBodyElement({
            name: 'create row',
            value: `const ${this.getNewDtoPropertyVarName()} = await ${this.api.update()}`,
        })
        
        this.appendBodyElement({
            name: 'return row',
            value: `return ${this.gmServiceBuildResponseFormat.mutateRow(`${this.getNewDtoPropertyVarName()}.${GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}`)}`,
        })
    }
    
    
    private getNewDtoPropertyVarName(): string {
        return 'newDto'
    }
}
