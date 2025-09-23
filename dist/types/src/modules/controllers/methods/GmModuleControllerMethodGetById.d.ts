import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmConfig } from "../../../os-core";
import { IGmModuleServiceApiGet } from "../../services/interfaces/gmModuleServiceClassCurdApi";
export declare class GmModuleControllerMethodGetById extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServiceRowResultType;
    private readonly gmServiceThrowAppError;
    private readonly gmModuleDto;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmConfig, api: IGmModuleServiceApiGet, varNames: {
        userInfo: string;
        id: string;
    });
    getPropertyName(): string;
    init(): void;
    private getDtoPropertyVarName;
}
