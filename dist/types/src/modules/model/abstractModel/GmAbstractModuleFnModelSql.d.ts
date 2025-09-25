import { GmAbstractModuleFn } from "../../abstractModule/GmAbstractModuleFn";
import { IGmModuleFn } from "../../interfaces/gmModule";
import { GmConfig } from "../../../os-core";
export declare abstract class GmAbstractModuleFnModelSql extends GmAbstractModuleFn implements IGmModuleFn {
    private readonly entityType;
    private readonly gmModuleEntityInstance;
    constructor(config: GmConfig);
    abstract getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    getEntityPropertyName(): string;
    getModelTypePropertyName(): string;
}
