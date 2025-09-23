import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { IGmModuleModel } from "../../model/interfaces/gmModuleModel";
import { GmConfig } from "../../../os-core";
declare const PROPS_VAR_NAMES: {
    params: string;
};
export declare class GmModuleServiceMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly gmModuleDto;
    private readonly gmServicePaginationQueryParamsType;
    private readonly gmServicePaginationValuesType;
    private readonly gmModuleModel;
    private readonly callVarNames;
    constructor(config: GmConfig, gmModuleModel: IGmModuleModel, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
}
export {};
