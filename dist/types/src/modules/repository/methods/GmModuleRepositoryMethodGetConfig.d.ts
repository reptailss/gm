import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { GmCrudConfig } from "../../../os-core";
export declare class GmModuleRepositoryMethodGetConfig extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly repositoryVarName;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}
