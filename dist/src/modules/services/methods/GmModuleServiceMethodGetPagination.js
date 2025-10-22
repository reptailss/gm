"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodGetPagination = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmServicePaginationQueryParamsType_1 = require("../../../services/paginationTypes/GmServicePaginationQueryParamsType");
const GmServicePaginationValuesType_1 = require("../../../services/paginationTypes/GmServicePaginationValuesType");
const GmModuleMapper_1 = require("../../mapper/GmModuleMapper");
const PROPS_VAR_NAMES = {
    params: 'params',
};
class GmModuleServiceMethodGetPagination extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleRepository, callVarNames) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleRepository = gmModuleRepository;
        this.gmServicePaginationQueryParamsType = new GmServicePaginationQueryParamsType_1.GmServicePaginationQueryParamsType();
        this.gmServicePaginationValuesType = new GmServicePaginationValuesType_1.GmServicePaginationValuesType();
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
        if (this.getConfig().hasMapper) {
            this.addModule(this.gmModuleMapper);
        }
        this.addService(this.gmServicePaginationQueryParamsType);
        this.addService(this.gmServicePaginationValuesType);
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            varName: PROPS_VAR_NAMES.params,
            callVarName: this.callVarNames.params,
            type: this.gmServicePaginationQueryParamsType.getPaginationQueryParamsType(this.gmModuleDto.getPropertyName()),
            decorator: null,
        });
        this.setReturnType(`Promise<${this.gmServicePaginationValuesType.getPaginationValuesType(this.gmModuleDto.getPropertyName())}>`);
        if (this.getConfig().hasMapper) {
            this.appendBodyElement({
                name: 'create pagination',
                value: `const pagination = await ${this.gmModuleRepository.api.pagination(PROPS_VAR_NAMES.params)}`,
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
                value: `return ${this.gmModuleRepository.api.pagination(PROPS_VAR_NAMES.params)}`,
            });
        }
    }
    getEntityVarName() {
        return 'entity';
    }
}
exports.GmModuleServiceMethodGetPagination = GmModuleServiceMethodGetPagination;
//# sourceMappingURL=GmModuleServiceMethodGetPagination.js.map