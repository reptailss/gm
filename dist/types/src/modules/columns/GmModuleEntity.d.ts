import { IGmModuleClass } from "../interfaces/gmModule";
import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
export declare class GmModuleEntity extends GmAbstractModuleClass implements IGmModuleClass {
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
    private gmGetColumnRepositoryFromConfig;
    private getPropTypeByColumn;
    private getDecoratorByColumn;
}
