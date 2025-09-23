import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmConfig } from "../../../config/types";
import { IGmModuleServiceApiDelete } from "../../services/interfaces/gmModuleServiceClassCurdApi";
export declare class GmModuleControllerMethodDelete extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServiceMutateRowResultType;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, api: IGmModuleServiceApiDelete, varNames: {
        userInfo: string;
        id: string;
    });
    getPropertyName(): string;
    init(): void;
    private getOldDtoPropertyVarName;
}
