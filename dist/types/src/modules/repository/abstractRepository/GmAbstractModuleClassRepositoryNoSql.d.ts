import { IGmModuleClass } from "../../interfaces/gmModule";
import { GmCrudConfig } from "../../../os-core";
import { GmAbstractModuleClass } from "../../abstractModule/GmAbstractModuleClass";
export declare abstract class GmAbstractModuleClassRepositoryNoSql extends GmAbstractModuleClass implements IGmModuleClass {
    private readonly repositoryVarName;
    private readonly gmModuleEntity;
    constructor(config: GmCrudConfig, repositoryVarName: string);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    getEntityInstance(): string;
    getEntityName(): string;
    init(): void;
}
