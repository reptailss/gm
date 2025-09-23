import { GmAbstractModuleFnModelSql } from "./abstractModel/GmAbstractModuleFnModelSql";
import { IGmModuleModel } from "./interfaces/gmModuleModel";
import { IGmModuleModelApi } from "./interfaces/gmModuleModelApi";
import { GmConfig } from "../../os-core";
export declare class GmModuleModelSqlByDynamicLeId extends GmAbstractModuleFnModelSql implements IGmModuleModel {
    api: IGmModuleModelApi;
    private getModelCbVarName;
    private leIdVarName;
    constructor(config: GmConfig, { modelVarName, getModelCbVarName, leIdVarName, }: {
        modelVarName: string;
        getModelCbVarName: string;
        leIdVarName: string;
    });
    getPropertyName(): string;
    getInitModel(): string;
    init(): void;
}
