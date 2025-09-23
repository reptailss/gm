import { GmAbstractModuleType } from "../abstractModule/GmAbstractModuleType";
import { IGmModuleType } from "../interfaces/gmModule";
import { GmConfig } from "../../os-core";
export declare class GmModuleUpdateDto extends GmAbstractModuleType implements IGmModuleType {
    private readonly gmModuleCreateDto;
    constructor(config: GmConfig);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
