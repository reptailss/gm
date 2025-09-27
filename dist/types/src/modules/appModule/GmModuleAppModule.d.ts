import { GmAbstractModuleConstant } from "../abstractModule/GmAbstractModuleConstant";
import { IGmModuleClass, IGmModuleConstant } from "../interfaces/gmModule";
import { GmCrudConfig } from 'os-core-ts';
export declare class GmModuleAppModule extends GmAbstractModuleConstant implements IGmModuleConstant {
    private controllers;
    constructor(config: GmCrudConfig, controllers: IGmModuleClass[]);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    init(): void;
}
