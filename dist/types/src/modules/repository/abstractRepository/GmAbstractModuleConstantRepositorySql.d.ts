import { GmAbstractModuleConstant } from "../../abstractModule/GmAbstractModuleConstant";
import { IGmModuleConstant } from "../../interfaces/gmModule";
import { GmCrudConfig } from "../../../os-core";
export declare abstract class GmAbstractModuleConstantRepositorySql extends GmAbstractModuleConstant implements IGmModuleConstant {
    private readonly entityType;
    private readonly gmModuleEntityInstance;
    constructor(config: GmCrudConfig);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    getEntityPropertyName(): string;
    getRepositoryTypePropertyName(): string;
}
