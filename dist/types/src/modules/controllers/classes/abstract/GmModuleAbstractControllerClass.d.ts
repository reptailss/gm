import { GmAbstractModuleClass } from "../../../abstractModule/GmAbstractModuleClass";
import { IGmModuleClass } from "../../../interfaces/gmModule";
import { GmCrudConfig } from 'os-core-ts';
export declare abstract class GmModuleAbstractControllerClass extends GmAbstractModuleClass implements IGmModuleClass {
    private className;
    constructor(config: GmCrudConfig, className: string);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
