import { GmAbstractModuleClass } from "../../../abstractModule/GmAbstractModuleClass";
import { IGmModuleClass } from "../../../interfaces/gmModule";
import { GmConfig } from "../../../../config/types";
export declare abstract class GmModuleAbstractServiceClass extends GmAbstractModuleClass implements IGmModuleClass {
    private className;
    constructor(config: GmConfig, className: string);
    abstract init(): void;
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
}
