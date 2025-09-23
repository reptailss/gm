import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmConfig } from "../../../os-core";
import { IGmModuleModel } from "../../model/interfaces/gmModuleModel";
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
    constructor(config: GmConfig, gmModuleModel: IGmModuleModel, callVarNames: typeof PROPS_VAR_NAMES);
    getPropertyName(): string;
    init(): void;
}
export {};
