import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmCrudConfig } from "../../../os-core";
import { IGmModuleServiceApiGetPagination } from "../../services/interfaces/gmModuleServiceClassCurdApi";
export declare class GmModuleControllerMethodGetPagination extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServicePaginationValues;
    private readonly gmServicePaginationQueryParamsType;
    private readonly gmModuleDto;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmCrudConfig, api: IGmModuleServiceApiGetPagination, varNames: {
        userInfo: string;
        params: string;
        paramsSchema: string;
    });
    getPropertyName(): string;
    init(): void;
    private getPaginationValuesVarName;
}
