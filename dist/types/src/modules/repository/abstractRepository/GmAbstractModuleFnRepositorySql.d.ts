import { GmAbstractModuleFn } from "../../abstractModule/GmAbstractModuleFn";
import { IGmModuleFn } from "../../interfaces/gmModule";
import { GmCrudConfig } from "../../../os-core";
export declare abstract class GmAbstractModuleFnRepositorySql extends GmAbstractModuleFn implements IGmModuleFn {
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
