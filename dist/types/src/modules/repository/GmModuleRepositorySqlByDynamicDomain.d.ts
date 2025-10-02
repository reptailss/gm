import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from "../../os-core";
import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
export declare class GmModuleRepositorySqlByDynamicDomain extends GmAbstractModuleClass implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private loaderRepositoryVarName;
    private domainVarName;
    private loaderRepository;
    constructor(config: GmCrudConfig, { repositoryVarName, domainVarName, loaderRepositoryVarName, }: {
        repositoryVarName: string;
        loaderRepositoryVarName: string;
        domainVarName: string;
    });
    getDirName(): string;
    getFileName(): string;
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}
