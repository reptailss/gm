import {GmAbstractModuleClassMethod} from '@modules/abstractModule/GmAbstractModuleClassMethod'
import {IGmModuleClassMethod} from '@modules/interfaces/gmModule'
import {GmModuleDto} from '@modules/dto/GmModuleDto'
import {GmServicePaginationQueryParamsType} from '@services/paginationTypes/GmServicePaginationQueryParamsType'
import {GmServicePaginationValuesType} from '@services/paginationTypes/GmServicePaginationValuesType'
import {GmServicePaginationNoSql} from '@services/pagination/GmServicePaginationNoSql'
import {GmCrudConfig} from 'os-core-ts'
import {IGmModuleRepository} from '@modules/repository/interfaces/gmModuleRepository'
import {GmModuleMapper} from '@modules/mapper/GmModuleMapper'
import {GmModuleFilterDto} from '@modules/dto/GmModuleFilterDto'


const PROPS_VAR_NAMES = {
    params: 'params',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
}

export class GmModuleServiceMethodGetPaginationNoSql extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    
    private readonly gmModuleDto: GmModuleDto
    private readonly gmServicePaginationQueryParamsType: GmServicePaginationQueryParamsType
    private readonly gmServicePaginationValuesType: GmServicePaginationValuesType
    private readonly gmServicePaginationNoSql: GmServicePaginationNoSql
    private readonly gmModuleFilterDto: GmModuleFilterDto
    private readonly callVarNames: typeof PROPS_VAR_NAMES
    private readonly gmModuleMapper: GmModuleMapper
    
    constructor(
        config: GmCrudConfig,
        gmModuleRepository: IGmModuleRepository,
        callVarNames: typeof PROPS_VAR_NAMES,
        private readonly loadRepositoryVarName:string
    ) {
        super(config)
        this.gmModuleDto = new GmModuleDto(config)
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType()
        this.gmServicePaginationValuesType = new GmServicePaginationValuesType()
        this.gmServicePaginationNoSql = new GmServicePaginationNoSql()
        this.gmModuleFilterDto = new GmModuleFilterDto(config)
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
        this.addService(this.gmServicePaginationQueryParamsType)
        this.addService(this.gmServicePaginationValuesType)
        this.addService(this.gmServicePaginationNoSql)
        
        if (this.getConfig().hasMapper) {
            this.addModule(this.gmModuleMapper)
        }
        
        this.setMethodScope('public')
        this.setAsyncType('async')
        
        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName: this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleFilterDto.getPropertyName()),
            decorator: null,
        })
        
        this.addProp({
            varName: PROPS_VAR_NAMES.dateStart,
            callVarName: this.callVarNames.dateStart,
            type: 'Date',
            decorator: null,
        })
        
        this.addProp({
            varName: PROPS_VAR_NAMES.dateEnd,
            callVarName: this.callVarNames.dateEnd,
            type: 'Date',
            decorator: null,
        })
        
        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`)
        
        
        if (this.getConfig().hasMapper) {
            
            this.appendBodyElement({
                name: 'create pagination',
                value: `const pagination = await ${this.gmServicePaginationNoSql.getPagination({
                    paramsVarName: PROPS_VAR_NAMES.params,
                    dateStartVarName: PROPS_VAR_NAMES.dateStart,
                    dateEndVarName: PROPS_VAR_NAMES.dateEnd,
                    loaderRepositoryVarName: this.loadRepositoryVarName,
                })}`,
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
                value: `return ${this.gmServicePaginationNoSql.getPagination({
                    paramsVarName: PROPS_VAR_NAMES.params,
                    dateStartVarName: PROPS_VAR_NAMES.dateStart,
                    dateEndVarName: PROPS_VAR_NAMES.dateEnd,
                    loaderRepositoryVarName: this.loadRepositoryVarName,
                })}`,
            })
        }
        
       
    }
    
    private getEntityVarName(): string {
        return 'entity'
    }
}
