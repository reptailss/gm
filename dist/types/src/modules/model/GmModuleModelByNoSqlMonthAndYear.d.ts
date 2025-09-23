import { GmAbstractModuleFnModelNoSql } from "./abstractModel/GmAbstractModuleFnModelNoSql";
import { IGmModuleModel } from "./interfaces/gmModuleModel";
import { IGmModuleModelApi } from "./interfaces/gmModuleModelApi";
import { GmConfig } from "../../os-core";
export declare class GmModuleModelByNoSqlMonthAndYear extends GmAbstractModuleFnModelNoSql implements IGmModuleModel {
    private monthVarName;
    private yearVarName;
    private getModelCbVarName;
    api: IGmModuleModelApi;
    constructor(config: GmConfig, { modelVarName, getModelCbVarName, monthVarName, yearVarName, }: {
        modelVarName: string;
        getModelCbVarName: string;
        monthVarName: string;
        yearVarName: string;
    });
    getPropertyName(): string;
    getInitModel(): string;
    init(): void;
}
