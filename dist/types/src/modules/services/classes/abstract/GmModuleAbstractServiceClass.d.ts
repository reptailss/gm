import { GmAbstractModuleClass } from "../../../abstractModule/GmAbstractModuleClass";
import { IGmModuleClass } from "../../../interfaces/gmModule";
import { GmCrudConfig } from 'os-core-ts';
export declare abstract class GmModuleAbstractServiceClass extends GmAbstractModuleClass implements IGmModuleClass {
    private className;
    constructor(config: GmCrudConfig, className: string);
    abstract init(): void;
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
}
