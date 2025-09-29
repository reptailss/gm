import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmCrudConfig } from "../../../os-core";
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
    constructor(config: GmCrudConfig, api: IGmModuleServiceApiGet, varNames: {
        userDto: string;
        id: string;
    });
    getPropertyName(): string;
    init(): void;
    private getDtoPropertyVarName;
}
