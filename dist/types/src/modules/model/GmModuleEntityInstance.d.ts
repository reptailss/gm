import { IGmModuleConstant } from "../interfaces/gmModule";
import { GmConfig } from "../../os-core";
import { GmAbstractModuleConstant } from "../abstractModule/GmAbstractModuleConstant";
export declare class GmModuleEntityInstance extends GmAbstractModuleConstant implements IGmModuleConstant {
    private readonly gmModuleEntity;
    constructor(config: GmConfig);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    getExport(): null;
    init(): void;
}
