import { GmAbstractModuleFnRepositorySql } from "./abstractRepository/GmAbstractModuleFnRepositorySql";
import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleRepositorySqlByDynamicLeId extends GmAbstractModuleFnRepositorySql implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private getRepositoryCbVarName;
    private leIdVarName;
    constructor(config: GmCrudConfig, { repositoryVarName, getRepositoryCbVarName, leIdVarName, }: {
        repositoryVarName: string;
        getRepositoryCbVarName: string;
        leIdVarName: string;
    });
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}
