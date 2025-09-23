import { GmAbstractModuleConstant } from "../abstractModule/GmAbstractModuleConstant";
import { IGmModuleClass, IGmModuleConstant } from "../interfaces/gmModule";
import { GmConfig } from "../../config/types";
export declare class GmModuleAppModule extends GmAbstractModuleConstant implements IGmModuleConstant {
    private controllers;
    constructor(config: GmConfig, controllers: IGmModuleClass[]);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
}
