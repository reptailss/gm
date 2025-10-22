"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleServiceMethodGetById = void 0;
const GmAbstractModuleClassMethod_1 = require("../../abstractModule/GmAbstractModuleClassMethod");
const GmModuleDto_1 = require("../../dto/GmModuleDto");
const GmModuleDtoHelper_1 = require("../../dto/helper/GmModuleDtoHelper");
const GmModuleMapper_1 = require("../../mapper/GmModuleMapper");
const PROPS_VAR_NAMES = {
    id: 'id',
};
class GmModuleServiceMethodGetById extends GmAbstractModuleClassMethod_1.GmAbstractModuleClassMethod {
    constructor(config, gmModuleRepository, callVarNames) {
        super(config);
        this.gmModuleDto = new GmModuleDto_1.GmModuleDto(config);
        this.gmModuleRepository = gmModuleRepository;
        this.callVarNames = callVarNames;
        this.gmModuleMapper = new GmModuleMapper_1.GmModuleMapper(config, {
            createDto: '',
            entity: this.getEntityVarName(),
            updateDto: '',
        });
    }
    getPropertyName() {
        return 'getById';
    }
    init() {
        this.addModule(this.gmModuleDto);
        if (this.getConfig().hasMapper) {
            this.addModule(this.gmModuleMapper);
        }
        this.setReturnType(`Promise<${this.gmModuleDto.getPropertyName()} | null>`);
        this.setMethodScope('public');
        this.setAsyncType('async');
        this.addProp({
            varName: PROPS_VAR_NAMES.id,
            callVarName: this.callVarNames.id,
            type: GmModuleDtoHelper_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type,
            decorator: null,
        });
        this.initGetRow();
    }
    initGetRow() {
        if (this.getConfig().hasMapper) {
            this.appendBodyElement({
                name: 'getRow',
                value: `const ${this.getEntityVarName()} =  await ${this.gmModuleRepository.api.findByPk(PROPS_VAR_NAMES.id)}`,
            });
            this.appendBodyElement({
                name: 'return null if not found',
                value: `if(!${this.getEntityVarName()}){
                    return null
                }`,
            });
            this.appendBodyElement({
                name: 'getRow',
                value: `return ${this.gmModuleMapper.api.entityToDto()}`,
            });
            return;
        }
        this.appendBodyElement({
            name: 'getRow',
            value: `return ${this.gmModuleRepository.api.findByPk(PROPS_VAR_NAMES.id)}`,
        });
    }
    getEntityVarName() {
        return 'entity';
    }
}
exports.GmModuleServiceMethodGetById = GmModuleServiceMethodGetById;
//# sourceMappingURL=GmModuleServiceMethodGetById.js.map