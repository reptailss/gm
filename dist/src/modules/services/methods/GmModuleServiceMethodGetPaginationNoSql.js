"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodGetPaginationNoSql = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmServicePaginationQueryParamsType_1 = require("../../../services/paginationTypes/GmServicePaginationQueryParamsType");
const GmServicePaginationValuesType_1 = require("../../../services/paginationTypes/GmServicePaginationValuesType");
const GmServicePaginationNoSql_1 = require("../../../services/pagination/GmServicePaginationNoSql");
const GmModuleMapper_1 = require("../../mapper/GmModuleMapper");
const GmModuleFilterDto_1 = require("../../dto/GmModuleFilterDto");
const PROPS_VAR_NAMES = {
    params: 'params',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
};
class GmModuleServiceMethodGetPaginationNoSql extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleRepository, callVarNames, loadRepositoryVarName) {
        super(config);
        this.loadRepositoryVarName = loadRepositoryVarName;
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType_1.GmServicePaginationQueryParamsType();
        this.gmServicePaginationValuesType = new GmServicePaginationValuesType_1.GmServicePaginationValuesType();
        this.gmServicePaginationNoSql = new GmServicePaginationNoSql_1.GmServicePaginationNoSql();
        this.gmModuleFilterDto = new GmModuleFilterDto_1.GmModuleFilterDto(config);
        this.callVarNames = callVarNames;
        this.gmModuleMapper = new GmModuleMapper_1.GmModuleMapper(config, {
            createDto: '',
            entity: this.getEntityVarName(),
            updateDto: '',
        });
    }
    getPropertyName() {
        return 'pagination';
    }
    init() {
        this.addModule(this.gmModuleDto);
        this.addModule(this.gmModuleFilterDto);
        this.addService(this.gmServicePaginationQueryParamsType);
        this.addService(this.gmServicePaginationValuesType);
        this.addService(this.gmServicePaginationNoSql);
        if (this.getConfig().hasMapper) {
            this.addModule(this.gmModuleMapper);
        }
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName: this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleFilterDto.getPropertyName()),
            decorator: null,
        });
        this.addProp({
            varName: PROPS_VAR_NAMES.dateStart,
            callVarName: this.callVarNames.dateStart,
            type: 'Date',
            decorator: null,
        });
        this.addProp({
            varName: PROPS_VAR_NAMES.dateEnd,
            callVarName: this.callVarNames.dateEnd,
            type: 'Date',
            decorator: null,
        });
        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`);
        if (this.getConfig().hasMapper) {
            this.appendBodyElement({
                name: 'create pagination',
                value: `const pagination = await ${this.gmServicePaginationNoSql.getPagination({
                    paramsVarName: PROPS_VAR_NAMES.params,
                    dateStartVarName: PROPS_VAR_NAMES.dateStart,
                    dateEndVarName: PROPS_VAR_NAMES.dateEnd,
                    loaderRepositoryVarName: this.loadRepositoryVarName,
                })}`,
            });
            this.appendBodyElement({
                name: 'returnPagination',
                value: `return {
                    per_page: pagination.per_page,
                    all_pages: pagination.all_pages,
                    page: pagination.page,
                    all_rows: pagination.all_rows,
                    rows: pagination.rows.map((${this.getEntityVarName()}) => ${this.gmModuleMapper.api.entityToDto()})
        }`,
            });
        }
        else {
            this.appendBodyElement({
                name: 'returnPagination',
                value: `return ${this.gmServicePaginationNoSql.getPagination({
                    paramsVarName: PROPS_VAR_NAMES.params,
                    dateStartVarName: PROPS_VAR_NAMES.dateStart,
                    dateEndVarName: PROPS_VAR_NAMES.dateEnd,
                    loaderRepositoryVarName: this.loadRepositoryVarName,
                })}`,
            });
        }
    }
    getEntityVarName() {
        return 'entity';
    }
}
exports.GmModuleServiceMethodGetPaginationNoSql = GmModuleServiceMethodGetPaginationNoSql;
//# sourceMappingURL=GmModuleServiceMethodGetPaginationNoSql.js.map