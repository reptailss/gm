import { GmAbstractModuleConstant } from "../abstractModule/GmAbstractModuleConstant";
import { IGmModuleConstant } from "../interfaces/gmModule";
import { GmCrudConfig } from 'os-core-ts';
export declare class GmModuleRoutePaths extends GmAbstractModuleConstant implements IGmModuleConstant {
    constructor(config: GmCrudConfig);
    getPropertyName(): string;
    getDirName(): string | null;
    getFileName(): string;
    getRoutePathPropertyName(type: 'add' | 'update' | 'delete' | 'get' | 'list'): string;
    init(): void;
    private getModuleKey;
}
