import { GmAbstractModuleType } from "../abstractModule/GmAbstractModuleType";
import { IGmModuleType } from "../interfaces/gmModule";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleUpdateDto extends GmAbstractModuleType implements IGmModuleType {
    private readonly gmModuleCreateDto;
    constructor(config: GmCrudConfig);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
