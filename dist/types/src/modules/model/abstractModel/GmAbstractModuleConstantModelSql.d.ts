import { GmAbstractModuleConstant } from "../../abstractModule/GmAbstractModuleConstant";
import { IGmModuleConstant } from "../../interfaces/gmModule";
import { GmConfig } from "../../../os-core";
export declare abstract class GmAbstractModuleConstantModelSql extends GmAbstractModuleConstant implements IGmModuleConstant {
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
