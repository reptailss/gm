import { GmAbstractModuleFnRepositoryNoSql } from "./abstractRepository/GmAbstractModuleFnRepositoryNoSql";
import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleRepositoryByNoSqlMonthAndYear extends GmAbstractModuleFnRepositoryNoSql implements IGmModuleRepository {
    private monthVarName;
    private yearVarName;
    private getRepositoryCbVarName;
    api: IGmModuleRepositoryApi;
    constructor(config: GmCrudConfig, { repositoryVarName, getRepositoryCbVarName, monthVarName, yearVarName, }: {
        repositoryVarName: string;
        getRepositoryCbVarName: string;
        monthVarName: string;
        yearVarName: string;
    });
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}
