import { GmAbstractModuleFnRepositorySql } from "./abstractRepository/GmAbstractModuleFnRepositorySql";
import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
export declare class GmModuleRepositorySqlByDynamicDomain extends GmAbstractModuleFnRepositorySql implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private getRepositoryCbVarName;
    private domainVarName;
    constructor(config: GmCrudConfig, { repositoryVarName, domainVarName, getRepositoryCbVarName, }: {
        repositoryVarName: string;
        getRepositoryCbVarName: string;
        domainVarName: string;
    });
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}
