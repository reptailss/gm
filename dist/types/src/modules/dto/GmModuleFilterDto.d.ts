import { GmAbstractModuleType } from "../abstractModule/GmAbstractModuleType";
import { IGmModuleType } from "../interfaces/gmModule";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleFilterDto extends GmAbstractModuleType implements IGmModuleType {
    constructor(config: GmCrudConfig);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    private generateDtoByColumns;
}
