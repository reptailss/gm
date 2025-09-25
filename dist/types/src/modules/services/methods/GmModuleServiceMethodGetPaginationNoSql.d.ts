import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmCrudConfig } from "../../../os-core";
import { IGmModuleRepository } from "../../repository/interfaces/gmModuleRepository";
declare const PROPS_VAR_NAMES: {
    params: string;
    dateStart: string;
    dateEnd: string;
};
export declare class GmModuleServiceMethodGetPaginationNoSql extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmServicePaginationQueryParamsType;
    private readonly gmServicePaginationValuesType;
    private readonly gmServicePaginationNoSql;
    private readonly callVarNames;
    constructor(config: GmCrudConfig, gmModuleRepository: IGmModuleRepository, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
}
export {};
