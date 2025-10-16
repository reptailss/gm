import { GmAbstractModuleConstant } from "../abstractModule/GmAbstractModuleConstant";
import { IGmModule } from "../interfaces/gmModule";
export declare class GmModuleDbConnectionSql extends GmAbstractModuleConstant implements IGmModule {
    getPropertyName(): string;
    getDirName(): string;
    getFileName(): string;
    init(): void;
}
