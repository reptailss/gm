import { GmConfig } from "../../../os-core";
import { GmAbstractModuleFn } from "../../abstractModule/GmAbstractModuleFn";
import { IGmModuleFn } from "../../interfaces/gmModule";
export declare abstract class GmAbstractModuleFnModelNoSql extends GmAbstractModuleFn implements IGmModuleFn {
    private readonly entityType;
    private readonly gmModuleDto;
    private readonly gmModuleEntityInstance;
    constructor(config: GmConfig);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    getEntityPropertyName(): string;
    getModelTypePropertyName(): string;
}
