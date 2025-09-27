import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from 'os-core-ts';
import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
export declare class GmModuleRepositorySqlByDynamicDomain extends GmAbstractModuleClass implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private getRepositoryCbVarName;
    private domainVarName;
    private loaderRepository;
    constructor(config: GmCrudConfig, { repositoryVarName, domainVarName, getRepositoryCbVarName, }: {
        repositoryVarName: string;
        getRepositoryCbVarName: string;
        domainVarName: string;
    });
    getDirName(): string;
    getFileName(): string;
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}
