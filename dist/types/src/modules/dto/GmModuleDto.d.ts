import { GmAbstractModuleType } from "../abstractModule/GmAbstractModuleType";
import { IGmModuleType } from "../interfaces/gmModule";
import { GmConfig } from "../../config/types";
export declare class GmModuleDto extends GmAbstractModuleType implements IGmModuleType {
    private readonly gmModuleCreateDto;
    constructor(config: GmConfig);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
