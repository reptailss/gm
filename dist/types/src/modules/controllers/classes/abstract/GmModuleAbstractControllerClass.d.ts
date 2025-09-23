import { GmAbstractModuleClass } from "../../../abstractModule/GmAbstractModuleClass";
import { IGmModuleClass } from "../../../interfaces/gmModule";
import { GmConfig } from "../../../../config/types";
export declare abstract class GmModuleAbstractControllerClass extends GmAbstractModuleClass implements IGmModuleClass {
    private className;
    constructor(config: GmConfig, className: string);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
