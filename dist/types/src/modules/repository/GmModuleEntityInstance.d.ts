import { IGmModuleConstant } from "../interfaces/gmModule";
import { GmCrudConfig } from 'os-core-ts';
import { GmAbstractModuleConstant } from "../abstractModule/GmAbstractModuleConstant";
export declare class GmModuleEntityInstance extends GmAbstractModuleConstant implements IGmModuleConstant {
    private readonly gmModuleEntity;
    constructor(config: GmCrudConfig);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    getExport(): null;
    init(): void;
}
