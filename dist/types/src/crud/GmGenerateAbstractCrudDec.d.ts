import { GmCrudConfig } from 'os-core-ts';
import { IGmModuleClass } from "../modules/interfaces/gmModule";
export declare class GmGenerateAbstractCrudDec {
    private config;
    private controllers;
    constructor(config: GmCrudConfig, controllers: IGmModuleClass[]);
    run(): void;
}
