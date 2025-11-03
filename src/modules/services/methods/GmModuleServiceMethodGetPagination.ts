import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmServicePaginationQueryParamsType} from '@services/paginationTypes/GmServicePaginationQueryParamsType'
import {GmServicePaginationValuesType} from '@services/paginationTypes/GmServicePaginationValuesType'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmCrudConfig} from 'os-core-ts'
import {GmModuleMapper} from '@modules/mapper/GmModuleMapper'
import {GmModuleFilterDto} from '@modules/dto/GmModuleFilterDto'


const PROPS_VAR_NAMES = {
    params: 'params',
}

export class GmModuleServiceMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleDto: GmModuleDto
    private readonly gmModuleFilterDto: GmModuleFilterDto
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmServicePaginationValuesType: GmServicePaginationValuesType
    private readonly gmModuleRepository: IGmModuleRepository
    private readonly callVarNames: typeof PROPS_VAR_NAMES
    private readonly gmModuleMapper: GmModuleMapper
    
    constructor(
        config: GmCrudConfig,
        gmModuleRepository: IGmModuleRepository,
        callVarNames: typeof PROPS_VAR_NAMES,
    ) {
        super(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmModuleFilterDto = new GmModuleFilterDto(config)
        this.gmModuleRepository = gmModuleRepository
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServicePaginationValuesType = new GmServicePaginationValuesType()
        this.callVarNames = callVarNames
        this.gmModuleMapper = new GmModuleMapper(config, {
            createDto: '',
            entity: this.getEntityVarName(),
            updateDto: '',
        })
    }
    
    public getPropertyName(): string {
        return 'pagination'
    }
    
    public init(): void {
        this.addModule(this.gmModuleDto)
        this.addModule(this.gmModuleFilterDto)
        if (this.getConfig().hasMapper) {
            this.addModule(this.gmModuleMapper)
        }
        this.addService(this.gmServicePaginationQueryParamsType)
        this.addService(this.gmServicePaginationValuesType)
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        
        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName: this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleFilterDto.getPropertyName()),
            decorator: null,
        })
        
        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`)
        
        
        if (this.getConfig().hasMapper) {
            this.appendBodyElement({
                name: 'create pagination',
                value: `const pagination = await ${this.gmModuleRepository.api.pagination(PROPS_VAR_NAMES.params)}`,
            })
            this.appendBodyElement({
                name: 'returnPagination',
                value: `return {
                    per_page: pagination.per_page,
                    all_pages: pagination.all_pages,
                    page: pagination.page,
                    all_rows: pagination.all_rows,
                    rows: pagination.rows.map((${this.getEntityVarName()}) => ${this.gmModuleMapper.api.entityToDto()})
        }`,
            })
            
        } else {
            this.appendBodyElement({
                name: 'returnPagination',
                value: `return ${this.gmModuleRepository.api.pagination(PROPS_VAR_NAMES.params)}`,
            })
        }
        
    }
    
    private getEntityVarName(): string {
        return 'entity'
    }
}
