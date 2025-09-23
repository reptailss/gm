import { GmAbstractModuleConstantModelSql } from "./abstractModel/GmAbstractModuleConstantModelSql";
import { IGmModuleModel } from "./interfaces/gmModuleModel";
import { IGmModuleModelApi } from "./interfaces/gmModuleModelApi";
import { GmConfig } from "../../os-core";
export declare class GmModuleModelSqlByStaticDb extends GmAbstractModuleConstantModelSql implements IGmModuleModel {
    api: IGmModuleModelApi;
    private gmModuleDbConnectionSql;
    constructor(config: GmConfig, modelVarName: string);
    getPropertyName(): string;
    init(): void;
}
