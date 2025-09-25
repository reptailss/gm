import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmCrudConfig } from "../../../os-core";
import { IGmModuleServiceApiCreate } from "../../services/interfaces/gmModuleServiceClassCurdApi";
export declare class GmModuleControllerMethodCreate extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly api;
    private readonly varNames;
    private readonly gmServiceBuildResponseFormat;
    private readonly gmServiceMutateRowResultType;
    private readonly gmModuleCreateDto;
    private readonly gmServiceUserInfoType;
    private readonly gmModuleRoutePaths;
    constructor(config: GmCrudConfig, api: IGmModuleServiceApiCreate, varNames: {
        createDto: string;
        userInfo: string;
        createDtoSchema: string;
        createDtoType?: string;
    });
    getPropertyName(): string;
    init(): void;
    private getNewDtoPropertyVarName;
}
