import { GmAbstractModuleType } from "../abstractModule/GmAbstractModuleType";
import { IGmModuleType } from "../interfaces/gmModule";
export declare class GmModuleCreateDto extends GmAbstractModuleType implements IGmModuleType {
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    private generateDtoByColumns;
}
