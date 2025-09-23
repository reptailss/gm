import { GmConfig } from "../config/types";
import { IGmModuleClass } from "../modules/interfaces/gmModule";
export declare class GmGenerateAbstractCrudDec {
    private config;
    private controllers;
    constructor(config: GmConfig, controllers: IGmModuleClass[]);
    run(): void;
}
