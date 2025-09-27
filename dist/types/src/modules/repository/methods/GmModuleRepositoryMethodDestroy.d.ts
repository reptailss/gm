import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { GmCrudConfig } from "../../../os-core";
import { GmModuleEntity } from "../../entity/GmModuleEntity";
import { GmModuleDto } from "../../dto/GmModuleDto";
export declare class GmModuleRepositoryMethodDestroy extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly repositoryVarName;
    readonly gmModuleEntity: GmModuleEntity;
    readonly gmModuleDto: GmModuleDto;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}
