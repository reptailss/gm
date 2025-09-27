import { IGmModuleRepository } from "./interfaces/gmModuleRepository";
import { IGmModuleRepositoryApi } from "./interfaces/gmModuleRepositoryApi";
import { GmCrudConfig } from 'os-core-ts';
import { GmAbstractModuleClass } from "../abstractModule/GmAbstractModuleClass";
export declare class GmModuleRepositorySqlByDynamicLeId extends GmAbstractModuleClass implements IGmModuleRepository {
    api: IGmModuleRepositoryApi;
    private getRepositoryCbVarName;
    private leIdVarName;
    private loaderRepository;
    constructor(config: GmCrudConfig, { repositoryVarName, getRepositoryCbVarName, leIdVarName, }: {
        repositoryVarName: string;
        getRepositoryCbVarName: string;
        leIdVarName: string;
    });
    getDirName(): string;
    getFileName(): string;
    getPropertyName(): string;
    getInitRepository(): string;
    init(): void;
}
