import { GmCrudConfig } from 'os-core-ts';
import { GmAbstractModuleFn } from "../../abstractModule/GmAbstractModuleFn";
import { IGmModuleFn } from "../../interfaces/gmModule";
export declare abstract class GmAbstractModuleFnRepositoryNoSql extends GmAbstractModuleFn implements IGmModuleFn {
    private readonly entityType;
    private readonly gmModuleDto;
    private readonly gmModuleEntityInstance;
    constructor(config: GmCrudConfig);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    getEntityPropertyName(): string;
    getRepositoryTypePropertyName(): string;
}
