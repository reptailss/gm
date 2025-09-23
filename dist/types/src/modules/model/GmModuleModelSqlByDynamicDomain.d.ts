import { GmAbstractModuleFnModelSql } from "./abstractModel/GmAbstractModuleFnModelSql";
import { IGmModuleModel } from "./interfaces/gmModuleModel";
import { IGmModuleModelApi } from "./interfaces/gmModuleModelApi";
import { GmConfig } from "../../os-core";
export declare class GmModuleModelSqlByDynamicDomain extends GmAbstractModuleFnModelSql implements IGmModuleModel {
    api: IGmModuleModelApi;
    private getModelCbVarName;
    private domainVarName;
    constructor(config: GmConfig, { modelVarName, domainVarName, getModelCbVarName, }: {
        modelVarName: string;
        getModelCbVarName: string;
        domainVarName: string;
    });
    getPropertyName(): string;
    getInitModel(): string;
    init(): void;
}
