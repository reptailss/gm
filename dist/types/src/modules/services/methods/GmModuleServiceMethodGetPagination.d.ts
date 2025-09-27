import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { IGmModuleRepository } from "../../repository/interfaces/gmModuleRepository";
import { GmCrudConfig } from 'os-core-ts';
declare const PROPS_VAR_NAMES: {
    params: string;
};
export declare class GmModuleServiceMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmServicePaginationQueryParamsType;
    private readonly gmServicePaginationValuesType;
    private readonly gmModuleRepository;
    private readonly callVarNames;
    constructor(config: GmCrudConfig, gmModuleRepository: IGmModuleRepository, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
}
export {};
