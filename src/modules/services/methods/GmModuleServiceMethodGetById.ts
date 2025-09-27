import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleDtoHelper} from '@modules/dto/helper/GmModuleDtoHelper'


const PROPS_VAR_NAMES = {
    id: 'id',
}

export class GmModuleServiceMethodGetById extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleRepository: IGmModuleRepository
    private readonly callVarNames: typeof PROPS_VAR_NAMES
    
    constructor(
        config: GmCrudConfig,
        gmModuleRepository: IGmModuleRepository,
        callVarNames: typeof PROPS_VAR_NAMES,
    ) {
        super(config)
        
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleRepository = gmModuleRepository
        this.callVarNames = callVarNames
    }
    
    public getPropertyName(): string {
        return 'getById'
    }
    
    public init(): void {
        this.addModule(this.gmModuleDto)
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()} | null>`)
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        })
        
        this.initGetRow()
    }
    
    private initGetRow() {
        this.appendBodyElement({
            name: 'getRow',
            value: `return ${this.gmModuleRepository.api.findByPk(PROPS_VAR_NAMES.id)}`,
        })
    }
    
    
}
