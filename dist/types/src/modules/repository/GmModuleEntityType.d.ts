import { GmAbstractModuleType } from "../abstractModule/GmAbstractModuleType";
import { IGmModuleType } from "../interfaces/gmModule";
import { GmCrudConfig } from 'os-core-ts';
export declare class GmModuleEntityType extends GmAbstractModuleType implements IGmModuleType {
    private readonly gmModuleEntity;
    constructor(config: GmCrudConfig);
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
    private getEntityName;
}
