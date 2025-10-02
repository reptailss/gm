import { IGmModuleClassMethod } from "../../interfaces/gmModule";
import { GmAbstractModuleClassMethod } from "../../abstractModule/GmAbstractModuleClassMethod";
import { GmCrudConfig } from "../../../os-core";
import { GmModuleEntity } from "../../entity/GmModuleEntity";
export declare class GmModuleNoSqlRepositoryMethodCount extends GmAbstractModuleClassMethod implements IGmModuleClassMethod {
    private readonly repositoryVarName;
    readonly gmModuleEntity: GmModuleEntity;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    getPropertyName(): string;
    init(): void;
}
